import React from "react";
import "./home.css";
import wave from "../../demo/gallery/frg-greatwave.jpg";
import starry from "../../demo/gallery/frg-starrynight.jpg";
import waterlilies from "../../demo/gallery/frg-waterlilies.jpg";
import athens from "../../demo/gallery/frg-athens.jpg";
import catCream from "../../audit/harness-v0.1/references/cat-cream-reference.jpg";
import catBlue from "../../audit/harness-v0.1/references/cat-blue-reference.jpg";

/* G01 · Golden Home —— v0.2 冻结方向的生产实现。
   Visual Budget：Primary = 摄影主视觉 + 编辑志标题；Secondary = 三栏编辑栅格 + 引言带；
   Continuous = 0；Atmosphere = 静态颗粒；Mascot = 主视觉中的两只猫（摄影，非场景）。 */

export function GoldenHome() {
  return (
    <div className="ghome">
      <header className="ghome__bar">
        <a className="ghome__brand" href="#golden/home">
          Fragrance UI
          <span className="ghome__brand-sub">FOR A QUIETER WEB<br />为更温柔的网站而设计</span>
        </a>
        <nav className="ghome__nav">
          {[["Work", "作品", "#golden/home"], ["Writing", "文章", "#golden/home"],
            ["Gallery", "画廊", "#golden/gallery"], ["About", "关于", "#golden/home"]].map(([en, zh, href]) => (
            <a key={en} href={href}><i>{en}</i><span>{zh}</span></a>
          ))}
        </nav>
        <div className="ghome__bar-r">
          <a className="ghome__back" href="#top" title="Playground">⌂</a>
          <a className="ghome__cta" href="#golden/home">Let&apos;s Create<span>开始创作</span></a>
        </div>
      </header>

      <section className="ghome__hero">
        <img className="ghome__hero-img" src={wave} alt="神奈川冲浪猫 · Fragrance UI 主视觉" />
        <div className="ghome__hero-shade" />
        <div className="ghome__hero-copy">
          <p className="ghome__kicker">
            <span>CATS · DESIGN · A KINDER INTERNET</span>
            <span>猫咪 · 设计 · 更友善的网络</span>
          </p>
          <h1 className="ghome__display">
            A More<br />Human Internet
            <span className="ghome__display-zh">更有人味的互联网</span>
          </h1>
          <p className="ghome__lead-en">
            Fragrance UI is a personal design system exploring how technology,
            aesthetics, and cats can create calmer, more meaningful digital experiences.
          </p>
          <p className="ghome__lead-zh">
            Fragrance UI 是一个人设计系统，探索如何通过技术、美学与猫，创造更平静、更有意义的数据体验。
          </p>
          <div className="ghome__actions">
            <a className="ghome__btn pri" href="#golden/project">Explore Work<span>浏览作品</span></a>
            <a className="ghome__btn" href="#golden/home">Read the Story<span>阅读故事</span></a>
          </div>
          <p className="ghome__edge-l">LESS INTERFACE.<br />MORE MEANING.<br /><span>更少的界面，更多的意义。</span></p>
        </div>
        <aside className="ghome__edge-r">
          <p className="ghome__hand">Good ideas<br />take time.</p>
          <p className="ghome__hand-zh">好的想法<br />需要时间。</p>
          <p className="ghome__hand-meta">/ FRAGRANCE UI<br />GOLDEN SAMPLES v0.2<br />精选设计样本</p>
        </aside>
        <p className="ghome__edge-b">QUIETER TOOLS, BRIGHTER TOMORROWS.<span>更安静的工具，更明亮的明天。</span></p>
      </section>

      <section className="ghome__grid">
        <article className="ghome__cell">
          <p className="ghome__cell-no"><b>01</b> / Featured Projects <span>精选作品</span></p>
          <a className="ghome__proj" href="#golden/project">
            <img src={athens} alt="雅典学院猫" />
            <span className="ghome__proj-tag">UI System 设计系统</span>
            <span className="ghome__proj-t">Fragrance Design System<span>芳法学院系统</span></span>
            <span className="ghome__proj-d">A calm, flexible foundation for personal projects — with a focus on
              content, clarity, and a kinder internet.<i>一个平静、灵活的个人项目基座，专注于内容、清晰与更友善的网络。</i></span>
            <span className="ghome__proj-go" aria-hidden>→</span>
          </a>
          <div className="ghome__chips">
            {["Design 系统", "Components 组件", "Documentation 文档"].map((t) => <i key={t}>{t}</i>)}
          </div>
        </article>

        <article className="ghome__cell">
          <p className="ghome__cell-no"><b>02</b> / Latest Writing <span>最新文章</span></p>
          <a className="ghome__post" href="#golden/home">
            <span className="ghome__post-t">A Calmer Internet<br />Is Possible<span>更平静的互联网是可能的</span></span>
            <span className="ghome__post-d">Thoughts on design, life with cats, and building a more human web.
              <i>关于设计、与猫一起的生活，以及如何建设更有人情味的网络的思考。</i></span>
            <span className="ghome__post-m">Apr 6, 2024 · 8 min read<span>2024 年 4 月 6 日 · 8 分钟阅读</span></span>
            <span className="ghome__post-go">Read More <b>阅读更多</b></span>
          </a>
          <div className="ghome__chips">
            {["Design 设计", "Life 生活", "Cats 猫咪", "Technology 科技"].map((t) => <i key={t}>{t}</i>)}
          </div>
        </article>

        <article className="ghome__cell">
          <p className="ghome__cell-no"><b>03</b> / Gallery <span>画廊</span>
            <a className="ghome__all" href="#gallery">View All 查看全部 →</a></p>
          <div className="ghome__mosaic">
            <img src={catBlue} alt="千千 · 重点色" />
            <img src={starry} alt="星月夜猫" />
            <img src={catCream} alt="万万 · 蓝金渐层" />
            <img src={waterlilies} alt="睡莲中的猫" />
          </div>
        </article>
      </section>

      <section className="ghome__quote">
        <blockquote>
          “A quiet space for better ideas.”
          <span>— 一个让好想法生长的安静空间。”</span>
          <i>— Fragrance UI</i>
        </blockquote>
        <p>
          Design is not just what we see, but how it makes us feel. Fragrance UI is a personal
          exploration at the intersection of beauty, technology, and a kinder internet — with cats, always.
          <span>设计不只是用来看的，更是它带给我们的感受。Fragrance UI 是一次关于美、科技与更友善网络的个人探索——永远有猫陪伴。</span>
        </p>
        <div className="ghome__quote-r">
          <span className="ghome__f">F</span>
          <p>BUILT SLOWLY<br />FOR A BRIGHTER TOMORROW<span>慢慢构建，只为更明亮的明天。</span></p>
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
