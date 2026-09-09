# Fragrance UI Design Constitution

> Version: v0.1 Review Baseline  
> Language: Chinese-first, bilingual-product compatible  
> Authority: Highest design policy for Fragrance UI

---

# 1. Identity

Fragrance UI 是一套服务于个人作品、观点、项目与技术表达的数字设计语言。

它不是一个追求覆盖所有场景的通用 UI Library，也不是一个用于展示前端技术能力的 Effects Collection。

Fragrance UI 的目标是：

> 用克制的设计承载内容，用艺术建立情绪，用技术制造质感，用角色建立人格。

内容始终拥有最高优先级。

任何视觉效果、动画、交互、品牌元素或技术实现，如果开始与内容争夺注意力，就已经偏离 Fragrance UI。

## 1.1 Core Character

### Editorial / 编辑感

像一本经过认真编排的杂志，而不是一个组件堆砌出来的网站。

强调：

- 信息层级
- 排版
- 节奏
- 留白
- 内容之间的关系

而不是依赖大量 Card、装饰与视觉特效建立结构。

### Artistic / 艺术感

艺术感来自构图、比例、图像、字体与节奏。

艺术感不等于：

- 渐变
- 发光
- 粒子
- 大量动画
- 复杂 SVG
- 3D

Fragrance UI 不使用技术特效代替审美判断。

### Technical / 技术感

技术应该存在于体验背后。

它可以使用先进的浏览器能力、Motion、Canvas、Shader、Rive 或 Three.js。

但用户首先感受到的应该是：

> 精致、自然、流畅。

而不是：

> 这个页面用了某种技术。

**Technology should disappear behind taste.**

### Restrained / 克制

克制是 Fragrance UI 最重要的设计能力。

默认行为是：

> 不加。

而不是：

> 还能加什么。

当多个设计方案都可以成立时，优先选择视觉存在感更低、表达更清楚、生命周期更长的方案。

---

# 2. Brand Relationship

Fragrance UI 中存在四个主要表达者。

## Content

内容是主角。

项目、观点、文字、作品和信息拥有最高视觉权重。

## Art

艺术负责建立情绪与世界观。

艺术可以增强内容，但不能遮盖内容。

## Technology

技术负责质感、连续性、反馈和空间感。

技术不是独立的视觉主体。

## Cats

两只猫负责提供品牌人格。

**猫是角色，不是装饰素材。**

它们应该像真正的角色一样拥有：

- 出场理由
- 行为
- 状态
- 情绪
- 节制的曝光

不要为了“让页面更有品牌感”而重复增加猫咪元素。

---

# 3. Design Principles

## Principle 01 — Content Before Interface

首先设计内容关系，再设计容器。

```text
Content
↓
Hierarchy
↓
Composition
↓
Interaction
↓
Component
↓
Decoration
```

禁止反向从组件出发设计页面。

## Principle 02 — Composition Before Decoration

页面质感首先来自：比例、Grid、Typography、Space、Alignment、Image Composition。

而不是来自：Shadow、Gradient、Glass、Glow、Animation、3D。

如果一个页面在关闭所有特效和动画后失去设计质量，应重新设计。

## Principle 03 — Static by Default, Expressive by Intention

默认状态是静态。

动画必须有明确意图，只允许属于：

- Enter
- Focus
- Continuity
- Feedback
- Personality
- Atmosphere

无法归入以上 Intent 的动画，默认不应存在。

## Principle 04 — One Strong Idea Is Better Than Five Effects

每个页面应该存在一个主要视觉想法。

其他元素都应该服务于这个主要想法。禁止同时依赖多个高存在感视觉效果制造“高级感”。

## Principle 05 — Motion Is Choreography, Not Animation

不要逐个思考 Button、Card、Title 怎么动。

优先思考：用户首先看到什么、第二个注意点是什么、空间如何变化、前后状态如何保持连续。

Fragrance UI 的 Motion 单位优先是 **Scene**，而不是 Element。

## Principle 06 — Depth Should Be Felt, Not Shown

允许空间层级：

```text
Atmosphere
Surface
Content
Foreground
```

不同层可以拥有不同的位移、模糊、亮度或响应速度。

不要依赖夸张 3D rotation、large parallax、heavy shadow、aggressive perspective 来证明深度。

## Principle 07 — Effects Are Expensive

任何高存在感效果都消耗 Visual Budget。

**Available does not mean allowed.**

## Principle 08 — Brand Elements Are Scarce

