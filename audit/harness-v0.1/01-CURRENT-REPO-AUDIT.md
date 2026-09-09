# Fragrance UI 当前 Repo 审计摘要

Repo: `SuperZeRo054/fragrance-ui`

## 总结

当前项目不是“没有 Design System”，而是已经具备较强的技术和组件基础，但缺少设计治理。

真实状态更接近：

```text
Theme Engine
+
Component Library
+
Brand / Cats
+
Effects Library
+
Creative Lab
```

五层能力同时拥有几乎相同的展示权和调用权。

核心风险：**能力扩张速度远高于设计规则收敛速度。**

## 已有值得保留的基础

- Semantic token 思路正确。
- SkinProvider / day-night 机制已经形成。
- React 组件覆盖较完整。
- `prefers-reduced-motion` 已考虑。
- 动画实现对 transform / opacity 等性能问题有意识。
- 猫咪、艺术作品、个人品牌已经形成差异化雏形。

## P0 问题

### 1. 没有统一 Identity

Repo 同时表现为银灰 Apple-like、博物馆、猫咪 IP、Glassmorphism、Creative Coding、AI Landing Page。

Agent 无法判断哪一个才是 Fragrance UI。

### 2. 没有 Design Constitution

代码能回答“有什么”，不能回答：

- 为什么使用？
- 什么时候使用？
- 什么禁止使用？
- 什么只属于实验？

### 3. Demo 不是 Golden Sample

当前 demo 本质是 Capability Catalogue / Playground。

它告诉 Agent“所有能力都可以展示”，不能告诉 Agent“真实页面应该如何取舍”。

### 4. Motion 缺少品牌语言

当前大量动画是：fade / translate / scale / rotate / stroke draw / simple spring。

技术实现存在，但仍有明显 CSS/SVG demo 感，没有 Scene Choreography、Spatial Continuity 和 Character Behavior。

## P1 问题

### Token 系统覆盖不完整

颜色 / radius / duration 较成熟，但 Spacing / Typography Scale / Container / Elevation / Control Height / Grid Gap 等大量规则仍散落为 inline style。

### Variant / Effect 组合膨胀

Button + Glass + Beam + Tilt + Magnetic + Aurora 等可以形成大量合法但不应该出现的组合。

### Brand 重命名残留

Fragrance / Musée 等历史概念并存，会导致 Agent 继续复制旧命名。

### Skin / Mode 语义不够干净

Graphite Day 本身即深色，使 `skin / mode / light-dark` 的产品语义不够清晰。

### Visual Emphasis 不稀缺

当前同时存在 Gradient / Glass / Beam / Aurora / 3D / Particle / Reveal / DrawSVG / WebGL 等大量强调手段，没有视觉预算。

### 工程 Eval 缺失

目前只有 dev / build / preview，缺少 visual regression / e2e / a11y / design policy gate。

## 结论

当前 Repo 进入下一阶段后，不应继续“增加组件 / 增加动画”。

应该先完成：

```text
DESIGN.md
↓
Capability Split
↓
Core Reduction
↓
Golden Samples
↓
Motion Rebuild
↓
Visual Eval
```
