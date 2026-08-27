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

/* ---------------- 品牌标记：零位图动物（替代一切 emoji） ---------------- */
export function OxMark({ size = 44 }: { size?: number }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden>
      {OX_HEAD}
    </svg>
  );
}
export function SheepMark({ size = 44 }: { size?: number }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden>
      {/* 云朵绒身 */}
      <g fill="var(--accent-soft,#c9b183)">
        <circle cx="20" cy="34" r="10"/><circle cx="32" cy="27" r="12"/>
        <circle cx="45" cy="33" r="11"/><circle cx="33" cy="39" r="13"/>
      </g>
      <g fill="#6b4a35">
        <rect x="22" y="46" width="7" height="12" rx="3.5"/>
        <rect x="37" y="46" width="7" height="12" rx="3.5"/>
      </g>
      {/* 黑尖小角 + 淡脸 */}
      <path d="M26 18 Q21 9 28 6 Q31 12 32 16Z" fill="#2e2620"/>
      <path d="M38 18 Q43 9 36 6 Q33 12 32 16Z" fill="#2e2620"/>
      <ellipse cx="32" cy="26" rx="9.5" ry="8.5" fill="#efe0c6"/>
      <circle cx="28.4" cy="23.5" r="1.7" fill="#33291f"/><circle cx="35.6" cy="23.5" r="1.7" fill="#33291f"/>
      <ellipse cx="32" cy="29.5" rx="4.6" ry="3.2" fill="#d8b694"/>
    </svg>
  );
}
const OX_HEAD = (
  <g>
    <path d="M22 20 Q17 11 24 8 Q27 14 28 18Z" fill="#2e2620"/>
    <path d="M42 20 Q47 11 40 8 Q37 14 36 18Z" fill="#2e2620"/>
    <circle cx="17" cy="30" r="8"/><circle cx="47" cy="30" r="8"/>
    <circle cx="32" cy="32" r="23" fill="var(--accent,#a8894f)"/>
    <ellipse cx="32" cy="41" rx="12.5" ry="9" fill="#ecd2b4"/>
    <circle cx="27" cy="39" r="1.9" fill="#b98d68"/><circle cx="37" cy="39" r="1.9" fill="#b98d68"/>
    <path d="M28 45 q4 2.4 8 0" stroke="#caa87e" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <circle cx="25" cy="28" r="3.6" fill="#33291f"/><circle cx="39" cy="28" r="3.6" fill="#33291f"/>
    <circle cx="26.2" cy="26.8" r="1.1" fill="#fff" opacity=".85"/>
    <circle cx="40.2" cy="26.8" r="1.1" fill="#fff" opacity=".85"/>
  </g>
);

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
      {children ?? <OxMark size={size * .58} />}
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
