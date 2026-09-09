import React, { useEffect, useRef, useState } from "react";
import { createActor } from "xstate";
import { catMachine, type CatState, type CatTemperament } from "./cat-machine";
import "./cat-character.css";
import { CAT_PALETTE } from "./cats";

/** 描边猫角色：视觉与类名保持稳定，状态由 XState actor 驱动。 */
export function CatCharacter({ tone = "wan", temperament = "bold", width = 150, showState = false }: {
  tone?: "wan" | "qian"; temperament?: CatTemperament; width?: number; showState?: boolean;
}) {
  const c = CAT_PALETTE[tone === "wan" ? "wan" : "qian"];
  const rootRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const headRef = useRef<SVGGElement>(null);
  const pupilRef = useRef<SVGGElement>(null);
  const [state, setState] = useState<CatState>("idle");

  useEffect(() => {
    const root = rootRef.current, svg = svgRef.current;
    if (!root || !svg) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    // —— XState actor：状态的唯一真相 ——
    const actor = createActor(catMachine, { input: { temperament } });
    const sub = actor.subscribe((snap) => {
      const v = String(snap.value) as CatState;
      root.dataset.state = v;
      setState(v);
    });
    actor.start();
    root.dataset.state = "idle";

    // —— 指针 → 距离（节流 ~12/s，避免事件风暴）——
    const last = { x: 0, y: 0, t: 0 };
    let raf = 0;
    const gaze = (cx: number, cy: number, r: DOMRect) => {
      if (reduced) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const head = headRef.current, pupil = pupilRef.current;
        if (!head || !pupil) return;
        const dx = Math.max(-1, Math.min(1, (last.x - cx) / (r.width * .9)));
        const dy = Math.max(-1, Math.min(1, (last.y - cy) / (r.height * .9)));
        const curious = root.dataset.state === "curious";
        pupil.style.transform = `translate(${(dx * 3.4).toFixed(2)}px, ${(dy * 2.4).toFixed(2)}px)`;
        head.style.transform = `rotate(${(dx * (curious ? 9 : 4)).toFixed(2)}deg)`;
      });
    };
    const onMove = (e: PointerEvent) => {
      last.x = e.clientX; last.y = e.clientY;
      const now = performance.now();
      if (now - last.t < 80) return;
      last.t = now;
      const r = svg.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height * 0.36;
      actor.send({ type: "POINTER", dist: Math.hypot(e.clientX - cx, e.clientY - cy) });
      gaze(cx, cy, r);
    };

    const onLeave = () => actor.send({ type: "LEAVE" });
    const onClick = () => actor.send({ type: "INTERACT" });

    window.addEventListener("pointermove", onMove, { passive: true });
    svg.addEventListener("click", onClick);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      sub.unsubscribe();
      actor.stop();
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
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
      {showState && <i className="ccat-badge">{state}</i>}
    </div>
  );
}
