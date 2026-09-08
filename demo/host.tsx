import React, { useEffect, useRef } from "react";
import { CatMark } from "../src";

export type HostId = "wanwan" | "qianqian";

const META: Record<HostId, { name: string; tone: "cream" | "blue"; role: string }> = {
  wanwan: { name: "万万", tone: "cream", role: "蓝金渐层 · 动效与新兴模块" },
  qianqian: { name: "千千", tone: "blue", role: "重点色 · 基础组件与图标" },
};

/** 区块策展人引导条：滚进视口即播放。
 *  优先 CSS scroll-driven（animation-timeline: view()），不支持的浏览器走 IO 加 .play。 */
export function SectionHost({ host, line }: { host: HostId; line: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (CSS.supports?.("animation-timeline: view()")) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("play"); io.disconnect(); }
    }, { threshold: .35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const meta = META[host];
  return (
    <div className={`host-strip host-${host}`} ref={ref}>
      <span className="host-ava" aria-hidden><CatMark tone={meta.tone} size={30} /></span>
      <span className="host-meta">
        <i className="host-name">{meta.name}</i>
        <i className="host-role">{meta.role}</i>
      </span>
      <span className="host-line">{line}</span>
    </div>
  );
}
