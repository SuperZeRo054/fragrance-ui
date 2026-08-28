import React, { useEffect, useRef, useState } from "react";
import "./atoms.css";

/* ---------------- Reveal：滚动渐显容器（整个库的动效地基） ---------------- */
export function Reveal({ children, delay = 0, as: Tag = "div" }: {
  children: React.ReactNode; delay?: number; as?: React.ElementType;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) { setInView(true); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); io.disconnect(); }
    }, { threshold: .15, rootMargin: "0px 0px -6%" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref as never} className={`mui-reveal${inView ? " in" : ""}`}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}>
      {children}
    </Tag>
  );
}

/* ---------------- Button ---------------- */
type BtnVariant = "primary" | "outline" | "ghost" | "danger" | "glass";
export function Button({
  variant = "primary", size = "md", loading = false,
  href, children, className = "", ...rest
}: {
  variant?: BtnVariant; size?: "sm" | "md" | "lg"; loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: string }) {
  const cls = `mui-btn mui-btn--${variant} mui-btn--${size} ${className}`;
  const inner = (<>{loading && <span className="mui-btn__spin" aria-hidden />}{children}</>);
  if (href) return <a className={cls} href={href} onClick={rest.onClick as never}>{inner}</a>;
  return <button className={cls} disabled={loading || rest.disabled} {...rest}>{inner}</button>;
}

/* ---------------- 品牌标记：两位猫咪馆长（奶油 & 蓝灰，零位图） ---------------- */
export function CatMark({ tone = "cream", size = 44 }: {
  tone?: "cream" | "blue"; size?: number;
}) {
  const coats = {
    cream: { fur: "#e2cda0", ear: "#d9bd8c", inner: "#eab8a4", eye: "#6f9a6b", muzzle: "#f4ead2" },
    blue: { fur: "#9aa4ad", ear: "#8b959f", inner: "#d8b3a8", eye: "#7fa8c9", muzzle: "#efe7da" },
  }[tone];
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden>
      {/* 耳朵 */}
      <path d="M15 26 Q11 10 20 7 Q26 14 27 21 Z" fill={coats.ear}/>
      <path d="M49 26 Q53 10 44 7 Q38 14 37 21 Z" fill={coats.ear}/>
      <path d="M18 22 Q16 13 21 11 Q24 16 24.5 20 Z" fill={coats.inner}/>
      <path d="M46 22 Q48 13 43 11 Q40 16 39.5 20 Z" fill={coats.inner}/>
      {/* 头 */}
      <circle cx="32" cy="35" r="22" fill={coats.fur}/>
      {tone === "blue" && <ellipse cx="32" cy="44" rx="13" ry="9" fill="#f2ece0"/>}
      {/* 眼睛 */}
      <ellipse cx="24.5" cy="31" rx="4.4" ry="4.8" fill={coats.eye}/>
      <ellipse cx="39.5" cy="31" rx="4.4" ry="4.8" fill={coats.eye}/>
      <circle cx="25.6" cy="30.2" r="1.3" fill="#fff" opacity=".9"/>
      <circle cx="40.6" cy="30.2" r="1.3" fill="#fff" opacity=".9"/>
      {/* 鼻+嘴 */}
      <path d="M30 38.5 L34 38.5 L32 41 Z" fill="#d8988a"/>
      <path d="M32 41 Q32 43.5 29.5 44 M32 41 Q32 43.5 34.5 44" stroke="#b9987e" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
      {/* 胡须 */}
      <g stroke="#00000030" strokeWidth="1.1" strokeLinecap="round">
        <path d="M20 38 L9 36.5"/><path d="M20 41 L10 42"/>
        <path d="M44 38 L55 36.5"/><path d="M44 41 L54 42"/>
      </g>
    </svg>
  );
}

/* ---------------- Badge / Kicker ---------------- */
export function Badge({ tone = "gold", children }: {
  tone?: "gold" | "ok" | "info" | "warn" | "err"; children: React.ReactNode;
}) {
  return <span className={`mui-badge mui-badge--${tone}`}>{children}</span>;
}

export function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="mui-kicker">{children}</p>;
}

/** 分区标题：金色细线随渐显自动生长 */
export function SectionHead({ kicker, title, sub, align = "left" }: {
  kicker?: string; title: string; sub?: string; align?: "left" | "center";
}) {
  return (
    <div className={`mui-sechead ${align === "center" ? "mui-sechead--center" : ""}`}>
      {kicker && <Reveal><Kicker>{kicker}</Kicker></Reveal>}
      <Reveal delay={90}><h2 className="mui-sechead__title">{title}</h2></Reveal>
      <Reveal delay={170}><i className="mui-sechead__rule" aria-hidden /></Reveal>
      {sub && <Reveal delay={230}><p className="mui-sechead__sub">{sub}</p></Reveal>}
    </div>
  );
}

/* ---------------- Chip（单选组） ---------------- */
export function ChipGroup<T extends string>({ items, value, onChange }:
  { items: { id: T; label: string }[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="mui-chips" role="tablist">
      {items.map((it) => (
        <button key={it.id} role="tab" aria-selected={value === it.id}
          className={`mui-chip${value === it.id ? " active" : ""}`} onClick={() => onChange(it.id)}>
          {it.label}
        </button>
      ))}
    </div>
  );
}

/* ---------------- Rating（圆润矢量星 · 入场逐颗 spring · 60fps） ---------------- */
export function Rating({ value, max = 5, size = 15, animated = true }: {
  value: number; max?: number; size?: number; animated?: boolean;
}) {
  return (
    <span className={`mui-rating${animated ? " anim" : ""}`} role="img" aria-label={`${value} / ${max}`}>
      {Array.from({ length: max }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" width={size} height={size}
          style={{ "--i": i } as React.CSSProperties}
          className={i < value ? "lit" : "dim"} aria-hidden>
          <path d="M12 17.4l-5.16 3.06c-.5.3-1.1-.14-.98-.7l1.36-5.85-4.53-3.93c-.44-.38-.2-1.1.38-1.15l5.97-.52L11.32 3.7c.23-.54.94-.54 1.17 0l2.28 5.51 5.97.52c.58.05.82.77.38 1.15l-4.53 3.93 1.36 5.85c.12.56-.48 1-.98.7L12 17.4z"/>
        </svg>
      ))}
    </span>
  );
}

/* ---------------- Avatar（SVG 原生：传任意节点即可，不再收 emoji） ---------------- */
export function Avatar({ children, shape = "circle", size = 88 }:
  { children?: React.ReactNode; shape?: "circle" | "rounded"; size?: number }) {
  return (
    <span className={`mui-avatar mui-avatar--${shape}`} style={{ width: size, height: size }}>
      {children ?? <CatMark tone="cream" size={size * .58} />}
    </span>
  );
}

/* ---------------- Tooltip ---------------- */
export function Tooltip({ tip, children }: { tip: string; children: React.ReactNode }) {
  return (
    <span className="mui-tooltip" tabIndex={0} role="button" aria-label={tip} data-tip={tip}>
      {children}<i className="mui-tooltip__bubble" data-tip={tip} aria-hidden />
    </span>
  );
}