猫咪、手写字体、特殊图像处理和品牌动画都属于稀缺资源。

品牌应该表现为“一个被记住的瞬间”，而不是每个角落都提醒用户这是 Fragrance。

## Principle 09 — Avoid Generic AI Aesthetics

避免：

- 大面积渐变
- 发光边框
- 满屏 Card
- Pill everywhere
- 所有元素 hover 上浮
- 大量 blur
- 巨大营销式 Hero
- Aurora + Gradient + Beam 堆叠
- 无意义动态背景
- 所有标题都使用视觉效果
- 为了“现代感”加入 3D

当某种设计很容易由一句 “Make it modern and premium” 生成出来时，应提高警惕。

## Principle 10 — Restraint Must Be Measurable

“克制”必须通过 Visual Budget 约束，而不是仅作为审美形容词。

## Principle 11 — Reuse Before Creation

Agent 创建新视觉方案之前：

```text
Existing Pattern
↓
Existing Golden Sample
↓
Existing Core Component
↓
Existing Controlled Capability
↓
New Design
```

## Principle 12 — Experiments Do Not Become Language Automatically

Lab 中的能力只是 Capability Candidate。

```text
Experiment
↓
Real Use Case
↓
Design Review
↓
Golden Sample
↓
DESIGN.md Rule
```

之后才可进入正式语言。

## Principle 13 — Design Quality Must Survive Without Motion

正式页面在 `prefers-reduced-motion` 或关闭非必要动画后仍必须成立。

## Principle 14 — Implementation Must Follow Design Authority

```text
DESIGN.md
>
Golden Sample
>
Patterns
>
Core Components
>
Existing Implementation
>
Agent Preference
```

历史代码不是设计依据。

## Principle 15 — Every Visual Decision Needs a Reason

加入 animation / effect / illustration / mascot / custom surface / new component / new token / new layout pattern 时，必须回答：

> 它解决了什么表达问题？

“更酷、更高级、更现代、更丰富、更有科技感”默认不构成充分理由。

---

# 4. Bilingual Design / 双语原则

Fragrance UI 必须原生支持中文与英文，而不是把英文页面简单翻译成中文。

## 4.1 Equal Authority, Different Rhythm

中英文信息地位可以相同，但排版节奏不强制逐字镜像。

允许：

```text
A More Human Internet
一个更有人情味的互联网
```

也允许在不同场景中以中文为主、英文作为 metadata / brand accent，或反之。

## 4.2 Chinese Is Not Small English

中文不默认继承英文的：

- 超宽 letter-spacing
- 过细 font-weight
- 过小字号
- 全大写式视觉节奏

中文正文首先保证阅读舒适度。

## 4.3 Suggested Hierarchy

品牌 / Editorial 场景：

```text
English Display
Chinese Meaning Line
English metadata / Chinese metadata as needed
```

中文内容场景：

```text
Chinese Primary Heading
English Section Label / Kicker
Chinese Body
English optional metadata
```

## 4.4 Translation Is Semantic

文案允许为了语气、节奏和文化表达进行意译。

不要强制一一对应的机器翻译式双语排版。

---

# 5. Visual Budget

Visual Budget 用于把“克制”从审美建议变成可执行规则。

## 5.1 Default Budget

```text
Primary Visual Moment       = 1
Secondary Visual Moments   <= 2
Continuous Motion Sources  <= 1
Atmospheric Effects        <= 1
Mascot Scenes              <= 1
Experimental Capabilities   = 0
```

这些是上限，不是目标。

## 5.2 Primary Visual Moment

用户进入页面后最应该记住的一个视觉事件。

一个页面只能拥有一个 Primary Visual Moment。

错误：

```text
Large Hero Artwork
+
Animated Gradient Headline
+
3D Object
+
Aurora Background
```

## 5.3 Secondary Visual Moment

用于增强节奏，默认不超过两个，并不得与 Primary 竞争。

## 5.4 Continuous Motion

用户没有操作时仍持续运动的视觉元素，包括 Aurora、Marquee、Particle、Shader、Gradient Animation、Beam、自动旋转 3D、循环角色动画。

```text
Continuous Motion <= 1 / viewport
```

如果用户无法在几秒内忘记它正在动，它就占用预算。

## 5.5 Atmosphere

Atmospheric Effect 用于建立环境，不提供核心信息。必须停留在背景。

## 5.6 Mascot

```text
Mascot Scene <= 1 / page
```

