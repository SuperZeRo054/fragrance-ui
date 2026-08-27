import React from "react";
import "./motion.css";

/* ---------------- PageTransition：SPA 切页动画（key 变化即重放入场） ---------------- */
export type PageVariant = "rise" | "fade" | "slideL" | "slideR" | "wipe";
export function PageTransition({ pageKey, variant = "rise", children }: {
  pageKey: string | number; variant?: PageVariant; children: React.ReactNode;
}) {
  return (
    <div key={pageKey} className={`mui-pt mui-pt--${variant}`} data-page-key={pageKey}>
      {children}
    </div>
  );
}

/* ---------------- viewNavigate：MPA/锚点全站跳转（View Transitions API） ----------------
   支持 startViewTransition 的浏览器得到合成器级交叉过渡；其余优雅降级为直接跳转。
   同文档（hash 锚点）走原地滚动 + 过渡；跨文档等待 load 后交还新画面。 */
export function viewNavigate(url: string) {
  const doc = document as Document & { startViewTransition?: (cb: () => void | Promise<void>) => unknown };
  const target = new URL(url, location.href);
  const sameDoc = target.origin === location.origin &&
    target.pathname + target.search === location.pathname + location.search;
  if (!doc.startViewTransition) { location.href = url; return; }
  doc.startViewTransition(() => {
    if (sameDoc) {
      if (target.hash) location.hash = target.hash;
      else window.scrollTo({ top: 0 });
      return new Promise<void>((res) => setTimeout(res, 60));
    }
    location.assign(url);
    return new Promise<void>((res) => addEventListener("load", () => res(), { once: true }));
  });
}
