import React, { useEffect, useRef, useState } from "react";
import { Reveal } from "../src";
import "./arthero.css";

/* ================= 六画派数据 ================= */
const MOVES = [
  { id: "realism", zh: "写实主义", en: "REALISM", yrs: "1840 —",
    note: "渐变塑体积，毛色跟着光走。两位吉祥物没化妆的样子。",
    chip: ["#c9a06a", "#7c8ba0", "#2f2a26"] },
  { id: "impressionism", zh: "印象派", en: "IMPRESSIONNISME", yrs: "1872 —",
    note: "碎笔和光斑，轮廓融进空气，像清晨十点的花园。",
    chip: ["#a48fd0", "#e0a94a", "#8fa8bf"] },
  { id: "ukiyo", zh: "浮世绘", en: "UKIYO-E", yrs: "1831 —",
    note: "普鲁士蓝平涂，红日当头，底下的浪永不停。",
    chip: ["#274b8f", "#eadfc4", "#a63c2e"] },
  { id: "bauhaus", zh: "包豪斯", en: "BAUHAUS", yrs: "1919 —",
    note: "圆、三角、方，两只吉祥物被拆成一份几何作业。",
    chip: ["#c2452d", "#2b5ea7", "#e8c531"] },
  { id: "pop", zh: "波普艺术", en: "POP ART", yrs: "1962 —",
    note: "网点、重描边，再加一声 PURR。就是漫画封面那一期。",
    chip: ["#e8442e", "#f5c531", "#141414"] },
  { id: "abstract", zh: "抽象主义", en: "ABSTRACTION", yrs: "1910 —",
    note: "认不出耳朵，认得出眼神。",
    chip: ["#c78d5e", "#5e7d8c", "#8c6a9e"] },
];

