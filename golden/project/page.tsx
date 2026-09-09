import React from "react";
import "../home/home.css";
import "./project.css";
import { Leaf, PawPrint, Heart } from "../../src";
import windowsill from "../../demo/gallery/frg-windowsill.jpg";
import wave from "../../demo/gallery/frg-greatwave.jpg";
import starry from "../../demo/gallery/frg-starrynight.jpg";
import waterlilies from "../../demo/gallery/frg-waterlilies.jpg";
import athens from "../../demo/gallery/frg-athens.jpg";
import catCream from "../../audit/harness-v0.1/references/cat-cream-reference.jpg";

/* G02 · Golden Project Detail —— v0.2 冻结方向的生产实现。
   Visual Budget：Primary = Hero 摄影主视觉 + 编辑志标题；Secondary = 三原则栏 + 图库条；
   Continuous = 0；Atmosphere = 0；Mascot = Overview 配图（真实猫照，静态）。 */

const PRINCIPLES = [
  {
    Icon: Leaf,
    en: "Calm First", zh: "以平静为先",
    enD: "Reduce visual noise. Prioritize clarity, breathing room, and focus.",
    zhD: "减少视觉噪音。优先清晰、留白和专注。",
  },
  {
    Icon: PawPrint,
    en: "Cats as Perspective", zh: "以猫的视角",
    enD: "Cats remind us to slow down, notice small moments, and design with care.",
    zhD: "猫提醒我们放慢脚步，留意微小的瞬间，并以关怀的态度进行设计。",
  },
  {
    Icon: Heart,
    en: "More Human", zh: "更有人情味",
    enD: "Technology should feel warmer, more intuitive, and more compassionate.",
    zhD: "技术应该更温暖、更直观、更富有同理心。",
  },
];

const MOTION_SPECS = [
  ["Gentle Transitions", "柔和的过渡", "200~400ms"],
  ["Natural Easing", "自然缓动", "Emphasize calm flow 强调平静流畅的节奏"],
  ["Subtle Feedback", "细腻的反馈", "Understated and clear 克制而清晰"],
  ["Image Treatment", "图像处理", "Film-like, warm, and real 电影感、温暖、真实"],
];

const INFO: [string, string, string][] = [
  ["TYPE 类型", "Personal Project", "个人项目"],
  ["YEAR 年份", "2024", ""],
  ["ROLE 角色", "Design · Front-end · Art Direction", "设计 · 前端开发 · 艺术指导"],
  ["TOOLS 工具", "Figma · VS Code · Photography", "Figma · VS Code · 摄影"],
  ["TAGS 标签", "Cats · Design System · UI/UX · Web Design", "猫 · 设计系统 · 用户体验 · 网页设计"],
];

