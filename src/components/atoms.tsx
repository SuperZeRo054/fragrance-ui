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
type BtnVariant = "primary" | "outline" | "ghost" | "danger";
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

/* ---------------- Rating（展示型） ---------------- */
export function Rating({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <span className="mui-rating" aria-label={`${value} / ${max}`}>
      {"★".repeat(value)}<span className="off">{"★".repeat(Math.max(0, max - value))}</span>
    </span>
  );
}

/* ---------------- Avatar（SVG 原生友好） ---------------- */
export function Avatar({ emoji, shape = "circle", size = 88 }:
  { emoji?: string; shape?: "circle" | "rounded"; size?: number }) {
  return (
    <span className={`mui-avatar mui-avatar--${shape}`} style={{ width: size, height: size, fontSize: size * .5 }}>
      {emoji ?? "🐂"}
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
