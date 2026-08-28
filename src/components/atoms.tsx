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

/* ---------------- 品牌标记：两位猫咪馆长（零位图，特征自真实猫抽象） ----------------
   cream = 奶油金渐层英短：奶油杏色密绒毛 · 橄榄绿大眼 · 粉鼻 · 白胸
   blue  = 蓝灰英短：蓝灰被毛 · 蓝宝石圆眼 · 奶油白围脖与口鼻
   英短特征：圆头 · 小圆耳 · 大腮帮 */
const CAT_COATS = {
  cream: { fur: "#e3cfa4", fur2: "#d9bf8e", ear: "#d6ba8b", inner: "#eab8a4", eye: "#6f9a6b", muzzle: "#f4ead2", chest: "#f6efe0" },
  blue: { fur: "#99a3ac", fur2: "#8a949e", ear: "#87919b", inner: "#d8b3a8", eye: "#7fa8c9", muzzle: "#efe7da", chest: "#f2ece0" },
} as const;

export function CatMark({ tone = "cream", size = 44 }: {
  tone?: "cream" | "blue"; size?: number;
}) {
  const c = CAT_COATS[tone];
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden>
      {/* 英短小圆耳 */}
      <path d="M17 26 Q13 13 22 10 Q27 16 28 23 Z" fill={c.ear}/>
      <path d="M47 26 Q51 13 42 10 Q37 16 36 23 Z" fill={c.ear}/>
      <path d="M19.5 23 Q17.5 16 22 14.5 Q24.5 18 25 21.5 Z" fill={c.inner}/>
      <path d="M44.5 23 Q46.5 16 42 14.5 Q39.5 18 39 21.5 Z" fill={c.inner}/>
      {/* 圆头 + 大腮帮 */}
      <circle cx="32" cy="35" r="21" fill={c.fur}/>
      <circle cx="16.5" cy="41" r="7.5" fill={c.fur}/>
      <circle cx="47.5" cy="41" r="7.5" fill={c.fur}/>
      {tone === "blue" && <ellipse cx="32" cy="45" rx="12.5" ry="8.5" fill={c.chest}/>}
      {/* 眼睛 */}
      <ellipse cx="24.5" cy="31.5" rx="4.2" ry="4.8" fill={c.eye}/>
      <ellipse cx="39.5" cy="31.5" rx="4.2" ry="4.8" fill={c.eye}/>
      <circle cx="25.7" cy="30.4" r="1.25" fill="#fff" opacity=".9"/>
      <circle cx="40.7" cy="30.4" r="1.25" fill="#fff" opacity=".9"/>
      {/* 鼻 + 嘴 */}
      <path d="M30.2 38.5 L33.8 38.5 L32 40.8 Z" fill="#d8988a"/>
      <path d="M32 40.8 Q32 43.2 29.6 43.8 M32 40.8 Q32 43.2 34.4 43.8" stroke="#b9987e" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* 胡须 */}
      <g stroke="#00000028" strokeWidth="1.1" strokeLinecap="round">
        <path d="M20 38 L9 36.5"/><path d="M20 41 L10 42"/>
        <path d="M44 38 L55 36.5"/><path d="M44 41 L54 42"/>
      </g>
    </svg>
  );
}

/* 卧姿整猫（loaf）几何——组件与字符串双形态，供场景拼装 */
export function catLoafGroup(tone: "cream" | "blue" = "cream"): string {
  const c = CAT_COATS[tone];
  const paws = tone === "cream" ? "#f0e3c8" : "#e8e2d6";
  return `<g>
    <path d="M150 120 Q174 116 172 100 Q170 88 156 90" fill="none" stroke="${c.fur2}" stroke-width="13" stroke-linecap="round"/>
    <path d="M30 128 Q26 92 56 82 Q96 68 140 78 Q168 86 171 110 Q173 128 150 128 Z" fill="${c.fur}"/>
    ${tone === "cream" ? `<g stroke="${c.fur2}" stroke-width="6" opacity=".35" fill="none" stroke-linecap="round">
      <path d="M78 84 q6 14 2 26"/><path d="M100 80 q6 16 2 30"/><path d="M122 80 q6 14 2 28"/></g>` : ""}
    ${tone === "blue" ? `<ellipse cx="86" cy="112" rx="30" ry="16" fill="${c.chest}" opacity=".92"/>` : ""}
    <rect x="66" y="118" width="19" height="13" rx="6.5" fill="${paws}"/>
    <rect x="92" y="120" width="19" height="13" rx="6.5" fill="${paws}"/>
    <path d="M41 27 Q32 13 44 8 Q51 15 52 26 Z" fill="${c.ear}"/>
    <path d="M62 25 Q66 11 77 14 Q77 24 70 29 Z" fill="${c.ear}"/>
    <path d="M44 23.5 Q40 16 45.5 13 Q48.5 17.5 49 22.5 Z" fill="${c.inner}"/>
    <circle cx="58" cy="52" r="27" fill="${c.fur}"/>
    <circle cx="44" cy="60" r="9" fill="${c.fur}"/><circle cx="73" cy="60" r="9" fill="${c.fur}"/>
    ${tone === "blue" ? `<ellipse cx="58" cy="70" rx="14" ry="9" fill="${c.chest}"/>` : ""}
    <ellipse cx="58" cy="63" rx="12" ry="8.5" fill="${c.muzzle}"/>
    <ellipse cx="50.5" cy="50" rx="4.6" ry="5" fill="${c.eye}"/><ellipse cx="65.5" cy="50" rx="4.6" ry="5" fill="${c.eye}"/>
    <circle cx="51.8" cy="49" r="1.4" fill="#fff" opacity=".9"/><circle cx="66.8" cy="49" r="1.4" fill="#fff" opacity=".9"/>
    <path d="M56 59.5 L60 59.5 L58 62 Z" fill="#d8988a"/>
    <path d="M58 62 Q58 64.5 55.5 65 M58 62 Q58 64.5 60.5 65" stroke="#b9987e" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <g stroke="#00000026" stroke-width="1.1" stroke-linecap="round">
      <path d="M45 60 L31 58"/><path d="M45 63 L32 65"/>
      <path d="M71 60 L85 58"/><path d="M71 63 L84 65"/>
    </g>
  </g>`;
}
export function CatFull({ tone = "cream", width = 180 }: {
  tone?: "cream" | "blue"; width?: number;
}) {
  return (
    <svg viewBox="0 0 200 140" width={width} aria-hidden style={{ display: "block" }}>
      {catLoafGroup(tone)}
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
