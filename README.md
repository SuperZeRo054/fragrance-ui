# Fragrance UI

一套面向个人作品与技术表达的 Agent-first Frontend Design System。
用克制的设计承载内容，用艺术建立情绪，用技术制造质感，用角色建立人格。

**设计权威在 `DESIGN.md`（宪法），Agent 工作规则在 `AGENTS.md`。**
本 README 只是入口地图；发生冲突时以宪法为准。

## 仓库地图

```text
DESIGN.md            设计宪法：Identity / Visual Budget / 能力治理 / Motion 系统
AGENTS.md            Agent 行为约束：权威顺序、开工前必读、快速否决清单
src/tokens.css       主题引擎：皮肤 × 昼夜 × 字体包
src/components/      CORE：语义符合即可用
src/brand/           BRAND：猫是角色不是装饰，稀缺使用
src/motion/          CONTROLLED：共享过渡等，需 Design Intent
src/lab/             LAB：默认禁入，见 src/lab/README.md 的晋升路径
golden/              金样本：What good looks like（G01 首页 / G02 项目详情 / G03 画廊 / G04 文章 / M03 场景）
patterns/            页面级编排模式
tests/               四道质量门（见下）
audit/               历次设计审计与冻结记录
demo/                能力目录（Playground），不是金样本
```

## 能力分级

| 级别 | 含义 | 位置 |
|---|---|---|
| CORE | 语义符合即可用 | `src/components`、`src/tokens.css` |
| BRAND | 猫 / 手写体 / 颗粒 / 艺术处理，稀缺使用 | `src/brand` |
| CONTROLLED | 需明确 Design Intent（Glass Surface / Magnetic / CountUp / Shared Transition） | 组件注释标注 |
| LAB | 默认禁止进入正式实现 | `src/lab` |

LAB → CORE 禁止直通；晋升走：用例 → Design Intent → Visual Budget → 实现 → Review → Golden Sample。

## 使用

```tsx
import { SkinProvider, Button, Card } from "fragrance-ui";
import "fragrance-ui/styles.css";

<SkinProvider defaultSkin="fragrance" defaultMode="day" defaultLang="zh">
  <Button variant="primary">开始创作</Button>
</SkinProvider>
```

主题引擎三个维度：皮肤（`fragrance` / `graphite`）、昼夜、字体包（系统 / 衬线 / 等宽 / 圆体 / 楷体），
外加语言（`zh` / `en`，Equal Authority, Different Rhythm）。全部通过 `<html data-*>` 整组换血。

## 导出（按能力分级）

**CORE**
原子：Reveal · Button(primary/outline/ghost/danger) · Badge · Kicker · SectionHead · ChipGroup · Rating · Avatar · Tooltip · HScroll
表单：TextField · SelectField · Switch · Checkbox · RadioGroup · RangeField
覆盖层：Modal · ConfirmModal · ErrorModal · Lightbox · Drawer · CommandPalette(⌘K) · ToastProvider/useToast
内容：Card · Table · Tabs(steps) · Accordion · Pagination · Stepper · EmptyState · Skeleton · Prose(长文排版)
反馈：Spinner · Progress · LazyImage(blur-up)
基础动效：TypingText · TextReveal · PageTransition · viewNavigate

**BRAND**
CatMark · CatFull · CatCharacter（指针邻近驱动的状态机：idle/notice/watch/curious/interact/return）

**CONTROLLED**
SharedLightbox（Gallery → Detail 共享元素过渡）· Magnetic · CountUp · Glass Surface（`.fui-glass`）

**LAB**（默认禁入）
GradientText · Marquee · Tilt · Beam · Aurora · ThreeShapes · ParticleField

**Agent 原生**（CORE）
StreamText · ThinkingText · TextScramble · TextRotate · AgentSteps · ToolCallCard · PromptBar · StatusDot · VoiceBars · LiveCounter

**图标**：Phosphor 精选桶 45 枚（MIT，`src/icons.ts`），六档字重，currentColor 随主题。

## 质量门

```bash
npm run check          # 全部四道门
npm run check:policy   # 宪法硬规则：CORE 纯度 / LAB 隔离 / 禁用词 / emoji / hover 哲学 / glass 非 action
npm run check:ui       # 组件目录回归（渲染 / 锚点 / 导航 / 共享过渡 / 角色状态机 / 双语 / 390px）
npm run check:matrix   # 2 视口 × 2 皮肤 × 2 模式 × 2 语言的渲染与对比度矩阵
npm run check:golden   # 四个金样本路由 + Scene Hero 编排 + reduced-motion 降级
```

需要本地 preview 运行在 `:4173`（`npm run preview`）。

## 本地开发

```bash
npm run dev      # vite dev
npm run build    # 产出 docs/（GitHub Pages 用）
npm run preview  # 预览构建产物
```

线上：<https://superzero054.github.io/fragrance-ui/>

## Roadmap

- 金样本首页的摄影版主视觉资产（现用浮世绘画代位）
- M02 角色状态机接入 Rive（需 .riv 资产）
- npm 发布与 token CLI

License: MIT · Curated by two cats