/* 确定性随机（同一 seed 每次渲染同一幅画） */
function mulberry32(a: number) {
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* 印象派笔触：在椭圆域内撒色点 */
function Dabs({ cx, cy, rx, ry, n, seed, colors, base = .6 }: {
  cx: number; cy: number; rx: number; ry: number; n: number; seed: number;
  colors: string[]; base?: number;
}) {
  const items: React.ReactNode[] = [];
  const rnd = mulberry32(seed);
  for (let i = 0; i < n; i++) {
    const a = rnd() * Math.PI * 2;
    const r = Math.sqrt(rnd());
    const x = +(cx + Math.cos(a) * rx * r).toFixed(1);
    const y = +(cy + Math.sin(a) * ry * r).toFixed(1);
    const w = 9 + rnd() * 15, h = 5 + rnd() * 8;
    const rot = Math.round((rnd() * 50 - 25) + (x - cx) * .22);
    items.push(
      <ellipse key={i} cx={x} cy={y} rx={+(w / 2).toFixed(1)} ry={+(h / 2).toFixed(1)}
        transform={`rotate(${rot} ${x} ${y})`}
        fill={colors[(rnd() * colors.length) | 0]}
        opacity={+(base + rnd() * .35).toFixed(2)} />,
    );
  }
  return <g>{items}</g>;
}

/* ================= 首页 · 美术馆门厅 ================= */
export function ArtHero() {
  const [idx, setIdx] = useState(0);
  const [beat, setBeat] = useState(0);
  const [visible, setVisible] = useState(true);
  const wrapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = wrapRef.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: .3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  // 每次换画（含手动选段，点同一格也重置）重新计时；离屏 / reduced-motion 不自动播
  useEffect(() => {
    if (!visible || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => setIdx((v) => (v + 1) % MOVES.length), 4200);
    return () => window.clearTimeout(id);
  }, [idx, beat, visible]);
  const mv = MOVES[idx];
  return (
    <div className="art-hero" ref={wrapRef} style={{ "--mv-accent": mv.chip[0] } as React.CSSProperties}>
      <Reveal>
        <h1 className="art-title">
          Fragrance<span className="stroke-word">UI</span>
        </h1>
        <p className="hero-meaning">
          <span className="hero-meaning__en">A design language for agent-era frontends.</span>
          <span className="hero-meaning__zh">面向 Agent 时代前端的一套设计语言。</span>
        </p>
      </Reveal>

      <div className="art-stage">
        <Reveal>
          <div className="art-canvas" aria-label="两只吉祥物的六种画派轮换画像">
            <svg viewBox="0 0 720 480" role="img">
              <defs>
                <linearGradient id="ga-furA" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f0dcb2" /><stop offset="55%" stopColor="#e0bd85" /><stop offset="100%" stopColor="#c99a5e" />
                </linearGradient>
                <linearGradient id="ga-furB" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a3b3c4" /><stop offset="55%" stopColor="#8397ab" /><stop offset="100%" stopColor="#64788e" />
                </linearGradient>
                <radialGradient id="ga-headA" cx="42%" cy="36%" r="75%">
                  <stop offset="0%" stopColor="#f6e6c0" /><stop offset="70%" stopColor="#e2c08a" /><stop offset="100%" stopColor="#c99a5e" />
                </radialGradient>
                <radialGradient id="ga-headB" cx="42%" cy="36%" r="75%">
                  <stop offset="0%" stopColor="#aebfce" /><stop offset="70%" stopColor="#8ba0b4" /><stop offset="100%" stopColor="#64788e" />
                </radialGradient>
                <radialGradient id="ga-irisG" cx="38%" cy="34%" r="80%">
                  <stop offset="0%" stopColor="#b9d184" /><stop offset="60%" stopColor="#6f9448" /><stop offset="100%" stopColor="#44682f" />
                </radialGradient>
                <radialGradient id="ga-irisB" cx="38%" cy="34%" r="80%">
                  <stop offset="0%" stopColor="#9db8dd" /><stop offset="60%" stopColor="#5b7fb0" /><stop offset="100%" stopColor="#33517c" />
                </radialGradient>
                <radialGradient id="ga-vig" cx="50%" cy="42%" r="78%">
                  <stop offset="60%" stopColor="#000" stopOpacity="0" /><stop offset="100%" stopColor="#000" stopOpacity=".15" />
                </radialGradient>
                <pattern id="ga-dots" width="16" height="16" patternUnits="userSpaceOnUse">
                  <circle cx="5" cy="5" r="3" fill="#e8442e" />
                </pattern>
                <pattern id="ga-blush" width="9" height="9" patternUnits="userSpaceOnUse">
                  <circle cx="3" cy="3" r="1.7" fill="#e08a76" />
                </pattern>
                <clipPath id="ga-clipBig"><circle cx="300" cy="268" r="155" /></clipPath>
                <clipPath id="ga-clipSmall"><circle cx="560" cy="298" r="90" /></clipPath>
              </defs>

              {/* ① 写实：细描 + 三层光影 + 虎皮纹 */}
              <g className={`mv mv-realism${idx === 0 ? " on" : ""}`}>
                <rect width="720" height="480" fill="#ede8e0" />
                <rect x="64" y="36" width="216" height="336" fill="#fff" opacity=".2" transform="rotate(8 172 204)" className="fl-breathe" />
                <rect y="396" width="720" height="36" fill="#e1dacd" />
                <rect y="396" width="720" height="2" fill="#cdc4b1" />
                <rect y="430" width="720" height="50" fill="#d7cfc0" />
                <ellipse cx="300" cy="431" rx="122" ry="12" fill="#000" opacity=".1" />
                <ellipse cx="506" cy="434" rx="104" ry="11" fill="#000" opacity=".1" />

                {/* 蓝灰猫 · 圆坐 */}
                <path d="M196,414 C176,414 168,398 175,384 C181,372 196,371 203,381" fill="none" stroke="#6d8096" strokeWidth="23" strokeLinecap="round" />
                <path d="M190,424 C190,330 224,298 300,294 C376,298 410,330 410,424 Z" fill="url(#ga-furB)" />
                <ellipse cx="300" cy="306" rx="30" ry="12" fill="#000" opacity=".08" />
                <g fill="#c9d5e1" opacity=".85">
                  <ellipse cx="270" cy="392" rx="25" ry="32" /><ellipse cx="300" cy="398" rx="30" ry="36" /><ellipse cx="330" cy="392" rx="25" ry="32" />
                </g>
                <rect x="250" y="408" width="46" height="22" rx="11" fill="#93a5b8" />
                <rect x="304" y="408" width="46" height="22" rx="11" fill="#93a5b8" />
                <path d="M266,409 v20 M280,409 v20 M320,409 v20 M334,409 v20" stroke="#5f7388" strokeWidth="1.6" opacity=".6" />
                <circle cx="300" cy="238" r="58" fill="url(#ga-headB)" />
                <path d="M257,200 C249,158 252,138 261,136 C271,141 285,161 293,179 Z" fill="#7d90a5" />
                <path d="M343,200 C351,158 348,138 339,136 C329,141 315,161 307,179 Z" fill="#7d90a5" />
                <path d="M264,186 C260,158 263,148 268,147 C274,151 282,163 288,175 Z" fill="#4f637b" />
                <path d="M336,186 C340,158 337,148 332,147 C326,151 318,163 312,175 Z" fill="#4f637b" />
                <ellipse cx="300" cy="262" rx="27" ry="20" fill="#d9e2ec" />
                <ellipse cx="278" cy="232" rx="11" ry="12.5" fill="url(#ga-irisB)" />
                <ellipse cx="322" cy="232" rx="11" ry="12.5" fill="url(#ga-irisB)" />
                <ellipse cx="278" cy="234" rx="4" ry="8.5" fill="#1c2430" />
                <ellipse cx="322" cy="234" rx="4" ry="8.5" fill="#1c2430" />
                <circle cx="281" cy="228" r="2.2" fill="#fff" /><circle cx="325" cy="228" r="2.2" fill="#fff" />
                <path d="M266,227 Q278,219 290,227 M310,227 Q322,219 334,227" fill="none" stroke="#2c3644" strokeWidth="2.3" strokeLinecap="round" />
                <path d="M292,252 L308,252 L300,262 Z" fill="#c56a5c" />
                <path d="M300,262 V270 M300,270 Q294,277 285,273 M300,270 Q306,277 315,273" fill="none" stroke="#5d6b7a" strokeWidth="2" strokeLinecap="round" />
                <g fill="#8fa0b2"><circle cx="272" cy="252" r="1.2" /><circle cx="268" cy="258" r="1.2" /><circle cx="274" cy="262" r="1.2" /><circle cx="328" cy="252" r="1.2" /><circle cx="332" cy="258" r="1.2" /><circle cx="326" cy="262" r="1.2" /></g>
                <g fill="none" stroke="#eef3f8" strokeWidth="1.8" strokeLinecap="round" opacity=".95">
                  <path d="M250,248 C236,243 222,242 208,245" /><path d="M251,256 C237,255 223,256 210,260" /><path d="M250,264 C237,267 225,272 214,278" />
                  <path d="M350,248 C364,243 378,242 392,245" /><path d="M349,256 C363,255 377,256 390,260" /><path d="M350,264 C363,267 375,272 386,278" />
                </g>

                {/* 奶油虎皮猫 · 端坐 */}
                <path d="M560,412 C628,412 654,374 648,336 C645,316 624,314 617,331" fill="none" stroke="#d3ab74" strokeWidth="25" strokeLinecap="round" />
                <path d="M560,412 C628,412 654,374 648,336 C645,316 624,314 617,331" fill="none" stroke="#b98d55" strokeWidth="25" strokeDasharray="9 30" strokeDashoffset="16" opacity=".55" />
                <path d="M418,432 C414,346 438,272 500,264 C562,272 586,346 582,432 Z" fill="url(#ga-furA)" />
                <ellipse cx="466" cy="332" rx="34" ry="66" fill="#f7e8c6" opacity=".45" transform="rotate(16 466 332)" />
                <g fill="#f6ecd4" opacity=".9">
                  <ellipse cx="472" cy="396" rx="25" ry="32" /><ellipse cx="502" cy="402" rx="30" ry="36" /><ellipse cx="532" cy="396" rx="25" ry="32" />
                </g>
                <g fill="none" stroke="#c1935a" strokeWidth="9" strokeLinecap="round" opacity=".5">
                  <path d="M432,382 C452,370 470,368 484,376" /><path d="M426,408 C450,394 468,392 484,398" />
                  <path d="M568,382 C556,370 540,368 526,376" /><path d="M574,408 C562,394 546,392 530,398" />
                </g>
                <rect x="452" y="410" width="46" height="22" rx="11" fill="#e8d0a2" />
                <rect x="506" y="410" width="46" height="22" rx="11" fill="#e8d0a2" />
                <path d="M468,411 v20 M482,411 v20 M522,411 v20 M536,411 v20" stroke="#b98d55" strokeWidth="1.6" opacity=".65" />
                <circle cx="500" cy="204" r="64" fill="url(#ga-headA)" />
                <path d="M452,166 C444,120 447,100 457,98 C467,103 482,126 492,146 Z" fill="#dfb882" />
                <path d="M548,166 C556,120 553,100 543,98 C533,103 518,126 508,146 Z" fill="#dfb882" />
                <path d="M460,152 C455,122 458,110 464,109 C470,113 479,127 486,142 Z" fill="#c99a5f" />
                <path d="M540,152 C545,122 542,110 536,109 C530,113 521,127 514,142 Z" fill="#c99a5f" />
                <g fill="none" stroke="#c1935a" strokeWidth="6" strokeLinecap="round" opacity=".55">
                  <path d="M486,148 q-3,10 1,17" /><path d="M500,144 q0,10 0,17" /><path d="M514,148 q3,10 -1,17" />
                </g>
                <g fill="#f6ead0"><circle cx="483" cy="226" r="15" /><circle cx="517" cy="226" r="15" /></g>
                <ellipse cx="476" cy="198" rx="12" ry="13" fill="url(#ga-irisG)" />
                <ellipse cx="524" cy="198" rx="12" ry="13" fill="url(#ga-irisG)" />
                <ellipse cx="476" cy="200" rx="4.5" ry="9" fill="#241d12" />
                <ellipse cx="524" cy="200" rx="4.5" ry="9" fill="#241d12" />
                <circle cx="479" cy="194" r="2.4" fill="#fff" /><circle cx="527" cy="194" r="2.4" fill="#fff" />
                <path d="M463,193 Q476,185 489,193 M511,193 Q524,185 537,193" fill="none" stroke="#6b5232" strokeWidth="2.4" strokeLinecap="round" />
                <path d="M492,222 L508,222 L500,232 Z" fill="#cf8272" />
                <path d="M500,232 V240 M500,240 Q494,247 485,243 M500,240 Q506,247 515,243" fill="none" stroke="#8a6a4a" strokeWidth="2" strokeLinecap="round" />
                <g fill="#c8ab7d"><circle cx="470" cy="242" r="1.2" /><circle cx="466" cy="248" r="1.2" /><circle cx="472" cy="252" r="1.2" /><circle cx="530" cy="242" r="1.2" /><circle cx="534" cy="248" r="1.2" /><circle cx="528" cy="252" r="1.2" /></g>
                <g fill="none" stroke="#fff7ea" strokeWidth="1.9" strokeLinecap="round" opacity=".95">
                  <path d="M446,214 C428,209 412,209 398,213" /><path d="M447,222 C429,222 413,224 400,229" /><path d="M446,230 C429,233 415,238 404,244" />
                  <path d="M554,214 C572,209 588,209 602,213" /><path d="M553,222 C571,222 587,224 600,229" /><path d="M554,230 C571,233 585,238 596,244" />
                </g>
              </g>

              {/* ② 印象派：色点堆叠成猫 */}
              <g className={`mv mv-impres${idx === 1 ? " on" : ""}`}>
                <rect width="720" height="480" fill="#e3dced" />
                <g className="fl-drift">
                  <rect x="40" y="330" width="180" height="13" rx="7" fill="#b7a6d6" opacity=".6" />
                  <rect x="360" y="356" width="240" height="13" rx="7" fill="#8fa8bf" opacity=".55" />
                  <rect x="150" y="120" width="170" height="12" rx="6" fill="#e0a94a" opacity=".5" />
                  <rect x="470" y="86" width="160" height="12" rx="6" fill="#c9b6e2" opacity=".6" />
                  <rect x="60" y="220" width="130" height="12" rx="6" fill="#9ab5a4" opacity=".5" />
                  <rect x="540" y="250" width="130" height="12" rx="6" fill="#d8a0a8" opacity=".5" />
                </g>
                <circle className="fl-soft" cx="622" cy="92" r="42" fill="#f2d488" opacity=".8" />
                {/* 奶油猫 */}
                <ellipse cx="500" cy="340" rx="86" ry="96" fill="#e0c493" opacity=".85" />
                <circle cx="500" cy="204" r="60" fill="#e2c793" opacity=".9" />
                <path d="M456,166 C448,122 452,104 462,102 C473,108 487,130 495,148 Z" fill="#d9b485" />
                <path d="M544,166 C552,122 548,104 538,102 C527,108 513,130 505,148 Z" fill="#d9b485" />
                <Dabs cx={500} cy={340} rx={82} ry={92} n={54} seed={7}
                  colors={["#eed9ae", "#d9b485", "#f2e3c0", "#cfa76e", "#efe0d0", "#c8955c"]} />
                <Dabs cx={500} cy={204} rx={57} ry={55} n={38} seed={21}
                  colors={["#eed9ae", "#e2c08a", "#f2e3c0", "#d9b485", "#f5ecd8"]} />
                <Dabs cx={500} cy={386} rx={40} ry={34} n={14} seed={33} colors={["#f7eed6", "#f2e3c0"]} base={.7} />
                <ellipse cx="477" cy="198" rx="8" ry="10" fill="#4a423c" />
                <ellipse cx="523" cy="198" rx="8" ry="10" fill="#4a423c" />
                <circle cx="480" cy="194" r="2.2" fill="#fff" opacity=".9" /><circle cx="526" cy="194" r="2.2" fill="#fff" opacity=".9" />
                <ellipse cx="500" cy="222" rx="6.5" ry="5" fill="#b56a58" />
                <path d="M500,227 q-1,7 -8,9 M500,227 q1,7 8,9" fill="none" stroke="#8a6a4a" strokeWidth="2" strokeLinecap="round" />
                <g fill="none" stroke="#f5ecd8" strokeWidth="2" strokeLinecap="round" opacity=".8">
                  <path d="M448,212 q-20,-4 -36,0" /><path d="M449,220 q-20,2 -35,7" />
                  <path d="M552,212 q20,-4 36,0" /><path d="M551,220 q20,2 35,7" />
                </g>
                {/* 蓝灰猫 */}
                <ellipse cx="292" cy="366" rx="92" ry="74" fill="#8496ab" opacity=".85" />
                <circle cx="292" cy="248" r="56" fill="#8ba0b4" opacity=".9" />
                <path d="M252,214 C245,176 248,160 257,158 C266,163 278,180 285,196 Z" fill="#7d90a8" />
                <path d="M332,214 C339,176 336,160 327,158 C318,163 306,180 299,196 Z" fill="#7d90a8" />
                <Dabs cx={292} cy={366} rx={88} ry={70} n={48} seed={55}
                  colors={["#9db3c8", "#7d90a8", "#b4c4d4", "#6d8098", "#c3d0dd"]} />
                <Dabs cx={292} cy={248} rx={53} ry={52} n={34} seed={68}
                  colors={["#9db3c8", "#8ba0b4", "#b4c4d4", "#a9bacd"]} />
                <ellipse cx="272" cy="242" rx="7" ry="9" fill="#3c444e" />
                <ellipse cx="312" cy="242" rx="7" ry="9" fill="#3c444e" />
                <circle cx="275" cy="238" r="2" fill="#fff" opacity=".9" /><circle cx="315" cy="238" r="2" fill="#fff" opacity=".9" />
                <ellipse cx="292" cy="264" rx="6" ry="4.5" fill="#b56a58" />
                <g fill="none" stroke="#dfe6f0" strokeWidth="2" strokeLinecap="round" opacity=".8">
                  <path d="M244,256 q-19,-4 -34,0" /><path d="M245,263 q-19,2 -33,7" />
                  <path d="M340,256 q19,-4 34,0" /><path d="M339,263 q19,2 33,7" />
                </g>
                <g opacity=".85"><circle cx="88" cy="398" r="7" fill="#d8a0a8" /><circle cx="112" cy="410" r="5" fill="#c9b6e2" /><circle cx="66" cy="418" r="5" fill="#e0a94a" /></g>
              </g>

              {/* ③ 浮世绘：独立造型 + 浪卷 + 印章 */}
              <g className={`mv mv-ukiyo${idx === 2 ? " on" : ""}`}>
                <rect width="720" height="480" fill="#ecdcbc" />
                <rect x="-24" y="34" width="430" height="26" rx="13" fill="#d9b25f" stroke="#b98f43" strokeWidth="1.5" />
                <rect x="360" y="76" width="290" height="22" rx="11" fill="#d9b25f" stroke="#b98f43" strokeWidth="1.5" />
                <circle cx="372" cy="188" r="84" fill="#b23a2a" />
                <circle cx="372" cy="188" r="100" fill="none" stroke="#b23a2a" strokeWidth="2" opacity=".4" />
                <circle cx="372" cy="188" r="92" fill="none" stroke="#b23a2a" strokeWidth="1.2" opacity=".25" />

                {/* 奶油猫 · 尾巴竖起 */}
                <path d="M556,398 C612,390 632,348 620,306" fill="none" stroke="#1c2434" strokeWidth="31" strokeLinecap="round" />
                <path d="M556,398 C612,390 632,348 620,306" fill="none" stroke="#eadfc4" strokeWidth="24" strokeLinecap="round" />
                <path d="M556,398 C612,390 632,348 620,306" fill="none" stroke="#b8563e" strokeWidth="24" strokeDasharray="9 30" strokeDashoffset="14" />
                <path d="M420,432 C420,336 442,268 500,260 C558,268 580,336 580,432 Z" fill="#eadfc4" stroke="#1c2434" strokeWidth="3.5" />
                <g fill="none" stroke="#b8563e" strokeWidth="8" strokeLinecap="round">
                  <path d="M434,392 C454,380 472,378 486,384" /><path d="M428,416 C452,402 470,400 486,406" />
                  <path d="M566,392 C554,380 540,378 526,384" /><path d="M572,416 C560,402 544,400 528,406" />
                </g>
                <rect x="446" y="412" width="48" height="20" rx="10" fill="#eadfc4" stroke="#1c2434" strokeWidth="2.5" />
                <rect x="506" y="412" width="48" height="20" rx="10" fill="#eadfc4" stroke="#1c2434" strokeWidth="2.5" />
                <path d="M464,413 v18 M482,413 v18 M524,413 v18 M542,413 v18" stroke="#1c2434" strokeWidth="1.6" />
                <circle cx="500" cy="206" r="62" fill="#eadfc4" stroke="#1c2434" strokeWidth="3.5" />
                <path d="M452,162 C446,114 452,100 462,102 C474,108 488,132 496,148 Z" fill="#eadfc4" stroke="#1c2434" strokeWidth="3" />
                <path d="M548,162 C554,114 548,100 538,102 C526,108 512,132 504,148 Z" fill="#eadfc4" stroke="#1c2434" strokeWidth="3" />
                <path d="M461,148 C457,120 461,110 467,111 C473,115 481,128 487,141 Z" fill="#b8563e" />
                <path d="M539,148 C543,120 539,110 533,111 C527,115 519,128 513,141 Z" fill="#b8563e" />
                <g fill="none" stroke="#b8563e" strokeWidth="5.5" strokeLinecap="round">
                  <path d="M487,150 q-2,9 1,15" /><path d="M500,146 q0,9 0,15" /><path d="M513,150 q2,9 -1,15" />
                </g>
                <ellipse cx="476" cy="200" rx="12" ry="9" fill="#f7f1de" stroke="#1c2434" strokeWidth="2" />
                <ellipse cx="524" cy="200" rx="12" ry="9" fill="#f7f1de" stroke="#1c2434" strokeWidth="2" />
                <ellipse cx="476" cy="201" rx="3" ry="6.5" fill="#1c2434" />
                <ellipse cx="524" cy="201" rx="3" ry="6.5" fill="#1c2434" />
                <path d="M462,195 Q476,186 490,195 M510,195 Q524,186 538,195" fill="none" stroke="#1c2434" strokeWidth="4" strokeLinecap="round" />
                <path d="M492,222 L508,222 L500,232 Z" fill="#b23a2a" />
                <path d="M500,232 V240 M500,240 Q493,247 484,243 M500,240 Q507,247 516,243" fill="none" stroke="#1c2434" strokeWidth="2.4" strokeLinecap="round" />
                <g stroke="#1c2434" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M448,214 L410,208" /><path d="M448,222 L408,224" /><path d="M448,230 L412,238" />
                  <path d="M552,214 L590,208" /><path d="M552,222 L592,224" /><path d="M552,230 L588,238" />
                </g>

                {/* 蓝灰猫 · 腹部浪纹 */}
                <path d="M186,418 C168,418 160,402 167,388 C173,377 187,376 194,385" fill="none" stroke="#1c2434" strokeWidth="27" strokeLinecap="round" />
                <path d="M186,418 C168,418 160,402 167,388 C173,377 187,376 194,385" fill="none" stroke="#2e4a7d" strokeWidth="20" strokeLinecap="round" />
                <path d="M192,424 C192,330 220,296 296,290 C372,296 400,330 400,424 Z" fill="#2e4a7d" stroke="#1c2434" strokeWidth="3.5" />
                <g fill="none" stroke="#eadfc4" strokeWidth="4" strokeLinecap="round">
                  <path d="M244,386 q12,-16 24,0 t24,0 t24,0" /><path d="M250,404 q12,-16 24,0 t24,0 t24,0" />
                </g>
                <circle cx="296" cy="238" r="56" fill="#2e4a7d" stroke="#1c2434" strokeWidth="3.5" />
                <path d="M256,198 C250,154 256,140 265,142 C276,147 288,168 295,184 Z" fill="#2e4a7d" stroke="#1c2434" strokeWidth="3" />
                <path d="M336,198 C342,154 336,140 327,142 C316,147 304,168 297,184 Z" fill="#2e4a7d" stroke="#1c2434" strokeWidth="3" />
                <path d="M264,186 C260,160 263,150 268,151 C274,155 281,167 287,179 Z" fill="#a63c2e" />
                <path d="M328,186 C332,160 329,150 324,151 C318,155 311,167 305,179 Z" fill="#a63c2e" />
                <ellipse cx="274" cy="232" rx="11" ry="8.5" fill="#eadfc4" stroke="#1c2434" strokeWidth="2" />
                <ellipse cx="318" cy="232" rx="11" ry="8.5" fill="#eadfc4" stroke="#1c2434" strokeWidth="2" />
                <ellipse cx="274" cy="233" rx="2.8" ry="6" fill="#1c2434" />
                <ellipse cx="318" cy="233" rx="2.8" ry="6" fill="#1c2434" />
                <path d="M261,227 Q274,219 287,227 M305,227 Q318,219 331,227" fill="none" stroke="#1c2434" strokeWidth="3.6" strokeLinecap="round" />
                <path d="M289,254 L303,254 L296,263 Z" fill="#a63c2e" />
                <g stroke="#dfe6f2" strokeWidth="2" strokeLinecap="round">
                  <path d="M250,246 L216,240" /><path d="M250,254 L214,256" /><path d="M250,262 L218,268" />
                  <path d="M342,246 L376,240" /><path d="M342,254 L378,256" /><path d="M342,262 L374,268" />
                </g>

                {/* 浪 + 印章 */}
                <g className="fl-bob">
                  <path d="M0,438 Q60,414 120,438 T240,438 T360,438 T480,438 T600,438 T720,438 V480 H0 Z" fill="#274b8f" />
                  <g fill="#274b8f" stroke="#eadfc4" strokeWidth="2">
                    <path d="M120,436 c-3,-16 9,-27 24,-24 c11,3 15,15 8,23 c-5,6 -15,5 -18,-1 c-3,-5 1,-11 7,-11" />
                    <path d="M480,436 c-3,-16 9,-27 24,-24 c11,3 15,15 8,23 c-5,6 -15,5 -18,-1 c-3,-5 1,-11 7,-11" />
                  </g>
                  <g fill="#eadfc4"><circle cx="160" cy="432" r="3" /><circle cx="520" cy="432" r="3" /><circle cx="300" cy="440" r="2.5" /></g>
                </g>
                <g className="fl-bob" style={{ animationDelay: "-1.6s" }}>
                  <path d="M0,460 Q60,438 120,460 T240,460 T360,460 T480,460 T600,460 T720,460 V480 H0 Z" fill="#1d3a70" />
                </g>
                <g transform="rotate(6 664 416)">
                  <rect x="644" y="396" width="40" height="40" rx="4" fill="#b23a2a" />
                  <rect x="658" y="406" width="24" height="24" fill="none" stroke="#ecdcbc" strokeWidth="3" />
                  <circle cx="670" cy="418" r="4.5" fill="#ecdcbc" />
                </g>
              </g>

              {/* ④ 包豪斯：几何构成 + 构造线 */}
              <g className={`mv mv-bauhaus${idx === 3 ? " on" : ""}`}>
                <rect width="720" height="480" fill="#e7e0d3" />
                <g stroke="#191919" opacity=".12"><path d="M110,0 V480 M360,0 V480 M610,0 V480 M0,120 H720" /></g>
                <g className="fl-rot">
                  <circle cx="150" cy="130" r="62" fill="#c2452d" />
                  <circle cx="150" cy="82" r="10" fill="#e7e0d3" />
                </g>
                <path d="M560,80 L668,248 L452,248 Z" fill="#2b5ea7" opacity=".92" />
                <path d="M60,432 A60,60 0 0 1 180,432 Z" fill="#e8c531" />
                <rect y="444" width="720" height="26" fill="#191919" />
                <path d="M500,90 V436" stroke="#191919" strokeWidth="1.4" strokeDasharray="4 7" opacity=".3" />

                {/* 奶油猫 · 构成 */}
                <path d="M556,420 A64,64 0 0 0 620,352" fill="none" stroke="#191919" strokeWidth="20" />
                <path d="M420,432 V348 A80,80 0 0 1 580,348 V432 Z" fill="#e8c98f" stroke="#191919" strokeWidth="4" />
                <circle cx="500" cy="396" r="34" fill="#f0dcb4" />
                <circle cx="500" cy="212" r="58" fill="#e8c98f" stroke="#191919" strokeWidth="4" />
                <path d="M448,172 L436,100 L492,146 Z" fill="#e8c98f" stroke="#191919" strokeWidth="4" strokeLinejoin="round" />
                <path d="M552,172 L564,100 L508,146 Z" fill="#e8c98f" stroke="#191919" strokeWidth="4" strokeLinejoin="round" />
                <path d="M458,158 L452,118 L482,144 Z" fill="#c2452d" />
                <path d="M542,158 L548,118 L518,144 Z" fill="#c2452d" />
                <circle cx="478" cy="206" r="7.5" fill="#191919" /><circle cx="522" cy="206" r="7.5" fill="#191919" />
                <path d="M492,226 L508,226 L500,236 Z" fill="#191919" />
                <g stroke="#191919" strokeWidth="3" strokeLinecap="round">
                  <path d="M448,216 L410,212" /><path d="M448,224 L410,226" /><path d="M448,232 L414,238" />
                  <path d="M552,216 L590,212" /><path d="M552,224 L590,226" /><path d="M552,232 L586,238" />
                </g>
                <circle cx="500" cy="284" r="5.5" fill="#e7e0d3" stroke="#191919" strokeWidth="2.5" />

                {/* 蓝灰猫 · 构成 */}
                <path d="M192,420 C158,414 144,384 152,354" fill="none" stroke="#191919" strokeWidth="18" />
                <path d="M186,432 V372 C186,326 216,292 296,292 C376,292 406,326 406,372 V432 Z" fill="#5a7391" stroke="#191919" strokeWidth="4" />
                <circle cx="296" cy="380" r="40" fill="#e8c531" opacity=".38" />
                <circle cx="296" cy="240" r="54" fill="#5a7391" stroke="#191919" strokeWidth="4" />
                <path d="M254,202 L244,138 L294,178 Z" fill="#5a7391" stroke="#191919" strokeWidth="4" strokeLinejoin="round" />
                <path d="M338,202 L348,138 L298,178 Z" fill="#5a7391" stroke="#191919" strokeWidth="4" strokeLinejoin="round" />
                <path d="M263,190 L258,156 L284,178 Z" fill="#e8c531" />
                <path d="M329,190 L334,156 L308,178 Z" fill="#e8c531" />
                <circle cx="276" cy="236" r="7" fill="#191919" /><circle cx="316" cy="236" r="7" fill="#191919" />
                <path d="M289,254 L303,254 L296,263 Z" fill="#191919" />
                <g stroke="#191919" strokeWidth="3" strokeLinecap="round">
                  <path d="M250,246 L216,242" /><path d="M250,254 L214,256" /><path d="M250,262 L218,267" />
                  <path d="M342,246 L376,242" /><path d="M342,254 L378,256" /><path d="M342,262 L374,267" />
                </g>
              </g>

              {/* ⑤ 波普：特写半调 + 气泡 */}
              <g className={`mv mv-pop${idx === 4 ? " on" : ""}`}>
                <rect width="720" height="480" fill="#f2cf47" />
                <rect className="fl-slide" x="-32" width="784" height="92" fill="url(#ga-dots)" opacity=".85" />
                <g stroke="#141414" strokeLinecap="round"><path d="M30,300 h92" strokeWidth="7" /><path d="M42,326 h68" strokeWidth="5" /><path d="M52,352 h46" strokeWidth="4" /></g>

                <circle cx="300" cy="268" r="158" fill="#fff" stroke="#141414" strokeWidth="6" />
                <g clipPath="url(#ga-clipBig)">
                  <g transform="translate(300 262) scale(.78) translate(-300 -240)">
                    <path d="M128,470 C142,330 206,296 300,294 C394,296 458,330 472,470 Z" fill="#f6d8a0" stroke="#141414" strokeWidth="6" />
                    <circle cx="252" cy="330" r="30" fill="url(#ga-blush)" opacity=".7" />
                    <circle cx="348" cy="330" r="30" fill="url(#ga-blush)" opacity=".7" />
                    <circle cx="300" cy="206" r="88" fill="#f6d8a0" stroke="#141414" strokeWidth="6" />
                    <path d="M242,148 C228,96 234,70 248,68 C264,76 284,108 294,130 Z" fill="#f6d8a0" stroke="#141414" strokeWidth="6" strokeLinejoin="round" />
                    <path d="M358,148 C372,96 366,70 352,68 C336,76 316,108 306,130 Z" fill="#f6d8a0" stroke="#141414" strokeWidth="6" strokeLinejoin="round" />
                    <path d="M254,120 C248,88 252,76 260,76 C268,82 278,100 284,116 Z" fill="#e8442e" />
                    <path d="M346,120 C352,88 348,76 340,76 C332,82 322,100 316,116 Z" fill="#e8442e" />
                    <g fill="none" stroke="#d89a4e" strokeWidth="8" strokeLinecap="round">
                      <path d="M282,138 q-3,13 2,22" /><path d="M300,132 q0,13 0,22" /><path d="M318,138 q3,13 -2,22" />
                    </g>
                    <ellipse cx="264" cy="200" rx="15" ry="18" fill="#141414" />
                    <ellipse cx="336" cy="200" rx="15" ry="18" fill="#141414" />
                    <circle cx="269" cy="193" r="5" fill="#fff" /><circle cx="341" cy="193" r="5" fill="#fff" />
                    <circle cx="261" cy="207" r="2.2" fill="#fff" opacity=".8" /><circle cx="333" cy="207" r="2.2" fill="#fff" opacity=".8" />
                    <path d="M290,240 L310,240 L300,252 Z" fill="#141414" />
                    <path d="M300,252 V262 M300,262 Q291,271 279,266 M300,262 Q309,271 321,266" fill="none" stroke="#141414" strokeWidth="4.5" strokeLinecap="round" />
                    <g stroke="#141414" strokeWidth="4.5" strokeLinecap="round">
                      <path d="M222,226 C196,220 172,220 152,226" /><path d="M223,238 C199,238 177,241 158,248" />
                      <path d="M378,226 C404,220 428,220 448,226" /><path d="M377,238 C401,238 423,241 442,248" />
                    </g>
                  </g>
                </g>
                <circle cx="300" cy="268" r="158" fill="none" stroke="#141414" strokeWidth="6" />

                <circle cx="560" cy="298" r="92" fill="#9db3c8" stroke="#141414" strokeWidth="6" />
                <g clipPath="url(#ga-clipSmall)">
                  <g transform="translate(560 298) scale(.8) translate(-560 -298)">
                    <circle cx="560" cy="304" r="76" fill="#9db3c8" stroke="#141414" strokeWidth="6" />
                    <path d="M512,254 C502,212 507,192 518,190 C530,196 543,216 550,232 Z" fill="#9db3c8" stroke="#141414" strokeWidth="6" strokeLinejoin="round" />
                    <path d="M608,254 C618,212 613,192 602,190 C590,196 577,216 570,232 Z" fill="#9db3c8" stroke="#141414" strokeWidth="6" strokeLinejoin="round" />
                    <path d="M520,226 C516,202 519,192 526,193 C533,198 541,212 546,224 Z" fill="#e8442e" />
                    <path d="M600,226 C604,202 601,192 594,193 C587,198 579,212 574,224 Z" fill="#e8442e" />
                    <ellipse cx="536" cy="296" rx="11" ry="13" fill="#141414" />
                    <ellipse cx="584" cy="296" rx="11" ry="13" fill="#141414" />
                    <circle cx="540" cy="291" r="3.6" fill="#fff" /><circle cx="588" cy="291" r="3.6" fill="#fff" />
                    <ellipse cx="560" cy="326" rx="9" ry="7" fill="#e08a76" />
                    <path d="M554,332 L566,332 L560,340 Z" fill="#141414" />
                    <g stroke="#141414" strokeWidth="3.5" strokeLinecap="round">
                      <path d="M508,318 L478,314" /><path d="M509,328 L482,333" />
                      <path d="M612,318 L642,314" /><path d="M611,328 L638,333" />
                    </g>
                  </g>
                  <rect x="468" y="222" width="184" height="176" fill="url(#ga-dots)" opacity=".28" />
                </g>
                <circle cx="560" cy="298" r="92" fill="none" stroke="#141414" strokeWidth="6" />

                <g>
                  <path d="M540,150 L514,192 L568,158 Z" fill="#fff" stroke="#141414" strokeWidth="5" strokeLinejoin="round" />
                  <ellipse cx="588" cy="118" rx="80" ry="46" fill="#fff" stroke="#141414" strokeWidth="5" />
                  <text x="588" y="136" textAnchor="middle" className="pop-word">PURR!</text>
                </g>
              </g>

              {/* ⑥ 抽象：解构 + 一根线 */}
              <g className={`mv mv-abst${idx === 5 ? " on" : ""}`}>
                <rect width="720" height="480" fill="#23222b" />
                <path d="M60,60 A180,180 0 0 1 240,240" fill="none" stroke="#c78d5e" strokeWidth="3" />
                <circle cx="600" cy="140" r="54" fill="#5e7d8c" opacity=".85" />
                <circle cx="642" cy="182" r="30" fill="#8c6a9e" opacity=".8" />
                <path d="M80,420 L360,180" stroke="#5e7d8c" strokeWidth="1.6" />
                <g stroke="#8c6a9e" strokeWidth="1.4" opacity=".6"><path d="M140,320 h84 M140,336 h84 M140,352 h60" /></g>
                <path d="M300,132 a26,26 0 0 1 52,0 Z" fill="#c2452d" opacity=".85" />

                {/* 一根线勾出背线 */}
                <path d="M414,420 C396,340 428,300 468,290 C500,282 520,256 522,230" fill="none" stroke="#e8c531" strokeWidth="2.6" strokeLinecap="round" />
                <circle cx="492" cy="214" r="40" fill="#c78d5e" opacity=".92" />
                <path d="M458,178 L446,140 L480,164 Z" fill="#c78d5e" />
                <path d="M520,170 L534,134 L542,172 Z" fill="#8c6a9e" />
                <circle cx="478" cy="208" r="7" fill="#e8c531" />
                <path d="M508,204 L522,212 L508,220 Z" fill="#e8c531" />
                <circle cx="492" cy="228" r="4" fill="#c2452d" />
                <g fill="none" stroke="#8c6a9e" strokeWidth="2" strokeLinecap="round">
                  <path d="M446,222 q-24,-6 -40,4" /><path d="M446,232 q-26,2 -40,14" /><path d="M448,242 q-22,8 -32,20" />
                </g>
                <g fill="none" stroke="#5e7d8c" strokeWidth="2">
                  <path d="M420,348 q80,28 152,0" /><path d="M428,366 q72,24 136,0" opacity=".6" />
                </g>
                <g transform="rotate(12 582 352)">
                  <rect x="560" y="330" width="44" height="44" fill="none" stroke="#e8c531" strokeWidth="2.2" />
                </g>
                <g fill="#e9e4da" opacity=".8"><circle cx="356" cy="120" r="2.5" /><circle cx="380" cy="104" r="2" /><circle cx="338" cy="98" r="1.8" /></g>
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
                <button key={m.id} className={i === idx ? "on" : ""}
                  onClick={() => { setIdx(i); setBeat((b) => b + 1); }}
                  aria-label={m.zh} title={m.zh} />
              ))}
            </div>
          </aside>
        </Reveal>
      </div>
    </div>
  );
}
