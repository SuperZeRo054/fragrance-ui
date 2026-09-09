import React, { useEffect, useRef } from "react";
import "./scene.css";

/** M03 · Scene Hero（DESIGN.md §11 Scene Choreography / §15 Scroll Motion）。
 *
 *  Storyboard:
 *   01 Artwork establishes first        —— 主视觉先建立（1.1s，scale 1.04→1）
 *   02 Metadata follows quietly        —— kicker / 边款轻声跟进（错峰 .3s 起）
 *   03 Title settles into composition  —— 标题落位（.42s 起）
 *   04 Scroll changes spatial relation —— 滚动只移动主视觉（视差 ≤42px）
 *   05 Artwork transitions into flow   —— 滚过 Hero 后运动停止，进入阅读
 *
 *  reduced-motion：直接呈现终态，无位移、无视差。
 *  Visual Budget：Primary（唯一高存在感场景）。Continuous = 0（视差仅在滚动时发生）。
 */
export function SceneHero({ img, alt = "", className = "", children }: {
  img: string; alt?: string; className?: string; children: React.ReactNode;
}) {
  const hostRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const host = hostRef.current, image = imgRef.current;
    if (!host || !image) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { host.classList.add("scene-in"); return; }

    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { host.classList.add("scene-in"); io.disconnect(); }
    }, { threshold: .15 });
    io.observe(host);

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = host.getBoundingClientRect();
        if (r.bottom < -120 || r.top > innerHeight + 120) return;
        // 进度：Hero 顶部越出视口越多，主视觉越向下沉（空间关系变化）
        const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height)));
        image.style.transform = `translateY(${(p * 42).toFixed(1)}px)`;
      });
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => { removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); io.disconnect(); };
  }, []);

  return (
    <section className={`scene-hero ${className}`} ref={hostRef}>
      <div className="scene-media">
        <img className="scene-img" src={img} alt={alt} ref={imgRef} />
      </div>
      <div className="ghome__hero-shade" />
      {children}
    </section>
  );
}
