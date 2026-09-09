import React, { useRef } from "react";
import "./hscroll.css";

/** 横拉框：拖拽横滚 + scroll-snap + 边缘羽化。
 *  触屏走原生滚动，桌面按住拖拽；拖拽超过 4px 会吞掉落点的 click，避免误开灯箱。 */
export function HScroll({ children, className = "", style }: {
  children: React.ReactNode; className?: string; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const st = useRef({ down: false, x: 0, left: 0, moved: false });

  const down = (e: React.PointerEvent) => {
    const el = ref.current!;
    st.current = { down: true, x: e.clientX, left: el.scrollLeft, moved: false };
    el.setPointerCapture(e.pointerId);
    el.classList.add("dragging");
  };
  const move = (e: React.PointerEvent) => {
    if (!st.current.down) return;
    const el = ref.current!;
    const dx = e.clientX - st.current.x;
    if (Math.abs(dx) > 4) st.current.moved = true;
    el.scrollLeft = st.current.left - dx;
  };
  const up = (e: React.PointerEvent) => {
    if (!st.current.down) return;
    st.current.down = false;
    ref.current?.classList.remove("dragging");
    try { ref.current?.releasePointerCapture(e.pointerId); } catch { /* noop */ }
  };
  const clickCapture = (e: React.MouseEvent) => {
    if (st.current.moved) {
      e.stopPropagation();
      e.preventDefault();
      st.current.moved = false;
    }
  };

  return (
    <div ref={ref} className={`fui-hscroll ${className}`} style={style}
      onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}
      onDragStart={(e) => e.preventDefault()}
      onClickCapture={clickCapture}>
      {children}
    </div>
  );
}
