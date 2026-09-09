import React, { useEffect, useRef, useState } from "react";
import { Button, Badge, SectionHead, Reveal } from "../src";
import { SectionHost, CatSvg } from "./host";
import "./motionlab.css";

/* ============ A. 状态机猫（Rive 思路的 CSS 复刻：idle/groom/alert） ============ */
export function StateCat() {
  const [st, setSt] = useState<"idle" | "groom" | "alert">("idle");
  return (
    <div className="lab-card">
      <div
        className={`state-cat-box st-${st}`}
        onMouseEnter={() => setSt((s) => (s === "idle" ? "alert" : s))}
        onMouseLeave={() => setSt((s) => (s === "alert" ? "idle" : s))}
        onClick={() => setSt((s) => (s === "idle" ? "groom" : s === "groom" ? "alert" : "groom"))}
        title="点击切换状态，悬停会竖耳"
      >
        <CatSvg tone="wan" width={230} className={`state-cat st-${st}`} />
        <span className="state-badge">{st === "idle" ? "IDLE · 发呆" : st === "groom" ? "GROOM · 舔毛" : "ALERT · 竖耳"}</span>
      </div>
      <div className="lab-row">
        <Button size="sm" variant={st === "groom" ? "primary" : "outline"} onClick={() => setSt("groom")}>舔毛</Button>
        <Button size="sm" variant={st === "alert" ? "primary" : "outline"} onClick={() => setSt("alert")}>竖耳</Button>
        <Button size="sm" variant={st === "idle" ? "primary" : "outline"} onClick={() => setSt("idle")}>发呆</Button>
      </div>
      <p className="lab-note">Rive 思路的 CSS 复刻：尾巴摇摆、呼吸、眨眼、竖耳均为 class 驱动的状态切换。正主 Rive 只需在编辑器里做出更细腻的状态机素材。</p>
    </div>
  );
}

/* ============ B. DrawSVG 描边猫（GSAP，滚动到视口自动绘制，可重播） ============ */
export function DrawCat() {
  const svgRef = useRef<SVGSVGElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<any>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let killed = false;
    (async () => {
      const [{ gsap }, dp]: any[] = await Promise.all([
        import("gsap"), import("gsap/DrawSVGPlugin"),
      ]);
      if (killed) return;
      gsap.registerPlugin(dp.DrawSVGPlugin ?? dp.default?.DrawSVGPlugin ?? dp);
      const tl = gsap.timeline({ paused: true })
        .fromTo("#dcat .stroke", { drawSVG: "0%" }, { drawSVG: "100%", duration: 1.1, stagger: .18, ease: "power2.inOut" })
        .fromTo("#dcat .fillin", { fillOpacity: 0 }, { fillOpacity: 1, duration: .8, ease: "power1.out" }, "-=.3");
      tlRef.current = tl;
      setReady(true);
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { tl.restart(); io.disconnect(); }
      }, { threshold: .4 });
      io.observe(boxRef.current!);
    })();
    return () => { killed = true; tlRef.current?.kill(); };
  }, []);

  return (
    <div className="lab-card">
      <div ref={boxRef} className="draw-box">
        <svg ref={svgRef} id="dcat" viewBox="0 0 200 150" width="250" aria-hidden>
          {/* 头 + 一体耳：轮廓一笔画成，耳朵不可能离位 */}
          <path className="stroke" d="M100,102 C80,102 71,90 71,75 C71,65 73,54 77,42 C80,34 89,38 93,51 C97,49 103,49 107,51 C111,38 120,34 123,42 C127,54 129,65 129,75 C129,90 120,102 100,102 Z"
            fill="none" stroke="var(--accent)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          <g fill="none" stroke="var(--accent)" strokeLinecap="round">
            <path className="stroke" d="M72,82 C58,80 46,77 36,72" strokeWidth="1.8" />
            <path className="stroke" d="M74,89 C60,90 48,93 38,98" strokeWidth="1.8" />
            <path className="stroke" d="M128,82 C142,80 154,77 164,72" strokeWidth="1.8" />
            <path className="stroke" d="M126,89 C140,90 152,93 162,98" strokeWidth="1.8" />
            <path className="stroke" d="M100,86 V92 M100,92 Q96,96 91,94 M100,92 Q104,96 109,94" strokeWidth="2" />
          </g>
          <g className="fillin">
            <path d="M80,45 L83,38 L89,48 Z" fill="var(--accent-soft)" />
            <path d="M120,45 L117,38 L111,48 Z" fill="var(--accent-soft)" />
            <circle cx="87" cy="73" r="6" fill="var(--accent)" />
            <circle cx="113" cy="73" r="6" fill="var(--accent)" />
            <circle cx="89" cy="71" r="1.8" fill="#fff" /><circle cx="115" cy="71" r="1.8" fill="#fff" />
            <path d="M95,82 L105,82 L100,88 Z" fill="var(--danger)" />
          </g>
        </svg>
        {ready && (
          <Button size="sm" variant="ghost" onClick={() => tlRef.current?.restart()}>↺ 重播描边</Button>
        )}
      </div>
      <p className="lab-note">GSAP DrawSVG：轮廓像被钢笔「画」出来，收笔后实体淡入。同款手法可用于 Logo 与章节装饰。</p>
    </div>
  );
}

