import React from "react";

/** 金样本页公共顶栏 / 页脚（样式来自 home.css）。 */
export function GhomeBar({ active }: { active?: "work" | "writing" | "gallery" | "about" }) {
  const items: [string, string, string, string | undefined][] = [
    ["Work", "作品", "#golden/project", "work"],
    ["Writing", "文章", "#golden/article", "writing"],
    ["Gallery", "画廊", "#golden/gallery", "gallery"],
    ["About", "关于", "#golden/home", "about"],
  ];
  return (
    <header className="ghome__bar">
      <a className="ghome__brand" href="#golden/home">
        Fragrance UI
        <span className="ghome__brand-sub">FOR A QUIETER WEB<br />为更宁静的网络而设计</span>
      </a>
      <nav className="ghome__nav">
        {items.map(([en, zh, href, key]) => (
          <a key={en} href={href} className={active === key ? "act" : ""}>
            <i>{en}</i><span>{zh}</span>
          </a>
        ))}
      </nav>
      <div className="ghome__bar-r">
        <a className="ghome__lab" href="#lab">Lab<span>实验室</span></a>
        <a className="ghome__cta" href="#lab">Let&apos;s Create<span>开始创作</span></a>
      </div>
    </header>
  );
}

export function GhomeFoot() {
  return (
    <footer className="ghome__foot">
      <span>Fragrance UI <i>v0.2</i> · A Personal Design System 一个人设计系统</span>
      <nav>{[["Work", "作品"], ["Writing", "文章"], ["Gallery", "画廊"], ["About", "关于"]].map(([en, zh]) => (
        <a key={en} href="#golden/home">{en} {zh}</a>
      ))}</nav>
    </footer>
  );
}
