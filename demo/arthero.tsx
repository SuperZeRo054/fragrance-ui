import React, { useEffect, useRef, useState } from "react";
import { Reveal } from "../src";
import "./arthero.css";

/* ================= 六画派数据 ================= */
const MOVES = [
  { id: "realism", zh: "写实主义", en: "REALISM", yrs: "1840 —",
    note: "渐变塑体积，毛色跟着光走。两位馆长没化妆的样子。",
    chip: ["#c9a06a", "#7c8ba0", "#2f2a26"] },
  { id: "impressionism", zh: "印象派", en: "IMPRESSIONNISME", yrs: "1872 —",
    note: "碎笔和光斑，轮廓融进空气，像清晨十点的花园。",
    chip: ["#a48fd0", "#e0a94a", "#8fa8bf"] },
  { id: "ukiyo", zh: "浮世绘", en: "UKIYO-E", yrs: "1831 —",
    note: "普鲁士蓝平涂，红日当头，底下的浪永不停。",
    chip: ["#274b8f", "#eadfc4", "#a63c2e"] },
  { id: "bauhaus", zh: "包豪斯", en: "BAUHAUS", yrs: "1919 —",
    note: "圆、三角、方，两位馆长被拆成一份几何作业。",
    chip: ["#c2452d", "#2b5ea7", "#e8c531"] },
  { id: "pop", zh: "波普艺术", en: "POP ART", yrs: "1962 —",
    note: "网点、重描边，再加一声 PURR。就是漫画封面那一期。",
    chip: ["#e8442e", "#f5c531", "#141414"] },
  { id: "abstract", zh: "抽象主义", en: "ABSTRACTION", yrs: "1910 —",
    note: "认不出耳朵，认得出眼神。",
    chip: ["#c78d5e", "#5e7d8c", "#8c6a9e"] },
];

