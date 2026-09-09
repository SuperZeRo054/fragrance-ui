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
    <Tag ref={ref as never} className={`fui-reveal${inView ? " in" : ""}`}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}>
      {children}
    </Tag>
  );
}

/* ---------------- Button ---------------- */
type BtnVariant = "primary" | "outline" | "ghost" | "danger"; // Glass 不属于 Action 层级（DESIGN.md §6.1）
export function Button({
  variant = "primary", size = "md", loading = false,
  href, children, className = "", ...rest
}: {
  variant?: BtnVariant; size?: "sm" | "md" | "lg"; loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: string }) {
  const cls = `fui-btn fui-btn--${variant} fui-btn--${size} ${className}`;
  const inner = (<>{loading && <span className="fui-btn__spin" aria-hidden />}{children}</>);
  if (href) return <a className={cls} href={href} onClick={rest.onClick as never}>{inner}</a>;
  return <button className={cls} disabled={loading || rest.disabled} {...rest}>{inner}</button>;
}


/* ---------------- Badge / Kicker ---------------- */
export function Badge({ tone = "gold", children }: {
  tone?: "gold" | "ok" | "info" | "warn" | "err"; children: React.ReactNode;
}) {
  return <span className={`fui-badge fui-badge--${tone}`}>{children}</span>;
}

export function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="fui-kicker">{children}</p>;
}

/** 分区标题：金色细线随渐显自动生长 */
export function SectionHead({ kicker, title, sub, align = "left" }: {
  kicker?: string; title: string; sub?: string; align?: "left" | "center";
}) {
  return (
    <div className={`fui-sechead ${align === "center" ? "fui-sechead--center" : ""}`}>
      {kicker && <Reveal><Kicker>{kicker}</Kicker></Reveal>}
      <Reveal delay={90}><h2 className="fui-sechead__title">{title}</h2></Reveal>
      <Reveal delay={170}><i className="fui-sechead__rule" aria-hidden /></Reveal>
      {sub && <Reveal delay={230}><p className="fui-sechead__sub">{sub}</p></Reveal>}
    </div>
  );
}

/* ---------------- Chip（单选组） ---------------- */
export function ChipGroup<T extends string>({ items, value, onChange }:
  { items: { id: T; label: string }[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="fui-chips" role="tablist">
      {items.map((it) => (
        <button key={it.id} role="tab" aria-selected={value === it.id}
          className={`fui-chip${value === it.id ? " active" : ""}`} onClick={() => onChange(it.id)}>
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
    <span className={`fui-rating${animated ? " anim" : ""}`} role="img" aria-label={`${value} / ${max}`}>
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

/* ---------------- Avatar（收任意节点；缺省用中性占位，不依赖 BRAND） ---------------- */
export function Avatar({ children, shape = "circle", size = 88 }:
  { children?: React.ReactNode; shape?: "circle" | "rounded"; size?: number }) {
  return (
    <span className={`fui-avatar fui-avatar--${shape}`} style={{ width: size, height: size }}>
      {children ?? (
        <svg viewBox="0 0 32 32" width={size * .58} height={size * .58} aria-hidden>
          <circle cx="16" cy="12" r="5.2" fill="currentColor" opacity=".38" />
          <path d="M6 27c1.6-5 5.4-7.4 10-7.4S24.4 22 26 27Z" fill="currentColor" opacity=".38" />
        </svg>
      )}
    </span>
  );
}

/* ---------------- Tooltip ---------------- */
export function Tooltip({ tip, children }: { tip: string; children: React.ReactNode }) {
  return (
    <span className="fui-tooltip" tabIndex={0} role="button" aria-label={tip} data-tip={tip}>
      {children}<i className="fui-tooltip__bubble" data-tip={tip} aria-hidden />
    </span>
  );
}