export function GoldenProject() {
  return (
    <div className="ghome gproject">
      <header className="ghome__bar">
        <a className="ghome__brand" href="#golden/home">
          Fragrance UI
          <span className="ghome__brand-sub">FOR A QUIETER WEB<br />为更宁静的网络而设计</span>
        </a>
        <nav className="ghome__nav">
          {[["Work", "作品", true], ["Writing", "文章", false], ["Gallery", "画廊", false], ["About", "关于", false]].map(([en, zh, act]) => (
            <a key={en as string} href="#golden/project" className={act ? "act" : ""}>
              <i>{en}</i><span>{zh}</span>
            </a>
          ))}
        </nav>
        <div className="ghome__bar-r">
          <a className="ghome__back" href="#top" title="Playground">⌂</a>
          <a className="ghome__cta" href="#top">Let&apos;s Create<span>开始创作</span></a>
        </div>
      </header>

      <section className="ghome__hero pd-hero">
        <img className="ghome__hero-img" src={catCream} alt="万万 · 蓝金渐层" />
        <div className="ghome__hero-shade" />
        <div className="ghome__hero-copy">
          <p className="ghome__kicker">
            <span>PROJECT DETAIL</span>
            <span>项目详情</span>
          </p>
          <h1 className="ghome__display">
            A More<br />Human Internet
            <span className="ghome__display-zh">一个更有人情味的互联网</span>
          </h1>
          <p className="ghome__lead-en">
            A personal design system exploring how technology, aesthetics, and cats
            can create calmer, more meaningful digital experiences.
          </p>
          <p className="ghome__lead-zh">
            一个人设计系统，探索如何通过技术、美学与猫，创建更平静、更有意义的数字体验。
          </p>
          <div className="ghome__actions">
            <a className="ghome__btn pri" href="#top">View Live Project<span>查看项目</span></a>
            <a className="ghome__btn" href="#gallery">View in Gallery<span>查看画廊</span></a>
          </div>
          <p className="ghome__edge-l pd-edge">LESS INTERFACE, MORE MEANING.<span>更少的界面，更多的意义。</span></p>
        </div>
        <aside className="ghome__edge-r">
          <p className="ghome__hand">Good ideas<br />take time.</p>
          <p className="ghome__hand-zh">好的想法<br />需要时间。</p>
          <p className="ghome__hand-meta pd-meta">/ SAME CATS<br />BRIGHTER TOMORROWS<br />同样的猫，更明亮的明天。</p>
        </aside>
      </section>

      <section className="pd-row">
        <div className="pd-cell">
          <p className="ghome__cell-no pd-no"><b>01</b> / Overview <span>项目概述</span></p>
          <img className="pd-overview-img" src={windowsill} alt="窗台上的两只猫" />
        </div>
        <div className="pd-cell pd-overview-copy">
          <p className="pd-kicker">A CALMER DIGITAL LIFE<span>更平静的数字生活</span></p>
          <p className="pd-en">Fragrance UI is a personal design system that uses cats
            as a creative lens to explore a calmer, kinder internet.</p>
          <p className="pd-zh">Fragrance UI 是一个个人设计系统，把猫当作创造的透镜，探索如何
            打造一个更平静、更友善的互联网。</p>
          <div className="ghome__chips">
            {["Design System 设计系统", "Cats 猫", "Product Design 产品设计",
              "Visual Identity 视觉识别", "Front-end 前端开发"].map((t) => <i key={t}>{t}</i>)}
          </div>
        </div>
      </section>

      <section className="pd-row">
        <div className="pd-cell">
          <p className="ghome__cell-no pd-no"><b>02</b> / Principles <span>设计原则</span>
            <a className="pd-side" href="#golden/project">KINDER BY DESIGN 以善意设计</a></p>
          <div className="pd-principles">
            {PRINCIPLES.map(({ Icon, en, zh, enD, zhD }) => (
              <div className="pd-pr" key={en}>
                <Icon className="pd-pr-icon" />
                <div><b>{en} <span>{zh}</span></b>
                  <p>{enD}<span>{zhD}</span></p></div>
              </div>
            ))}
          </div>
        </div>
        <div className="pd-cell">
          <p className="ghome__cell-no pd-no"><b>03</b> / Motion System <span>动效系统</span>
            <a className="pd-side" href="#golden/project">SMALL DETAILS, A SOFTER WEB 小细节，柔和的网络体验</a></p>
          <div className="pd-motion">
            <img src={waterlilies} alt="睡莲中的猫" />
            <span className="pd-play" aria-hidden><svg viewBox="0 0 24 24" width="18" height="18"><path d="M8 5l11 7-11 7z" fill="currentColor" /></svg></span>
          </div>
          <dl className="pd-specs">
            {MOTION_SPECS.map(([en, zh, v]) => (
              <div className="pd-spec" key={en}>
                <dt>{en} <span>{zh}</span></dt><dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="pd-row pd-gallery">
        <div className="pd-cell">
          <p className="ghome__cell-no pd-no"><b>04</b> / Gallery <span>图库</span>
            <a className="pd-side" href="#gallery">View All Images 查看全部图片 →</a></p>
          <div className="pd-strip">
            {[starry, catCream, wave, waterlilies, athens].map((src, i) => (
              <img key={i} src={src} alt={`gallery ${i + 1}`} loading="lazy" />
            ))}
          </div>
        </div>
      </section>

      <section className="pd-row pd-last">
        <div className="pd-cell pd-quote">
          <blockquote>
            “A quiet space for better ideas.”
            <span>— 一个让好想法生长的宁静空间。”</span>
            <i>— Fragrance UI</i>
          </blockquote>
        </div>
        <div className="pd-cell pd-info">
          <p className="ghome__cell-no pd-no"><b>05</b> / Project Info <span>项目信息</span></p>
          <dl className="pd-info-list">
            {INFO.map(([label, en, zh]) => (
              <div className="pd-info-row" key={label}>
                <dt>{label}</dt><dd>{en}{zh && <span> {zh}</span>}</dd>
              </div>
            ))}
          </dl>
          <a className="ghome__btn pri pd-start" href="#top">Start Exploring<span>开始探索</span></a>
        </div>
      </section>

      <footer className="ghome__foot">
        <span>Fragrance UI <i>v0.2</i> · A Personal Design System 一个人设计系统</span>
        <nav>{[["Work", "作品"], ["Writing", "文章"], ["Gallery", "画廊"], ["About", "关于"]].map(([en, zh]) => (
          <a key={en} href="#golden/home">{en} {zh}</a>
        ))}</nav>
      </footer>
    </div>
  );
}
