import React from "react";
import { GhomeBar, GhomeFoot } from "../chrome";
import { CatCharacter, Prose } from "../../src";
import windowsill from "../../demo/gallery/frg-windowsill.jpg";
import starry from "../../demo/gallery/frg-starrynight.jpg";
import "../home/home.css";
import "./article.css";

/** G04 · Golden Article —— Scroll = reading。正文零动效，只有排版与留白。 */
export function GoldenArticle() {
  return (
    <div className="ghome gart">
      <GhomeBar active="writing" />

      <header className="gart-head">
        <p className="ghome__kicker">
          <span>WRITING · A CALMER INTERNET</span>
          <span>文章 · 更平静的互联网</span>
        </p>
        <h1 className="gart-title">
          A Calmer Internet<br />Is Possible
          <span>更平静的互联网是可能的</span>
        </h1>
        <p className="gart-meta">Apr 6, 2024 · 8 min read<span>2024 年 4 月 6 日 · 8 分钟阅读 · 万万 与 千千 监修</span></p>
      </header>

      <img className="gart-cover" src={windowsill} alt="窗台上的两只猫" />

      <Prose className="gart-body">
        <p className="fui-prose__lede">
          我们总说互联网让一切变快了。但快，不一定是好事。
          <span className="fui-prose__en">We built the web to be fast. Fast is not the same as good.</span>
        </p>
        <p>
          Fragrance UI 是一套个人设计系统。它从两只猫身上学事情：慢慢走路、认真看窗外、
          在阳光最好的位置睡上一觉。这些事情没有一个和「效率」有关，但它们让生活的质感完全不同。
          <span className="fui-prose__en">
            Fragrance UI is a personal design system that learns from two cats: walk slowly,
            watch the window with intent, and nap in the best light. None of these are
            efficient, yet all of them change how a day feels.
          </span>
        </p>
        <h2>一、留白不是空<span className="fui-prose__en">Whitespace is not empty</span></h2>
        <p>
          猫趴在窗台上之所以好看，是因为它周围什么都没有。界面也一样：留白不是没有设计，
          而是把注意力完整地让给你最重要的东西。
          <span className="fui-prose__en">A cat on a windowsill looks good because there is nothing else around it.
            Interfaces work the same way.</span>
        </p>
        <figure>
          <img src={starry} alt="星月夜猫" loading="lazy" />
          <figcaption>星月夜猫 · FRG-POS-01</figcaption>
        </figure>
        <blockquote>
          “A quiet space for better ideas.”
          <span className="fui-prose__en">一个让好想法生长的安静空间。”</span>
        </blockquote>
        <h2>二、动效是编舞<span className="fui-prose__en">Motion is choreography</span></h2>
        <p>
          好的动效像猫跳上桌面的那一下：有准备、有发力、有落定。落定之后，注意力回到内容。
          如果用户还在回味那个动画本身，它就已经过量了。
          <span className="fui-prose__en">Good motion is a cat landing on a desk: intent, effort, a quiet landing.
            If the user is still thinking about the animation, there was too much of it.</span>
        </p>
        <p>
          所以这套系统的默认答案是「不加」。克制不是风格，是能力。
          <span className="fui-prose__en">So the default answer in this system is no. Restraint is not a style, it is a skill.</span>
        </p>
      </Prose>

      <div className="gart-end">
        <CatCharacter tone="qian" temperament="shy" width={104} />
        <p>千千 也读到了这里。</p>
      </div>

      <section className="ghome__quote">
        <blockquote>
          “Less interface. More meaning.”
          <span>—— 更少的界面，更多的意义。</span>
          <i>— Fragrance UI</i>
        </blockquote>
        <p>
          如果你读到这里——谢谢。这部分是写给愿意慢下来的人的。
          <span>If you read this far, thank you. This one was written for the slow readers.</span>
        </p>
        <div className="ghome__quote-r">
          <span className="ghome__f">F</span>
          <p>BUILT SLOWLY<br />FOR A BRIGHTER TOMORROW<span>慢慢构建，只为更明亮的明天。</span></p>
        </div>
      </section>

      <GhomeFoot />
    </div>
  );
}