/* ================= 首页 · 美术馆门厅 ================= */
export function ArtHero() {
  const [idx, setIdx] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = wrapRef.current; if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let id = 0;
    const io = new IntersectionObserver(([e]) => {
      clearInterval(id);
      if (e.isIntersecting) id = window.setInterval(() => setIdx((v) => (v + 1) % MOVES.length), 3800);
    }, { threshold: .3 });
    io.observe(el);
    return () => { io.disconnect(); clearInterval(id); };
  }, []);
  const mv = MOVES[idx];
  return (
    <div className="art-hero" ref={wrapRef} style={{ "--mv-accent": mv.chip[0] } as React.CSSProperties}>
      <Reveal>
        <h1 className="art-title">
          Fragrance<span className="stroke-word">UI</span>
        </h1>
      </Reveal>

      <div className="art-stage">
        <Reveal>
          <div className="art-canvas" aria-label="两位馆长的六种画派轮换画像">
            <svg viewBox="0 0 720 480" role="img">
              <defs>
                <linearGradient id="ga-furA" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#eed9b2" /><stop offset="100%" stopColor="#d2a874" />
                </linearGradient>
                <linearGradient id="ga-furB" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#9aa8b9" /><stop offset="100%" stopColor="#68798e" />
                </linearGradient>
                <radialGradient id="ga-vig" cx="50%" cy="42%" r="75%">
                  <stop offset="62%" stopColor="#000" stopOpacity="0" /><stop offset="100%" stopColor="#000" stopOpacity=".14" />
                </radialGradient>
                <pattern id="ga-dots" width="16" height="16" patternUnits="userSpaceOnUse">
                  <circle cx="5" cy="5" r="3" fill="#e8442e" />
                </pattern>

                {/* —— 馆长 A（奶油 · 右侧端坐）：部件全部走 CSS 变量 —— */}
                <g id="ga-catA">
                  <ellipse className="p-shadow" cx="500" cy="432" rx="112" ry="14" />
                  <path className="p-fur" d="M560,410 Q642,414 650,346 Q652,322 630,323 Q612,324 615,346 Q620,382 552,386 Z" />
                  <path className="p-fur" d="M414,432 Q414,296 500,288 Q586,296 586,432 Z" />
                  <ellipse className="p-fur2" cx="500" cy="380" rx="48" ry="54" />
                  <circle className="p-fur" cx="500" cy="206" r="66" />
                  <path className="p-fur" d="M452,168 Q440,102 452,98 Q470,104 494,138 Z" />
                  <path className="p-fur" d="M548,168 Q560,102 548,98 Q530,104 506,138 Z" />
                  <path className="p-earin" d="M460,156 Q452,114 459,111 Q471,117 486,139 Z" />
                  <path className="p-earin" d="M540,156 Q548,114 541,111 Q529,117 514,139 Z" />
                  <ellipse className="p-eye" cx="476" cy="200" rx="12" ry="14" />
                  <ellipse className="p-eye" cx="524" cy="200" rx="12" ry="14" />
                  <ellipse className="p-pupil" cx="476" cy="202" rx="4.5" ry="9.5" />
                  <ellipse className="p-pupil" cx="524" cy="202" rx="4.5" ry="9.5" />
                  <circle className="p-glint" cx="479" cy="196" r="2.4" />
                  <circle className="p-glint" cx="527" cy="196" r="2.4" />
                  <path className="p-nose" d="M492,222 L508,222 L500,232 Z" />
                  <path className="p-line" d="M500,232 Q500,241 490,243 M500,232 Q500,241 510,243" />
                  <g className="p-whisk">
                    <path d="M446,212 L408,206 M447,221 L410,221 M446,230 L414,236" />
                    <path d="M554,212 L592,206 M553,221 L590,221 M554,230 L586,236" />
                  </g>
                </g>

                {/* —— 馆长 B（蓝灰 · 左前方圆坐） —— */}
                <g id="ga-catB">
                  <ellipse className="p-shadow" cx="300" cy="428" rx="118" ry="13" />
                  <path className="p-fur" d="M198,414 Q176,414 178,394 Q180,376 200,380 Q214,385 214,402 Q214,414 198,414 Z" />
                  <path className="p-fur" d="M192,424 Q192,330 300,322 Q408,330 408,424 Z" />
                  <ellipse className="p-fur2" cx="300" cy="378" rx="52" ry="46" />
                  <circle className="p-fur" cx="300" cy="240" r="58" />
                  <path className="p-fur" d="M262,204 Q252,148 262,145 Q277,151 298,180 Z" />
                  <path className="p-fur" d="M338,204 Q348,148 338,145 Q323,151 302,180 Z" />
                  <path className="p-earin" d="M269,194 Q262,158 268,156 Q279,161 292,181 Z" />
                  <path className="p-earin" d="M331,194 Q338,158 332,156 Q321,161 308,181 Z" />
                  <ellipse className="p-eye" cx="280" cy="234" rx="10.5" ry="12.5" />
                  <ellipse className="p-eye" cx="320" cy="234" rx="10.5" ry="12.5" />
                  <ellipse className="p-pupil" cx="280" cy="236" rx="4" ry="8.5" />
                  <ellipse className="p-pupil" cx="320" cy="236" rx="4" ry="8.5" />
                  <circle className="p-glint" cx="283" cy="230" r="2" />
                  <circle className="p-glint" cx="323" cy="230" r="2" />
                  <path className="p-nose" d="M293,254 L307,254 L300,263 Z" />
                  <path className="p-line" d="M300,263 Q300,271 291,273 M300,263 Q300,271 309,273" />
                  <g className="p-whisk">
                    <path d="M252,246 L220,240 M253,254 L222,254 M252,262 L224,268" />
                    <path d="M348,246 L380,240 M347,254 L378,254 M348,262 L376,268" />
                  </g>
                </g>
              </defs>

              {/* ① 写实 */}
              <g className={`mv mv-realism${idx === 0 ? " on" : ""}`}>
                <rect width="720" height="480" fill="#ece7df" />
                <rect className="fl-breathe" x="86" y="56" width="196" height="300" fill="#fff" opacity=".3" transform="rotate(7 184 206)" />
                <rect y="418" width="720" height="62" fill="#dcd5c8" />
                <use href="#ga-catA" />
                <use href="#ga-catB" />
              </g>

              {/* ② 印象派 */}
              <g className={`mv mv-impres${idx === 1 ? " on" : ""}`}>
                <rect width="720" height="480" fill="#ddd6e6" />
                <g className="fl-drift">
                  <rect x="52" y="298" width="190" height="12" rx="6" fill="#b7a6d6" opacity=".55" />
                  <rect x="380" y="330" width="230" height="12" rx="6" fill="#8fa8bf" opacity=".5" />
                  <rect x="190" y="112" width="170" height="11" rx="6" fill="#e0a94a" opacity=".45" />
                  <rect x="470" y="90" width="150" height="11" rx="6" fill="#c9b6e2" opacity=".5" />
                </g>
                <g className="fl-dapple">
                  <circle cx="150" cy="170" r="26" fill="#fff" opacity=".32" />
                  <circle cx="620" cy="140" r="34" fill="#ffe9b8" opacity=".4" />
                  <circle cx="560" cy="330" r="22" fill="#fff" opacity=".28" />
                  <circle cx="90" cy="360" r="18" fill="#ffd9e2" opacity=".38" />
                </g>
                <use href="#ga-catA" /><use href="#ga-catB" />
              </g>

              {/* ③ 浮世绘 */}
              <g className={`mv mv-ukiyo${idx === 2 ? " on" : ""}`}>
                <rect width="720" height="480" fill="#eadfc4" />
                <circle cx="360" cy="168" r="86" fill="#b23a2a" />
                <circle cx="360" cy="168" r="102" fill="none" stroke="#b23a2a" strokeWidth="2" opacity=".5" />
                <use href="#ga-catA" /><use href="#ga-catB" />
                <g className="fl-bob">
                  <path d="M0,436 Q60,410 120,436 T240,436 T360,436 T480,436 T600,436 T720,436 L720,480 L0,480 Z" fill="#274b8f" />
                  <g fill="#eadfc4"><circle cx="120" cy="432" r="7" /><circle cx="360" cy="432" r="7" /><circle cx="600" cy="432" r="7" /></g>
                </g>
                <g className="fl-bob" style={{ animationDelay: "-1.7s" }}>
                  <path d="M0,458 Q60,436 120,458 T240,458 T360,458 T480,458 T600,458 T720,458 L720,480 L0,480 Z" fill="#1d3a70" />
                </g>
              </g>

              {/* ④ 包豪斯 */}
              <g className={`mv mv-bauhaus${idx === 3 ? " on" : ""}`}>
                <rect width="720" height="480" fill="#e6dfd2" />
                <g opacity=".14" stroke="#191919"><path d="M120,0 V480 M600,0 V480 M0,110 H720" /></g>
                <g className="fl-rot">
                  <circle cx="170" cy="140" r="66" fill="#c2452d" />
                  <circle cx="170" cy="86" r="11" fill="#e6dfd2" />
                </g>
                <path d="M560,86 L655,240 L465,240 Z" fill="#2b5ea7" />
                <rect y="440" width="720" height="30" fill="#191919" />
                <use href="#ga-catA" /><use href="#ga-catB" />
              </g>

              {/* ⑤ 波普 */}
              <g className={`mv mv-pop${idx === 4 ? " on" : ""}`}>
                <rect width="720" height="480" fill="#f2cf47" />
                <rect className="fl-slide" x="-32" width="784" height="96" fill="url(#ga-dots)" opacity=".8" />
                <circle cx="392" cy="268" r="188" fill="#fff" stroke="#141414" strokeWidth="5" />
                <text x="86" y="150" className="pop-word" transform="rotate(-10 86 150)">PURR!</text>
                <use href="#ga-catA" /><use href="#ga-catB" />
              </g>

              {/* ⑥ 抽象 */}
              <g className={`mv mv-abst${idx === 5 ? " on" : ""}`}>
                <rect width="720" height="480" fill="#23222b" />
                <g className="fl-orbit" fill="none" strokeWidth="2.5">
                  <circle cx="176" cy="136" r="46" stroke="#c78d5e" />
                  <path d="M580,116 L642,220 L518,220 Z" stroke="#5e7d8c" />
                  <path d="M112,352 Q196,288 268,344" stroke="#8c6a9e" />
                </g>
                <circle cx="628" cy="116" r="15" fill="#c2452d" />
                <rect x="596" y="330" width="70" height="70" fill="none" stroke="#e8c531" strokeWidth="2.5" opacity=".7" />
                <use href="#ga-catA" /><use href="#ga-catB" />
              </g>

              <rect width="720" height="480" fill="url(#ga-vig)" pointerEvents="none" />
            </svg>
            <i className="art-canvas__grain" aria-hidden />
          </div>
        </Reveal>

        <Reveal delay={110}>
          <aside className="plaque-wrap">
            <div className="plaque" key={mv.id}>
              <span className="plaque__no">PL.{String(idx + 1).padStart(2, "0")} / 06 · {mv.yrs}</span>
              <h3 className="plaque__zh">{mv.zh}</h3>
              <span className="plaque__en">{mv.en}</span>
              <p className="plaque__note">{mv.note}</p>
              <div className="plaque__foot">
                <span className="plaque__chips">{mv.chip.map((c) => <i key={c} style={{ background: c }} />)}</span>
                <span className="plaque__sig">painted in pure CSS</span>
              </div>
            </div>
            <div className="art-dots">
              {MOVES.map((m, i) => (
                <button key={m.id} className={i === idx ? "on" : ""} onClick={() => setIdx(i)}
                  aria-label={m.zh} title={m.zh} />
              ))}
            </div>
          </aside>
        </Reveal>
      </div>
    </div>
  );
}
