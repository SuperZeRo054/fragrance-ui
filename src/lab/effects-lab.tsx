import React, { useRef } from "react";
import "./effects-lab.css";

/* ⚠️ LAB 层：默认禁止进入正式实现（DESIGN.md §6.4）。 */

/* ================= GradientText：流光渐变字 ================= */
export function GradientText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`fui-gradient-text ${className}`}>{children}</span>;
}

/* ================= Marquee：无限跑马灯（hover 暂停） ================= */
export function Marquee({ items, speed = 26, reverse = false }: {
  items: React.ReactNode[]; speed?: number; reverse?: boolean;
}) {
  const row = [...items, ...items];
  return (
    <div className={`fui-marquee${reverse ? " rev" : ""}`} style={{ "--dur": `${speed}s` } as React.CSSProperties}>
      <div className="fui-marquee__track">
        {row.map((it, i) => <span className="fui-marquee__item" key={i} aria-hidden={i >= items.length}>{it}</span>)}
      </div>
    </div>
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
    <div ref={ref} className={`fui-tilt ${className}`} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
      <i className="fui-tilt__glare" aria-hidden />
    </div>
  );
}

/* ================= Beam：流光边框（conic 扫边） ================= */
export function Beam({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`fui-beam ${className}`}>{children}</div>;
}

/* ================= Aurora：极光氛围背景 ================= */
export function Aurora({ children, className = "" }: { children?: React.ReactNode; className?: string }) {
  return (
    <div className={`fui-aurora ${className}`}>
      <i className="fui-aurora__a" aria-hidden /><i className="fui-aurora__b" aria-hidden />
      <div className="fui-aurora__content">{children}</div>
    </div>
  );
}
