import React, { useEffect, useRef } from "react";
import { CAT_PALETTE } from "../src/brand/cats";

export type HostId = "wanwan" | "qianqian";

const META: Record<HostId, { name: string; tone: "wan" | "qian" }> = {
  wanwan: { name: "万万", tone: "wan" },
  qianqian: { name: "千千", tone: "qian" },
};

/** 描边猫：耳朵压在头版之下，与头一体成剪影，不会飞。
 *  cat-tail / cat-eye / cat-ear-l / cat-ear-r 是状态机与常驻动画的钩子类。 */
export function CatSvg({ tone = "wan", className = "", width = 128 }: {
  tone?: "wan" | "qian"; className?: string; width?: number;
}) {
  const c = CAT_PALETTE[tone];
  return (
    <svg className={`hostcat ${tone} ${className}`} viewBox="0 0 140 122" width={width} aria-hidden>
      <g className="cat-tail">
        <path d="M103,100 C116,99 123,89 119,79 C117,73 108,74 110,83"
          fill="none" stroke={c.ink} strokeWidth="9" strokeLinecap="round" />
      </g>
      <path className="cat-ear-l" d="M48,6 L61,17 L47,25 Z"
        fill={c.fur} stroke={c.ink} strokeWidth="2.5" strokeLinejoin="round" />
      <path className="cat-ear-r" d="M92,6 L79,17 L93,25 Z"
        fill={c.fur} stroke={c.ink} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M38,106 C38,76 48,60 70,58 C92,60 102,76 102,106 Z"
        fill={c.fur} stroke={c.ink} strokeWidth="2.5" strokeLinejoin="round" />
      <ellipse cx="70" cy="94" rx="19" ry="13" fill={c.chest} />
      <circle cx="70" cy="40" r="30" fill={c.fur} stroke={c.ink} strokeWidth="2.5" />
      {tone === "wan" && (
        <g stroke="#c1935a" strokeWidth="3" strokeLinecap="round" opacity=".55">
          <path d="M64,19 v6" /><path d="M70,17 v7" /><path d="M76,19 v6" />
        </g>
      )}
      <g className="cat-eye">
        <circle cx="58" cy="41" r="5" fill={c.iris} />
        <circle cx="82" cy="41" r="5" fill={c.iris} />
        <circle cx="59.5" cy="41" r="2.2" fill="#171310" />
        <circle cx="83.5" cy="41" r="2.2" fill="#171310" />
        <circle cx="56.5" cy="38.6" r="1.3" fill="#fff" />
        <circle cx="80.5" cy="38.6" r="1.3" fill="#fff" />
      </g>
      <path d="M66,50 L74,50 L70,55 Z" fill={c.nose} />
      <path d="M70,55 V58 M70,58 Q67,61 63,59 M70,58 Q73,61 77,59"
        fill="none" stroke={c.ink} strokeWidth="1.8" strokeLinecap="round" />
      <g stroke={c.ink} strokeWidth="1.7" strokeLinecap="round" opacity=".45">
        <path d="M44,50 L30,47" /><path d="M45,55 L31,58" />
        <path d="M96,50 L110,47" /><path d="M95,55 L109,58" />
      </g>
    </svg>
  );
}

/** 区块吉祥物：描边猫走进场（滚动擦洗），到场后呼吸 / 摆尾 / 眨眼。 */
export function SectionHost({ host }: { host: HostId }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (CSS.supports?.("animation-timeline: view()")) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("play"); io.disconnect(); }
    }, { threshold: .4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const meta = META[host];
  return (
    <div className="host-scene" data-host={host} ref={ref}>
      <div className="host-walker">
        <CatSvg tone={meta.tone} />
        <i className="host-tag">{meta.name}</i>
      </div>
    </div>
  );
}
