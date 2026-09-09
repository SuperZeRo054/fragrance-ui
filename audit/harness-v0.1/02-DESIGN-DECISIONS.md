# 本轮共建核心决策

## 1. 产品定义

Fragrance UI 不再以“通用 React UI Library”为第一定义。

目标定义：

> 一套用于个人作品、观点、项目和技术表达的 Agent-first Frontend Design System。

## 2. 核心设计气质

冻结为四个关键词：

- Editorial
- Artistic
- Technical
- Restrained

核心句：

> Technology should disappear behind taste.

> Static by default, expressive by intention.

## 3. 双猫定位

两只真实猫是品牌角色 / 馆长，而不是装饰 mascot。

角色必须稀缺使用、有出场理由、有状态和行为。

未来角色动画优先采用 State Machine 思路（Rive 候选），而非简单 CSS breathing / SVG stroke。

## 4. Design.md 的存在意义

`DESIGN.md` = Design Constitution / Policy。

它不重复 `tokens.css`，而是定义：

- 什么属于 Fragrance
- 什么可以用
- 什么禁止用
- 为什么
- 如何做设计决策

## 5. Golden Sample 的存在意义

Golden Sample = Example / Demonstration。

它告诉 Agent “good looks like what”，但不能替代规则。

## 6. Visual Budget

设计“克制”必须可度量。

默认上限：Primary 1、Secondary <=2、Continuous <=1、Atmosphere <=1、Mascot Scene <=1、Lab = 0。

## 7. Capability Governance

正式建立：

```text
CORE
BRAND
CONTROLLED
LAB
```

“Repo 里存在”不等于“Agent 可以使用”。

## 8. Motion 方向

当前基础 CSS / SVG 动画整体不满意，需要从 Element Animation 重构为：

- Scene Choreography
- Spatial Continuity
- Surface Physics
- Character State Machine
- Restrained Atmosphere

## 9. 技术边界

- CSS：基础反馈
- Motion Library：结构 / physics / shared layout
- GSAP：品牌级 timeline / editorial choreography
- Rive：双猫 Character State Machine
- Three / Canvas / Shader：真实需要时再进入，默认 Lab

## 10. 双语

Fragrance UI 原生支持中文 + 英文。

双语不是逐字复制，而是 Equal Authority + Different Rhythm。

中文必须有独立 typography 规则，不照抄英文 letter-spacing / weight / size。