小型 CatMark / favicon 不计入完整场景；完整插画、状态机角色和互动角色计入。

## 5.7 Budget Declaration

正式页面实现前声明：

```text
Primary:
Secondary:
Continuous:
Atmosphere:
Mascot:
Lab:
```

预算用完后必须重新分配，不得继续叠加。

---

# 6. Capability Governance

能力分为：

```text
CORE
BRAND
CONTROLLED
LAB
```

差别不在于代码质量，而在于 Agent 是否有权默认使用。

## 6.1 CORE

Agent 在符合语义时可默认使用。

### Layout

- Container
- Stack
- Cluster
- Grid
- Split
- Section
- Spacer

### Typography

- Display
- Heading
- Body
- Caption
- Label
- Kicker

### Actions

- Primary Button
- Secondary Button
- Ghost Button
- Danger Button
- Link

Glass 不属于 Action hierarchy。

### Forms

TextField / Select / Checkbox / Radio / Switch / Range

### Content

Card / Table / Tabs / Accordion / Pagination / Image / Gallery / Prose

### Feedback

Modal / Confirm / Error / Toast / Empty State / Loading / Progress

### Basic Motion

subtle state transition / enter / focus / feedback。

## 6.2 BRAND

- Cat Curators
- Handwritten Typography
- Grain
- Artwork Treatment

### Cat Rule

允许：Hero、About、Gallery storytelling、Empty State、Easter Egg、Character Interaction。

禁止：普通业务图标、Button 装饰、无意义 Card 配图、反复作为背景纹理。

## 6.3 CONTROLLED

Agent 不能默认调用，必须有 Design Intent。

- Glass Surface
- Magnetic Interaction
- Light Parallax
- Shared Layout Transition
- Complex GSAP Timeline
- Advanced Character Motion / Rive

### Glass

Glass 是 Surface Treatment，不是默认 Card 或 Button 风格。

只有后面存在值得被模糊的真实内容时才使用 Glass。

## 6.4 LAB

普通任务中默认禁止：

- Beam
- Aurora
- GradientText animation
- generic Marquee
- Three.js decorative shapes
- ParticleField
- WebGL Shader
- Rough.js
- DrawSVG showcase
- experimental CSS cats
- generic Tilt Card
- arbitrary Canvas decoration

## 6.5 Promotion

```text
LAB
↓
Concrete Use Case
↓
Design Intent
↓
Visual Budget Review
↓
Real Page Implementation
↓
Human Review
↓
Golden Sample
↓
Capability Promotion
```

禁止直接 `LAB → CORE`。

## 6.6 Demotion

```text
CORE
↓
CONTROLLED
↓
LAB
↓
DELETE
```

Design System 必须拥有删除能力。

---

# 7. Current Repo Capability Decision

| Capability | v0.1 Decision |
|---|---|
| Semantic Color Tokens | KEEP / CORE |
| SkinProvider | KEEP / REWORK |
| Button | REWORK / CORE |
| Glass Button | REMOVE FROM CORE |
| Card | REWORK / CORE |
| Forms | KEEP / CORE |
| Modal / Toast | KEEP / CORE |
| Table / Tabs / Accordion | KEEP / REWORK |
| Reveal | REWORK / CORE |
| Basic Loading | REWORK / CORE |
| CatMark | MOVE / BRAND |
| CatFull | REWORK / BRAND |
| Grain | KEEP / BRAND |
| Handwritten Type | KEEP / BRAND |
| Glass Surface | CONTROLLED |
| Magnetic | CONTROLLED |
| Shared Transition | HIGH-PRIORITY CONTROLLED |
| GSAP | CONTROLLED TOOL |
| Rive | FUTURE CONTROLLED |
| GradientText | LAB |
| Marquee | LAB |
| Beam | LAB |
| Aurora | LAB |
| Tilt | LAB |
| ThreeShapes | LAB |
| ParticleField | LAB |
| Raw WebGL Shader | LAB |
| Rough.js | LAB |
| DrawSVG Cat | REWORK OR DELETE |
| CSS Cat | LAB / DELETE |

---

# 8. Agent Design Decision Protocol