/* ============ C. 滚动驱动（纯 CSS animation-timeline，零 JS） ============ */
export function ScrollDriven() {
  return (
    <div className="lab-card">
      <div className="sd-progress" aria-hidden><i /></div>
      <div className="sd-track">
        {["入职第一年", "开始上桌", "占领键盘", "接管工位", "成为门面"].map((t, i) => (
          <div className="sd-card" key={i}>
            <b>0{i + 1}</b>{t}
          </div>
        ))}
        <p className="lab-note sd-support">此块由 CSS `animation-timeline: view()` 原生驱动，零 JS——Chromium 已支持，其他浏览器优雅降级为静态。</p>
      </div>
    </div>
  );
}

/* ============ D. 爪印路径（offset-path 沿曲线行走） ============ */
function Paw({ size = 26 }: { size?: number }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} aria-hidden>
      <ellipse cx="20" cy="26" rx="10" ry="8" fill="var(--accent)" opacity=".8"/>
      <circle cx="9" cy="16" r="4.2" fill="var(--accent)" opacity=".8"/>
      <circle cx="16" cy="11" r="4.4" fill="var(--accent)" opacity=".8"/>
      <circle cx="24" cy="11" r="4.4" fill="var(--accent)" opacity=".8"/>
      <circle cx="31" cy="16" r="4.2" fill="var(--accent)" opacity=".8"/>
    </svg>
  );
}
export function PawPath() {
  return (
    <div className="lab-card">
      <div className="paw-track">
        <div className="paw-guide" aria-hidden />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <span key={i} className="paw" style={{ "--i": i } as React.CSSProperties}><Paw /></span>
        ))}
      </div>
      <p className="lab-note">offset-path 沿贝塞尔曲线行走，六枚爪印错峰补间连成巡逻路线（Chromium/Safari 支持）。</p>
    </div>
  );
}

/* ============ E. 雾面 Shader（OGL WebGL，银色流体） ============ */
export function ShaderSilk() {
  const stopRef = useRef<null | (() => void)>(null);
  const attach = React.useCallback((cv: HTMLCanvasElement | null) => {
    if (stopRef.current) { stopRef.current(); stopRef.current = null; }
    if (!cv) return;
    const gl = cv.getContext("webgl", { antialias: false });
    if (!gl) return;
    const V = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";
    const F = "precision highp float;uniform float uT;uniform vec2 uR;" +
      "float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}" +
      "float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);" +
      "return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}" +
      "float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*n(p);p*=2.1;a*=.5;}return v;}" +
      "void main(){vec2 uv=gl_FragCoord.xy/uR;uv.x*=uR.x/uR.y;float t=uT*.06;" +
      "float k=fbm(uv*2.2+vec2(t,-t*.6)+fbm(uv*3.5-t*.03)*1.4);" +
      "vec3 s=mix(vec3(.80,.83,.87),vec3(.58,.63,.70),smoothstep(.25,.85,k));" +
      "s=mix(s,vec3(.93,.94,.96),smoothstep(.72,1.,k)*.6);" +
      "gl_FragColor=vec4(s,1.);}";
    const sh = (t: number, src: string) => {
      const o = gl.createShader(t)!; gl.shaderSource(o, src); gl.compileShader(o); return o;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, V));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, F));
    gl.linkProgram(prog); gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uT = gl.getUniformLocation(prog, "uT"), uR = gl.getUniformLocation(prog, "uR");
    const dpr = Math.min(devicePixelRatio, 1.5);
    const size = () => {
      const w = (cv.clientWidth || 600) * dpr, h = 280 * dpr;
      cv.width = w; cv.height = h;
      gl.viewport(0, 0, w, h); gl.uniform2f(uR, w, h);
    };
    size();
    const ro = new ResizeObserver(size); ro.observe(cv);
    let raf = 0, paused = false;
    const io = new IntersectionObserver(([e]) => { paused = !e.isIntersecting; });
    io.observe(cv);
    const t0 = performance.now();
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (paused) return;
      gl.uniform1f(uT, (t - t0) * .001);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    raf = requestAnimationFrame(loop);
    stopRef.current = () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
    };
  }, []);
  return (
    <div className="lab-card">
      <div className="shader-wrap">
        <canvas ref={attach} aria-label="银色流体雾面着色器背景"
          style={{ width: "100%", height: 280, display: "block" }} />
      </div>
      <p className="lab-note">裸 WebGL 片元着色器：fbm 噪声域扭曲的银色流体（哑光）。滚出视口即停止渲染。</p>
    </div>
  );
}

