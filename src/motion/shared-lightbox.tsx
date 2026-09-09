import React, { useCallback, useEffect, useRef, useState } from "react";
import "./shared-lightbox.css";

/** CONTROLLED · M01/M05 Shared Element Transition（DESIGN.md §6.3 / Motion 分镜）。
 *  Design Intent：Continuity——打开的是同一个作品，而不是跳到另一个网页。
 *  分镜：Lift（原位抬升）→ Shared Transform（等比扩张到 Hero 位）→
 *        Context Establish（字幕后置建立）→ Settle（静止，无残留运动）。
 *  关闭为同一轨迹反放。reduced-motion：直接呈现终态，不播放共享动画。 */
export function SharedLightbox({ open, onClose, src, alt = "", caption, origin }: {
  open: boolean; onClose: () => void; src: string; alt?: string;
  caption?: string; origin: DOMRect | null;
}) {
  const [phase, setPhase] = useState<"enter" | "open" | "exit">("enter");
  const [settled, setSettled] = useState(false);
  const cloneRef = useRef<HTMLImageElement>(null);
  const reduced = useRef(typeof matchMedia !== "undefined" &&
    matchMedia("(prefers-reduced-motion: reduce)").matches);

  const target = useCallback(() => {
    const vw = window.innerWidth, vh = window.innerHeight;
    const o = origin ?? new DOMRect(vw / 2 - 60, vh / 2 - 45, 120, 90);
    const ar = o.width / o.height;
    let tw = Math.min(vw * .86, 760), th = tw / ar;
    if (th > vh * .72) { th = vh * .72; tw = th * ar; }
    return { x: (vw - tw) / 2, y: (vh - th) / 2 - 14, w: tw, h: th };
  }, [origin]);

  const requestClose = useCallback(() => {
    if (phase === "exit") return;
    setSettled(false);
    setPhase("exit");
    window.setTimeout(onClose, reduced.current ? 120 : 470);
  }, [phase, onClose]);

  // 入场：双 rAF 确保初始位已提交，再过渡到目标位
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  useEffect(() => {
    if (!open) return;
    if (reduced.current) { setPhase("open"); setSettled(true); return; }
    setSettled(false);
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setPhase("open")));
    return () => cancelAnimationFrame(raf);
  }, [open]);
  // 图像到位（transitionend 或 560ms 兜底）后，字幕与关闭钮才建立
  useEffect(() => {
    if (phase !== "open") return;
    if (settled) return;
    const t = window.setTimeout(() => setSettled(true), 560);
    return () => window.clearTimeout(t);
  }, [phase, settled]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && requestClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, requestClose]);

  if (!open) return null;
  const t = target();
  const exiting = phase === "exit";
  const o = origin ?? new DOMRect(t.x, t.y, t.w, t.h);
  const dx = t.x - o.x, dy = t.y - o.y, sc = t.w / o.width;
  const cloneStyle: React.CSSProperties = exiting
    ? { left: o.x, top: o.y, width: o.width, height: o.height, transform: "none",
        transition: "all .46s cubic-bezier(.32,.72,0,1)", borderRadius: 10 }
    : settled
      ? { left: t.x, top: t.y, width: t.w, height: t.h, transform: "none", borderRadius: 12 }
      : { left: o.x, top: o.y, width: o.width, height: o.height,
          transform: `translate(${dx}px, ${dy}px) scale(${sc})`,
          transformOrigin: "top left",
          transition: reduced.current ? "none" : "transform .48s cubic-bezier(.32,.72,0,1), border-radius .48s",
          borderRadius: settled ? 12 : 10 };

  return (
    <div className="fui-shared" data-phase={phase}>
      <div className="fui-shared__scrim" onClick={requestClose} />
      <img ref={cloneRef} className="fui-shared__img" src={src} alt={alt}
        style={cloneStyle} onClick={requestClose}
        onTransitionEnd={(e) => { if (e.propertyName === "transform") setSettled(true); }} />
      {settled && caption && (
        <p className="fui-shared__cap" style={{ top: t.y + t.h + 18 }} onClick={requestClose}>
          {caption}
        </p>
      )}
      {settled && (
        <button className="fui-shared__close" onClick={requestClose} aria-label="关闭">
          <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden>
            <path d="M3 3l10 10M13 3L3 13" fill="none" stroke="currentColor"
              strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
}
