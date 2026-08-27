import React, { useEffect, useRef, useState } from "react";
import "./loading.css";

/* ---------------- Spinner：四种口味的加载指示 ---------------- */
export function Spinner({ variant = "ring", size = 34, label }: {
  variant?: "ring" | "dots" | "bars" | "pulse"; size?: number; label?: string;
}) {
  return (
    <span className={`mui-spinner mui-spinner--${variant}`} style={{ width: size, height: size }}
      role="status" aria-label={label ?? "加载中"}>
      {variant === "dots" && <>{[0, 1, 2].map((i) => <i key={i} style={{ "--i": i } as React.CSSProperties} />)}</>}
      {variant === "bars" && <>{[0, 1, 2, 3].map((i) => <i key={i} style={{ "--i": i } as React.CSSProperties} />)}</>}
    </span>
  );
}

/* ---------------- Progress：金色进度条 ---------------- */
export function Progress({ value, label, showNum = true }: {
  value: number; label?: string; showNum?: boolean;
}) {
  return (
    <div className="mui-progress-row">
      {label && <span className="lbl">{label}</span>}
      <div className="mui-progress" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
        <i style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
      </div>
      {showNum && <output>{Math.round(value)}%</output>}
    </div>
  );
}

/* ---------------- CountUp：数字滚动（进入视口触发，expo-out） ---------------- */
export function CountUp({ to, duration = 1300, prefix = "", suffix = "" }: {
  to: number; duration?: number; prefix?: string; suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min((t - t0) / duration, 1);
        setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: .4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to, duration]);
  return <span ref={ref}>{prefix}{val}{suffix}</span>;
}

/* ---------------- LazyImage：懒加载 + blur-up（进视口才拉取，加载完成淡入） ---------------- */
export function LazyImage({ src, alt = "", ratio = "16 / 10", style }: {
  src: string; alt?: string; ratio?: string; style?: React.CSSProperties;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  useEffect(() => {
    const el = wrap.current;
    if (!el || !("IntersectionObserver" in window)) { setShouldLoad(true); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShouldLoad(true); io.disconnect(); }
    }, { rootMargin: "300px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={wrap} className={`mui-lazy${loaded ? " loaded" : ""}`}
      style={{ aspectRatio: ratio, ...style }}>
      {shouldLoad && (
        <img src={src} alt={alt} loading="lazy" decoding="async"
          onLoad={() => setLoaded(true)} />
      )}
      {!loaded && <span className="mui-lazy__shimmer" aria-hidden />}
    </div>
  );
}
