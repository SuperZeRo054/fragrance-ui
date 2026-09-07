import React, { useEffect, useRef, useState } from "react";
import "./effects.css";

/* ================= TypingText：打字机（进视口才开打，逐字+光标） ================= */
export function TypingText({ text, speed = 45, startOnView = true, keepCursor = false, className = "" }: {
  text: string; speed?: number; startOnView?: boolean; keepCursor?: boolean; className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  const [go, setGo] = useState(!startOnView);
  useEffect(() => {
    if (!startOnView) return;
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setGo(true); io.disconnect(); }
    }, { threshold: .3 });
    io.observe(el);
    return () => io.disconnect();
  }, [startOnView]);
  useEffect(() => {
    if (!go) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(text.length); return; }
    if (n >= text.length) return;
    const id = setTimeout(() => setN(n + 1), speed);
    return () => clearTimeout(id);
  }, [go, n, text, speed]);
  const done = n >= text.length;
  return (
    <span ref={ref} className={`mui-typing ${className}`}>
      {text.slice(0, n)}
      {(keepCursor || !done) && <i className="mui-typing__cursor" aria-hidden />}
    </span>
  );
}

/* ================= TextReveal：逐字揭示（IO + 错峰过渡） ================= */
export function TextReveal({ text, stagger = 26, delay = 0, className = "" }: {
  text: string; stagger?: number; delay?: number; className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); io.disconnect(); }
    }, { threshold: .3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <span ref={ref} className={`mui-textreveal ${inView ? "in" : ""} ${className}`} aria-label={text}>
      {[...text].map((ch, i) => (
        <span key={i} aria-hidden
          style={{ transitionDelay: `${delay + i * stagger}ms` }}>
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}

/* ================= GradientText：流光渐变字 ================= */
export function GradientText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`mui-gradient-text ${className}`}>{children}</span>;
}

/* ================= Marquee：无限跑马灯（hover 暂停） ================= */
export function Marquee({ items, speed = 26, reverse = false }: {
  items: React.ReactNode[]; speed?: number; reverse?: boolean;
}) {
  const row = [...items, ...items];
  return (
    <div className={`mui-marquee${reverse ? " rev" : ""}`} style={{ "--dur": `${speed}s` } as React.CSSProperties}>
      <div className="mui-marquee__track">
        {row.map((it, i) => <span className="mui-marquee__item" key={i} aria-hidden={i >= items.length}>{it}</span>)}
      </div>
    </div>
  );
}

/* ================= Magnetic：磁吸容器（子元素跟随光标） ================= */
export function Magnetic({ children, strength = .28, max = 9 }: {
  children: React.ReactNode; strength?: number; max?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * strength;
    const dy = (e.clientY - (r.top + r.height / 2)) * strength;
    const cl = (v: number) => Math.max(-max, Math.min(max, v));
    el.style.transform = `translate(${cl(dx)}px, ${cl(dy)}px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = ""; };
  return (
    <span ref={ref} className="mui-magnetic" onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </span>
  );
}

/* ================= Tilt：3D 倾斜卡（跟随光标 + 高光） ================= */
export function Tilt({ children, max = 8, className = "" }: {
  children: React.ReactNode; max?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(800px) rotateX(${(py - .5) * -2 * max}deg) rotateY(${(px - .5) * 2 * max}deg)`;
    el.style.setProperty("--gx", `${px * 100}%`);
    el.style.setProperty("--gy", `${py * 100}%`);
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = ""; };
  return (
    <div ref={ref} className={`mui-tilt ${className}`} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
      <i className="mui-tilt__glare" aria-hidden />
    </div>
  );
}

/* ================= Beam：流光边框（conic 扫边） ================= */
export function Beam({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mui-beam ${className}`}>{children}</div>;
}

/* ================= Aurora：极光氛围背景 ================= */
export function Aurora({ children, className = "" }: { children?: React.ReactNode; className?: string }) {
  return (
    <div className={`mui-aurora ${className}`}>
      <i className="mui-aurora__a" aria-hidden /><i className="mui-aurora__b" aria-hidden />
      <div className="mui-aurora__content">{children}</div>
    </div>
  );
}
