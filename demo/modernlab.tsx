import React, { useState } from "react";
import {
  SectionHead, Reveal, Button, Badge, Kicker, CatMark,
  TypingText, TextReveal, GradientText, Marquee, Magnetic, Tilt, Beam, Aurora,
  ThreeShapes, ParticleField,
} from "../src";

/* ============ 纯 CSS 画猫（零 SVG 零图片：div + 圆角 + 渐变） ============ */
export function CssCat({ tone = "cream" }: { tone?: "cream" | "blue" }) {
  return <span className={`csscat ${tone}`} aria-hidden><i className="ear l" /><i className="ear r" /><span className="face"><i className="eye l" /><i className="eye r" /><i className="nose" /></span></span>;
}

/* ===== 08 · 现代特效套件 ===== */
export function ModernEffects() {
  const marquee = ["GPT 生图", "Seedance 视频", "SVG 手绘", "Three.js 3D", "Rive 状态机", "CSS 磨砂", "Canvas 粒子"];
  return (
    <section id="effects-lab">
      <SectionHead kicker="08 · Modern Effects" title="现代特效套件"
        sub="打字机、逐字揭示、流光字、跑马灯、磁吸、3D 倾斜、流光边框、极光背景。动效只碰 opacity 和 transform。" />
      <div className="effects-hero">
        <Reveal>
          <Kicker>Live Demo</Kicker>
          <p className="t1"><TypingText text="你好，我们是两位猫咪馆长。" /></p>
          <p className="t2"><TextReveal text="We draw with code, and purr with pixels." /></p>
          <p style={{ marginTop: 14 }}><GradientText>从此，强调文字自带流光。</GradientText></p>
        </Reveal>
      </div>
      <div className="marquee-wrap">
        <Marquee items={marquee.map((m) => (<><CatMark size={22} tone={m.length % 2 ? "cream" : "blue"} />{m}</>))} />
      </div>
      <div className="combo-grid">
        <Reveal>
          <div className="lab-card">
            <span className="cap" style={{ fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: "var(--accent)" }}>Magnetic + Glass</span>
            <div style={{ display: "flex", gap: 18, justifyContent: "center", padding: "26px 0 10px" }}>
              <Magnetic><Button>靠我近点</Button></Magnetic>
              <Magnetic strength={.4}><Button variant="glass">再近点</Button></Magnetic>
            </div>
            <p className="lab-note">磁吸：光标进入时子元素被「吸」过去，离开弹簧回位。适合主 CTA。</p>
          </div>
        </Reveal>
        <Reveal delay={90}>
          <Tilt max={9}>
            <Beam className="combo-card" style={{ minHeight: 190 }}>
              <span className="cap">TILT + BEAM + GLASS</span>
              <CatMark tone="blue" size={54} />
              <p className="lab-note" style={{ margin: 0 }}>三层特效叠装：3D 倾斜随光标、流光沿边框巡航、磨砂玻璃底。</p>
            </Beam>
          </Tilt>
        </Reveal>
        <Reveal delay={160}>
          <Aurora className="aurora-demo">
            <span className="mui-hand">Aurora background</span>
            <p style={{ fontSize: 14, color: "var(--text-dim)", marginTop: 8 }}>
              双极光斑 blur(64px) 缓慢游走——Hero 区的氛围担当。</p>
          </Aurora>
        </Reveal>
      </div>
    </section>
  );
}

/* ===== 09 · 三维与粒子 ===== */
export function ThreeLab() {
  const [shape3d] = useState(true);
  return (
    <section id="three-lab">
      <SectionHead kicker="09 · 3D & Canvas" title="三维与粒子"
        sub="Three.js 管深度和光影，Canvas 管粒子群体。至于几何吉祥物，纯 CSS 就够。" />
      <div className="combo-grid">
        <Reveal>
          <div className="lab-card">
            <Badge tone="gold">Three.js · WebGL</Badge>
            {shape3d && <ThreeShapes height={280} />}
            <p className="lab-verdict">适配：Hero 首屏、沉浸式产品展示。银色金属多面体随光标视差旋转，滚出视口自动停帧。</p>
          </div>
        </Reveal>
        <Reveal delay={90}>
          <div className="lab-card">
            <Badge tone="info">Canvas 2D · 粒子网络</Badge>
            <div style={{ marginTop: 12 }}><ParticleField height={280} /></div>
            <p className="lab-verdict">适配：粒子、星尘、连接网络等「群体行为」。光标靠近会推开粒子，近距自动连线。</p>
          </div>
        </Reveal>
        <Reveal delay={160}>
          <div className="lab-card">
            <Badge tone="ok">纯 CSS · 零 SVG 零图片</Badge>
            <div className="csscat-scene" style={{ marginTop: 18 }}>
              <CssCat tone="cream" />
              <CssCat tone="blue" />
            </div>
            <p className="lab-verdict">适配：极简几何吉祥物、装饰位。两只猫全部由 div 圆角与渐变构成——连描边都没有。</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
