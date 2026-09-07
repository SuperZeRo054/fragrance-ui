import React, { useEffect, useRef, useState } from "react";
import "./effects.css";

/* ================= ThreeShapes：银色低多边形悬浮群（three.js，进视口才启动） =================
   场景适配：3D 适合 Hero / 沉浸式首屏 / 产品展示——一句话判断：需要"深度与光影"就上 Three。 */
export function ThreeShapes({ height = 320, className = "" }: { height?: number; className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let dead = false, raf = 0, paused = false;
    const cleanups: Array<() => void> = [];
    (async () => {
      const THREE = await import("three");
      if (dead || !canvasRef.current) return;
      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current, antialias: true, alpha: true,
      });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, 2, .1, 50);
      camera.position.set(0, .2, 6.4);
      // 灯光：主光 + 补光 + 环境（银色金属需要高对比光）
      const key = new THREE.DirectionalLight(0xffffff, 2.2); key.position.set(3, 4, 5);
      const rim = new THREE.DirectionalLight(0xbfd0e2, 1.4); rim.position.set(-4, -2, -3);
      scene.add(key, rim, new THREE.AmbientLight(0xffffff, .45));
      const mat = new THREE.MeshStandardMaterial({ color: 0xc9ced6, metalness: .88, roughness: .28 });
      const matSoft = new THREE.MeshStandardMaterial({ color: 0xdfe4ea, metalness: .55, roughness: .42 });
      const group = new THREE.Group();
      const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(.62, .2, 140, 18), mat);
      knot.position.set(1.9, .1, 0);
      const ico = new THREE.Mesh(new THREE.IcosahedronGeometry(1.05, 0), matSoft);
      ico.position.set(-1.95, -.15, -.4);
      const s1 = new THREE.Mesh(new THREE.SphereGeometry(.3, 24, 24), mat);
      s1.position.set(-.2, 1.5, -1);
      const s2 = new THREE.Mesh(new THREE.SphereGeometry(.18, 24, 24), matSoft);
      s2.position.set(.9, -1.35, -.6);
      group.add(knot, ico, s1, s2);
      scene.add(group);
      const size = () => {
        const w = wrapRef.current?.clientWidth || 600, h = height;
        renderer.setSize(w, h, false);
        camera.aspect = w / h; camera.updateProjectionMatrix();
      };
      size();
      const ro = new ResizeObserver(size); ro.observe(wrapRef.current!);
      cleanups.push(() => ro.disconnect());
      const io = new IntersectionObserver(([e]) => { paused = !e.isIntersecting; }, { threshold: 0 });
      io.observe(wrapRef.current!);
      cleanups.push(() => io.disconnect());
      let mx = 0, my = 0;
      const onMove = (e: MouseEvent) => {
        const r = wrapRef.current!.getBoundingClientRect();
        mx = (e.clientX - r.left) / r.width - .5;
        my = (e.clientY - r.top) / r.height - .5;
      };
      addEventListener("mousemove", onMove);
      cleanups.push(() => removeEventListener("mousemove", onMove));
      const clock = new THREE.Clock();
      const loop = () => {
        raf = requestAnimationFrame(loop);
        if (paused) return;
        const t = clock.getElapsedTime();
        group.rotation.y = t * .22;
        knot.rotation.x = t * .4; knot.rotation.z = t * .3;
        ico.rotation.x = -t * .3; ico.rotation.y = t * .45;
        s1.position.y = 1.5 + Math.sin(t * 1.4) * .12;
        s2.position.y = -1.35 + Math.sin(t * 1.1 + 1) * .1;
        camera.position.x += (mx * 1.1 - camera.position.x) * .04;
        camera.position.y += (-my * .7 - camera.position.y) * .04;
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
      };
      raf = requestAnimationFrame(loop);
    })();
    return () => {
      dead = true; cancelAnimationFrame(raf);
      cleanups.forEach((fn) => fn());
    };
  }, [height]);
  return (
    <div ref={wrapRef} className={`mui-three-wrap ${className}`} style={{ height }}>
      <canvas ref={canvasRef} aria-label="Three.js 银色多面体悬浮群" />
    </div>
  );
}

/* ================= ParticleField：Canvas 2D 粒子网络（近距连线 + 光标斥力） =================
   场景适配：Canvas 适合"大量元素的群体行为"——粒子、星尘、连接网络。 */
export function ParticleField({ height = 300, className = "" }: { height?: number; className?: string }) {
  const stopRef = useRef<null | (() => void)>(null);
  const attach = React.useCallback((cv: HTMLCanvasElement | null) => {
    if (stopRef.current) { stopRef.current(); stopRef.current = null; }
    if (!cv) return;
    const accent = getComputedStyle(document.body).getPropertyValue("--accent").trim() || "#8b939e";
    const dpr = Math.min(devicePixelRatio, 1.5);
    let raf = 0, paused = false;
    let pts: Array<{ x: number; y: number; vx: number; vy: number }> = [];
    let W = 0, H = 0;
    const mouse = { x: -9999, y: -9999 };
    const LINK = 130 * dpr, REPEL = 95 * dpr;

    const onMove = (e: MouseEvent) => {
      const r = cv.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) * (cv.width / r.width);
      mouse.y = (e.clientY - r.top) * (cv.height / r.height);
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    cv.addEventListener("mousemove", onMove);
    cv.addEventListener("mouseleave", onLeave);
    const io = new IntersectionObserver(([e]) => { paused = !e.isIntersecting; });
    io.observe(cv);
    const ro = new ResizeObserver(() => { /* 每帧自愈 */ });
    ro.observe(cv);

    const ctx = cv.getContext("2d");
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (paused || !ctx) return;
      const wrapW = cv.clientWidth || 300;
      const W = Math.round(wrapW * dpr), H = Math.round(height * dpr);
      if (W < 10 || H < 10) return;
      if (cv.width !== W || cv.height !== H) { cv.width = W; cv.height = H; pts = []; }
      if (pts.length === 0) {
        const count = Math.max(26, Math.min(80, Math.round(W * H / 16000)));
        pts = Array.from({ length: count }, () => ({
          x: Math.random() * W, y: Math.random() * H,
          vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
        }));
      }
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = accent;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
        if (d2 < REPEL * REPEL && d2 > .01) {
          const d = Math.sqrt(d2), f = (REPEL - d) / REPEL * .8;
          p.vx += dx / d * f; p.vy += dy / d * f;
        }
        p.vx *= .985; p.vy *= .985;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        p.x = Math.max(0, Math.min(W, p.x)); p.y = Math.max(0, Math.min(H, p.y));
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const ddx = p.x - q.x, ddy = p.y - q.y, dd = ddx * ddx + ddy * ddy;
          if (dd < LINK * LINK) {
            ctx.globalAlpha = (1 - Math.sqrt(dd) / LINK) * .3;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
      }
      ctx.fillStyle = accent;
      for (const p of pts) {
        ctx.globalAlpha = .75;
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.7 * dpr, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
    };
    raf = requestAnimationFrame(loop);

    stopRef.current = () => {
      cancelAnimationFrame(raf);
      io.disconnect(); ro.disconnect();
      cv.removeEventListener("mousemove", onMove);
      cv.removeEventListener("mouseleave", onLeave);
    };
  }, [height]);
  return (
    <canvas ref={attach} className={`mui-particles ${className}`}
      style={{ height }} aria-label="粒子网络交互场" />
  );
}
