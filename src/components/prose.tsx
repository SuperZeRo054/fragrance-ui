import React from "react";
import "./prose.css";

/** CORE · Prose —— 长文排版容器（DESIGN.md §6.1 Content）。
 *
 *  只做一件事：把富文本（标题/段落/引用/代码/列表/图注）排成可读的长文，
 *  全部消费语义令牌，因此皮肤、昼夜、字体包、语言切换都自动跟随。
 *
 *  双语：中文正文按 §4.2 走独立节奏（更大行高、不做超宽字距）；
 *  英文对照行用 <span className="fui-prose__en">，自动降为次级文本。
 *
 *  用法：
 *    <Prose>
 *      <h2>标题 <span className="fui-prose__en">Heading</span></h2>
 *      <p>正文…</p>
 *    </Prose>
 */
export function Prose({ children, size = "base", className = "" }: {
  children: React.ReactNode; size?: "base" | "lg"; className?: string;
}) {
  return <div className={`fui-prose fui-prose--${size} ${className}`}>{children}</div>;
}
