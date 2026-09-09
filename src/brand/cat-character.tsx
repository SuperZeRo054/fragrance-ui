import React, { useEffect, useRef, useState } from "react";
import { CAT_PALETTE } from "./cats";
import "./cat-character.css";

export type CatTemperament = "bold" | "shy";
type State = "idle" | "notice" | "watch" | "curious" | "interact" | "return";

const TEMPO: Record<CatTemperament, { notice: number; watch: number; lean: number }> = {
  bold: { notice: 380, watch: 190, lean: 1 },   // 万万：人来疯，凑近
  shy: { notice: 300, watch: 150, lean: -1 },   // 千千：慢热，微微后仰
};
const STATE_LABEL: Record<State, string> = {
  idle: "idle", notice: "notice", watch: "watch", curious: "curious",
  interact: "interact", return: "return",
};

/** BRAND · M02 Character State Machine（DESIGN.md §16）。
 *  状态由指针邻近度驱动：idle → notice（竖耳）→ watch（目光跟随）→
 *  curious（歪头）→ interact（点击，眯眼）→ return → idle。
 *  两只猫 temperament 不同：bold 凑近、shy 后仰，避免同频同动作。 */
export function CatCharacter({ tone = "wan", temperament = "bold", width = 150, showState = false }: {
  tone?: "wan" | "qian"; temperament?: CatTemperament; width?: number; showState?: boolean;
}) {
  const c = CAT_PALETTE[tone === "wan" ? "wan" : "qian"];
  const rootRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const headRef = useRef<SVGGElement>(null);
  const pupilRef = useRef<SVGGElement>(null);
  const [state, setState] = useState<State>("idle");
  const st = useRef({ state: "idle" as State, px: 0, py: 0, watchSince: 0,
    interactUntil: 0, absentSince: 0, raf: 0 });

  useEffect(() => {
    const root = rootRef.current, svg = svgRef.current;
    if (!root || !svg) return;
    const T = TEMPO[temperament];
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lastRaf = 0;

    const apply = () => {
      const head = headRef.current, pupil = pupilRef.current;
      if (!head || !pupil) return;
      const r = svg.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height * 0.36;
      const st0 = st.current;
      if (st0.state === "watch" || st0.state === "curious") {
        const dx = Math.max(-1, Math.min(1, (st0.px - cx) / (r.width * .9)));
        const dy = Math.max(-1, Math.min(1, (st0.py - cy) / (r.height * .9)));
        if (!reduced) {
          pupil.style.transform = `translate(${(dx * 3.4).toFixed(2)}px, ${(dy * 2.4).toFixed(2)}px)`;
          head.style.transform = `rotate(${(dx * (st0.state === "curious" ? 9 : 4)).toFixed(2)}deg)`;
        }
      } else {
        if (!reduced) { pupil.style.transform = ""; head.style.transform = ""; }
      }
    };

    const onMove = (e: PointerEvent) => {
      st.current.px = e.clientX; st.current.py = e.clientY;
      const now = performance.now();
      if (now - lastRaf < 60) return;
      lastRaf = now;
      requestAnimationFrame(() => {
        const svg0 = svgRef.current; if (!svg0) return;
        const r = svg0.getBoundingClientRect();
        const cx = r.left + r.width / 2, cy = r.top + r.height * .36;
        const d = Math.hypot(st.current.px - cx, st.current.py - cy);
        const now2 = performance.now();
        let next: State = st.current.state;
        const inWatch = d <= T.watch, inNotice = d <= T.notice;
        const interacting = now2 < st.current.interactUntil;
        if (interacting) next = "interact";
        else if (inWatch) {
          if (st.current.state === "curious") next = "curious";
          else if (st.current.watchSince && now2 - st.current.watchSince > 1600) next = "curious";
          else next = "watch";
          if (st.current.state !== "watch") st.current.watchSince = now2;
        } else if (inNotice) {
          next = "notice"; st.current.watchSince = 0;
        } else if (st.current.state === "watch" || st.current.state === "curious") {
          next = "return";
          if (!st.current.absentSince) st.current.absentSince = now2;
          if (now2 - st.current.absentSince > 900) next = "idle";
        } else next = "idle";
        if (next !== st.current.state) {
          if (next === "watch") st.current.watchSince = now2;
          if (next === "idle" || next === "notice") { st.current.watchSince = 0; st.current.absentSince = 0; }
          st.current.state = next;
          root.dataset.state = next;
          setState(next);
        }
        apply();
      });
    };
    const onLeave = () => {
      st.current.absentSince = performance.now();
      window.setTimeout(() => {
        if (st.current.state !== "interact") { st.current.state = "idle"; root.dataset.state = "idle"; setState("idle"); }
      }, 900);
    };
    const onClick = () => { st.current.interactUntil = performance.now() + 1700; };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    svg.addEventListener("click", onClick);
    document.documentElement.addEventListener("mouseleave", onLeave);
    // 时间推进不依赖指针移动：curious 计时 / interact 到期 / 离开回落，靠自评循环
    const tick = window.setInterval(() => onMove({ clientX: st.current.px, clientY: st.current.py } as PointerEvent), 250);
    return () => {
      window.clearInterval(tick);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      svg.removeEventListener("click", onClick);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [temperament]);

  return (
    <div className={`ccat ${temperament}`} data-tone={tone} data-state={state} ref={rootRef}>
      <svg ref={svgRef} viewBox="0 0 140 122" width={width} aria-hidden>
        <g className="ccat-tail">
          <path d="M103,100 C116,99 123,89 119,79 C117,73 108,74 110,83"
            fill="none" stroke={c.ink} strokeWidth="9" strokeLinecap="round" />
        </g>
        <path className="ccat-ear-l" d="M48,6 L61,17 L47,25 Z" fill={c.fur} stroke={c.ink} strokeWidth="2.5" strokeLinejoin="round" />
        <path className="ccat-ear-r" d="M92,6 L79,17 L93,25 Z" fill={c.fur} stroke={c.ink} strokeWidth="2.5" strokeLinejoin="round" />
        <g className="ccat-lean">
          <path d="M38,106 C38,76 48,60 70,58 C92,60 102,76 102,106 Z" fill={c.fur} stroke={c.ink} strokeWidth="2.5" strokeLinejoin="round" />
          <ellipse cx="70" cy="94" rx="19" ry="13" fill={c.chest} />
          <g className="ccat-head" ref={headRef}>
            <circle cx="70" cy="40" r="30" fill={c.fur} stroke={c.ink} strokeWidth="2.5" />
            {tone === "wan" && (
              <g stroke="#c1935a" strokeWidth="3" strokeLinecap="round" opacity=".55">
                <path d="M64,19 v6" /><path d="M70,17 v7" /><path d="M76,19 v6" />
              </g>
            )}
            <g className="ccat-eye">
              <circle cx="58" cy="41" r="5" fill={c.iris} /><circle cx="82" cy="41" r="5" fill={c.iris} />
              <g ref={pupilRef}>
                <circle cx="59.5" cy="41" r="2.2" fill="#171310" /><circle cx="83.5" cy="41" r="2.2" fill="#171310" />
              </g>
              <circle cx="56.5" cy="38.6" r="1.3" fill="#fff" /><circle cx="80.5" cy="38.6" r="1.3" fill="#fff" />
            </g>
            <path d="M66,50 L74,50 L70,55 Z" fill={c.nose} />
            <path d="M70,55 V58 M70,58 Q67,61 63,59 M70,58 Q73,61 77,59"
              fill="none" stroke={c.ink} strokeWidth="1.8" strokeLinecap="round" />
          </g>
          <path className="ccat-paw l" d="M48,106 h20 a5,5 0 0 1 5,5 v1 h-30 a5,5 0 0 1 5,-6 Z" fill={c.chest} />
        </g>
      </svg>
      {showState && <i className="ccat-badge">{STATE_LABEL[state]}</i>}
    </div>
  );
}