/* ============ F. 涂鸦猫（rough.js 手绘风） ============ */
export function RoughCat() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [err, setErr] = useState("");
  const draw = async () => {
    setErr("");
    try {
      const mod: any = await import("roughjs");
      const rough = mod.default ?? mod;
      if (!rough?.canvas) throw new Error("找不到 rough.canvas：[" + Object.keys(mod).join(",") + "]");
      const cv = ref.current; if (!cv) return;
      const ctx = cv.getContext("2d"); if (!ctx) return;
      ctx.clearRect(0, 0, cv.width, cv.height);
      const rc = rough.canvas(cv);
      const cs = getComputedStyle(document.body);
      const col = cs.getPropertyValue("--accent").trim() || "#8b939e";
      const dim = cs.getPropertyValue("--text-dim").trim() || "#98a0af";
      const o = { stroke: col, strokeWidth: 1.6, roughness: 1.6, bowing: 2 };
      rc.circle(70, 64, 62, o);
      rc.linearPath([[52, 38], [44, 16], [66, 28]], o);
      rc.linearPath([[88, 38], [96, 16], [74, 28]], o);
      rc.ellipse(70, 74, 16, 12, { ...o, fill: dim, fillStyle: "hachure", hachureGap: 5 });
      rc.circle(60, 60, 5, { stroke: col }); rc.circle(80, 60, 5, { stroke: col });
      rc.ellipse(168, 108, 118, 66, { ...o, fill: col, fillStyle: "hachure", hachureGap: 7 });
      rc.curve([[96, 128], [130, 138], [150, 118]], { ...o, strokeWidth: 2.4 });
      rc.line(96, 132, 116, 132, { ...o });
      // 像素自检：画完必须有墨迹
      const d = ctx.getImageData(0, 0, cv.width, cv.height).data;
      let ink = 0;
      for (let i = 3; i < d.length; i += 4) if (d[i] > 10) ink++;
      if (ink < 80) throw new Error("绘制像素不足(" + ink + ")");
    } catch (e: any) {
      setErr("rough 初始化失败 → " + (e?.message || e));
    }
  };
  useEffect(() => { draw(); }, []);
  return (
    <div className="lab-card">
      <div className="rough-box">
        <canvas ref={ref} width={280} height={170} aria-label="rough.js 涂鸦猫" />
        <div>
          <Button size="sm" variant="outline" onClick={draw}>↺ 换一张笔触</Button>
          {err && <p className="lab-note" style={{ color: "var(--danger)", maxWidth: 180 }}>{err}</p>}
        </div>
      </div>
      <p className="lab-note">rough.js：同一组几何，每次渲染都是新的手绘笔触——程序员白板风，适合空状态与彩蛋。</p>
    </div>
  );
}

/* ============ G. 流体渐变背景（纯 CSS mesh） ============ */
export function MeshBG() {
  return (
    <div className="lab-card">
      <div className="mesh-panel" aria-hidden />
      <p className="lab-note">纯 CSS：多层径向渐变 + 30s 缓慢漂移，银蓝流体雾面。零依赖零 JS，全浏览器支持。</p>
    </div>
  );
}

/* ============ H. 随机猫彩蛋（cataas 外链 API） ============ */
export function CataasEgg() {
  const [src, setSrc] = useState("");
  const [err, setErr] = useState(false);
  return (
    <div className="lab-card">
      <div className="lab-row">
        <Button variant="outline" size="sm" onClick={() => { setErr(false); setSrc(`https://cataas.com/cat?${Date.now()}`); }}>
          今日随机猫猫
        </Button>
        <Badge tone="info">外链彩蛋 · cataas.com</Badge>
      </div>
      {src && !err && (
        <img className="cataas-img" src={src} alt="随机猫" onError={() => setErr(true)} />
      )}
      {err && <p className="lab-note">外链超时——网络抽风，猫没来。</p>}
    </div>
  );
}

/* ============ 分区入口 ============ */
export function MotionLab() {
  return (
    <section id="motion-lab">
      <SectionHead kicker="07 · Motion & Art Lab" title="动效与画法实验室"
        sub="状态机、描边生长、滚动驱动、爪印路径、雾面着色器、涂鸦、流体渐变，每件都能单独搬走。" />
      <SectionHost host="wanwan" />
      <div className="lab-grid">
        <Reveal><h3 className="lab-h">A · 状态机猫 <span className="lab-tag">CSS 状态机</span></h3><StateCat /></Reveal>
        <Reveal><h3 className="lab-h">B · 描边生长 <span className="lab-tag">GSAP DrawSVG</span></h3><DrawCat /></Reveal>
        <Reveal><h3 className="lab-h">C · 滚动驱动 <span className="lab-tag">CSS 原生</span></h3><ScrollDriven /></Reveal>
        <Reveal><h3 className="lab-h">D · 爪印路径 <span className="lab-tag">offset-path</span></h3><PawPath /></Reveal>
        <Reveal><h3 className="lab-h">E · 雾面着色器 <span className="lab-tag">OGL WebGL</span></h3><ShaderSilk /></Reveal>
        <Reveal><h3 className="lab-h">F · 涂鸦猫 <span className="lab-tag">rough.js</span></h3><RoughCat /></Reveal>
        <Reveal><h3 className="lab-h">G · 流体渐变 <span className="lab-tag">纯 CSS</span></h3><MeshBG /></Reveal>
        <Reveal><h3 className="lab-h">H · 随机猫猫 <span className="lab-tag">彩蛋 API</span></h3><CataasEgg /></Reveal>
      </div>
    </section>
  );
}