```text
1. 它是否传递信息或建立必要层级？
   NO → 不添加

2. 静态排版或构图是否可以解决？
   YES → 使用静态方案

3. 是否已有 Golden Pattern？
   YES → 复用

4. 是否已有 Core Capability？
   YES → 使用 Core

5. 是否需要 Controlled Capability？
   YES → 明确 Design Intent

6. 是否涉及 Lab？
   YES → 默认禁止进入正式实现

7. 是否消耗 Visual Budget？
   YES → 检查剩余预算

8. 关闭动画后页面是否仍成立？
   NO → 重做静态设计

9. 新设计是否只能被解释为“更酷 / 更高级 / 更现代”？
   YES → 重新论证
```

---

# 9. Motion System

Motion 是 Fragrance UI 的一级设计系统。

它不是 CSS 属性集合，也不是 Effects Library。

目标：

> 建立注意力、空间连续性、材质感与角色人格。

Motion 不用于证明页面“做了动画”。

## 9.1 Motion Identity

### Quiet

默认低存在感。动画完成后，注意力应迅速回到内容。

### Physical

运动具备 weight / inertia / acceleration / resistance / continuity。

避免把：

```text
opacity 0 → 1
translateY(20px) → 0
scale(.9) → 1
```

作为品牌级主要运动语言。

### Spatial

元素必须看起来来自某处并去向某处。

### Directed

```text
A causes B
B reveals C
C settles
```

而不是多个元素各自“动一下”。

### Interruptible

用户交互可以打断运动。

---

# 10. Motion Intent

## Enter

建立阅读顺序。禁止所有元素统一 fade-up 和无差别 stagger。

## Focus

把注意力转向重要内容。优先通过 contrast、local light、crop、subtle scale、spatial response 建立。

## Continuity

Fragrance UI 最重要的 Motion Intent。

重点：

- Card → Detail
- Artwork → Lightbox
- Gallery → Project
- Thumbnail → Hero
- Navigation → New Context

共享对象尽量保持 position / scale / visual identity / direction continuity。

## Feedback

Press / loading / success / error / selection / disabled / drag，必须快速且克制。

## Personality

用于双猫 Character。不是 idle loop，而是状态行为。

## Atmosphere

低频环境运动；最好是“用户不主动注意，关掉后觉得少了一层质感”。

---

# 11. Scene Choreography

Fragrance Motion 的基本单位是 Scene：

```text
Entry
↓
Establish
↓
Focus
↓
Interaction
↓
Exit / Transition
```

例如 Project Detail Hero：

```text
01 Artwork establishes first
02 Metadata follows quietly
03 Title settles into composition
04 Scroll changes spatial relationship
05 Artwork transitions into document flow
```

而不是 Image fade / Title fade / Subtitle fade / Button fade。

---

# 12. Motion Hierarchy

## Level 0 — Static

正文、label、table、metadata、大部分 layout。

## Level 1 — Functional

button / checkbox / tabs / menu / form / modal feedback。

Fast / quiet / predictable。

## Level 2 — Structural

shared element / modal opening / gallery navigation / image expansion / section transition。

允许 spring、layout interpolation、light parallax、masking。

## Level 3 — Expressive

只用于 Hero / major project transition / curator scene / editorial storytelling。

```text
<= 1 expressive scene / page
```

## Level 4 — Experimental

Shader / complex WebGL / Three.js / procedural graphics，默认 Lab。

---

# 13. Motion Physics

## Lightweight

tooltip / icon / chip / highlight：快、几乎无 inertia。

## Medium Surface

Card / Modal / Image panel：稍慢，需要 acceleration、settling、subtle depth。

## Heavy Scene

Large artwork / Hero / full-page surface：有质量感，不做夸张 overshoot spring。

## Character

由 anatomy / attention / mood / state 决定，不使用统一 UI physics。

---

# 14. Hover Philosophy

不是所有元素都需要 `translateY(-1px)`。

优先级：

```text
State clarity
↓
Material response
↓
Spatial response
↓
Decorative motion
```

推荐 border / contrast / image crop / subtle light / pointer-relative highlight。

谨慎 lift / tilt / scale / glow。

默认禁止 Every card lifts / Every button lifts / Every image zooms。

---

# 15. Scroll Motion

默认：

```text
Scroll = reading
```

不是：

```text
Scroll = trigger effects
```

允许用于空间关系、作品叙事、视觉主体连续、章节转换。

禁止每个 Section fade-up、大量 scrub、为了展示 GSAP 而 scroll trigger。

---

# 16. Character Motion System

双猫不再作为 SVG / CSS Animation Demo 维护。

未来以 State Machine 为核心：

```text
idle
sleep
notice
watch
curious
alert
interact
leave
return
```

状态变化来自 pointer proximity / scroll context / user action / page state / idle time。

