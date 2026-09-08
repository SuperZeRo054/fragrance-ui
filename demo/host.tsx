import React, { useEffect, useRef } from "react";

export type HostId = "wanwan" | "qianqian";

const META: Record<HostId, { name: string; cls: string; role: string }> = {
  wanwan: { name: "万万", cls: "wan", role: "蓝金渐层 · 动效与新兴模块" },
  qianqian: { name: "千千", cls: "qian", role: "重点色 · 基础组件与图标" },
};

/** 区块策展人：纯 CSS 动画猫。滚动进度擦洗「走进场」（view() 时间线），
 *  到场后呼吸 / 尾巴 / 眨眼常驻；不支持 view() 的浏览器由 IO 触发一次完整入场。 */
export function SectionHost({ host, line }: { host: HostId; line: string }) {
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
        <div className={`anicat ${meta.cls}`} aria-hidden>
          <i className="anicat__tail" />
          <i className="anicat__ear l" /><i className="anicat__ear r" />
          <i className="anicat__body" />
          <i className="anicat__chest" />
          <i className="anicat__head">
            <i className="anicat__eye l" /><i className="anicat__eye r" />
            <i className="anicat__nose" />
          </i>
          <i className="anicat__paw l" /><i className="anicat__paw r" />
        </div>
      </div>
      <div className="host-bubble">
        <b>{meta.name}</b><i>{meta.role}</i>
        <p>{line}</p>
      </div>
    </div>
  );
}