目标：

> 用户感受到“猫注意到了我”，而不是“SVG 开始播放动画了”。

角色资产必须以 `references/` 中真实两只猫的外观为视觉锚，不得替换为通用布偶猫或其他猫种。

---

# 17. Motion Technology Boundary

## CSS

hover / focus / small feedback / simple enter / state transition。

## Motion Library

spring / layout interpolation / drag / gesture / shared layout / component physics。

Structural Motion 主力。

## GSAP

timeline choreography / editorial sequence / scroll narrative / advanced masks / controlled SVG sequence。

不用于普通 Button / Modal。

## Rive

双猫 Character State Machine / interactive brand illustration。

重点是角色行为模型，不只是动画更漂亮。

## Three.js

仅用于真实需要 3D form / camera / lighting / spatial navigation 的场景。

## Canvas / Shader

large population behavior / procedural imagery / texture / atmospheric field，默认 Lab / Controlled。

---

# 18. Anti-Motion Patterns

## Generic Fade-Up

允许作为低权重 Enter，不得成为品牌主 Motion Language。

## Decorative SVG Draw

单纯 stroke 0→100% + fill fade 不构成品牌级 animation。

## Infinite Decoration

Beam / Gradient / Aurora / Particle / Marquee 无限循环默认禁止，除非明确占用唯一 Continuous Motion Budget。

## Generic Spring Pop

scale(.2) + rotate + overshoot 不作为默认动效。

## Technology Showcase

禁止：

```text
Installed Technology
↓
Find a Place to Show It
```

正确：

```text
Design Problem
↓
Motion Intent
↓
Scene
↓
Lowest Suitable Technology
```

---

# 19. Current Motion Audit Decision

| Current Motion | Decision |
|---|---|
| `.mui-reveal` fade-up | REWORK |
| PageTransition fade/translate | REWORK |
| Button shimmer | REMOVE FROM DEFAULT |
| Button lift shadow | REDUCE |
| Rating spring stars | LAB / REDUCE |
| Error shake | KEEP / REWORK |
| Spinner variants | REDUCE |
| CountUp | CONTROLLED |
| GradientText loop | LAB |
| Marquee | LAB |
| Magnetic | CONTROLLED |
| Tilt | LAB |
| Beam | LAB |
| Aurora | LAB |
| CSS Cat breathing / blink | DELETE / LAB |
| CatFull CSS states | REPLACE WITH CHARACTER SYSTEM |
| GSAP DrawSVG Cat | LAB / REBUILD |
| offset-path paw trail | LAB |
| Scroll-driven showcase | LAB |
| Raw WebGL silk | LAB |
| Particle network | LAB |
| ThreeShapes | LAB |
| Shared gallery/detail transition | P0 REWORK |

### Priority

```text
P0 Shared spatial transition
P0 Real scene choreography
P1 Surface physics
P1 Image interaction
P1 Character state machine
P2 Atmospheric motion
P3 Experimental effects
```

---

# 20. Motion Quality Gate

正式页面必须检查：

- Intent：每个动画是否属于六种 Intent？
- Static：关闭动画后是否成立？
- Budget：Continuous <= 1，Expressive Scene <= 1？
- Choreography：是否存在明确先后关系？
- Interruption：用户是否无需等待动画完成？
- Reduced Motion：是否合理降级？
- Technology Visibility：用户是否明显意识到某种前端技术？若是，应降低存在感。
- Emotional Result：用户应该感受到什么，而不是用了什么技术？

---

# 21. Golden Sample Role

Golden Sample 回答：

> What good looks like.

`DESIGN.md` 回答：

> What is allowed and why.

Golden Sample 不能替代 DESIGN.md，也不拥有更高权威。

未来推荐至少存在：

```text
golden/
├── home/
├── project-detail/
├── gallery/
├── article/
└── motion/
```

每个 Golden Sample 建议包含：

```text
README.md
screenshot.png
page.tsx
motion-storyboard.md (if applicable)
```

README 应说明：

- Primary Visual Moment
- Visual Budget
- 使用了哪些 Pattern
- 主动没有使用哪些能力
- Motion Intent
- 哪些区域不可被 Agent 任意改写

---

# 22. Design Authority

最终固定：

```text
DESIGN.md
>
Golden Samples
>
Patterns
>
Core Components
>
Current Production Code
>
Lab
>
Agent Preference
```

不得为了让某次实现通过审查而临时修改 DESIGN.md。
