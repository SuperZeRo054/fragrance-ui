# Fragrance UI

> ⚠️ 设计权威：`DESIGN.md`（宪法）+ `AGENTS.md`（Agent 工作规则）。能力分级 CORE / BRAND / CONTROLLED / LAB，Lab 默认禁入。历史 Demo 是能力目录，不是 Golden Sample。

多皮肤主题引擎驱动的个人品牌 React 组件库。**一套结构，任意换皮。**
吉祥物是两只猫：万万（蓝金渐层，管动效与 Agent 模块）× 千千（重点色，管基础组件与图标）——所有猫均为运行时内联 SVG，零位图零 emoji。定位：适合构建 Agent 服务与现代前端页面的 React UI 库。

- 组件只消费语义令牌（`--surface / --accent / --font-display …`）
- 皮肤 = 一组挂在 `<html data-skin data-mode>` 上的 CSS 变量，整组换血零闪烁
- 内置皮肤：`fragrance`（银白冷调日/灰黑夜）、`graphite`（石墨×熔铜日/夜）
- 动效只碰 `opacity / transform`；离屏视频/懒加载自动让位；尊重 `prefers-reduced-motion`

## 使用

```tsx
import { SkinProvider, Button, Card } from "fragrance-ui";
import "fragrance-ui/styles.css";

<SkinProvider defaultSkin="fragrance" defaultMode="day">
  <Button variant="primary">你香大了</Button>
</SkinProvider>
```

## v0.1 导出清单
原子：Reveal · Button(glass) · Badge · Kicker · SectionHead · ChipGroup · Rating · Avatar · CatMark · Tooltip
表单：TextField · SelectField · Switch · Checkbox · RadioGroup · RangeField
覆盖层：Modal · ConfirmModal · ErrorModal(震动) · Lightbox · ToastProvider/useToast
内容：Card · Table · Tabs(含 steps) · Accordion · Pagination(方形) · EmptyState · Skeleton
动效：PageTransition · viewNavigate · Spinner×4 · Progress · CountUp · LazyImage(blur-up)
现代特效：TypingText · TextReveal · GradientText · Marquee · Magnetic · Tilt · Beam(流光边框) · Aurora
三维/画布：ThreeShapes(three.js 银色多面体) · ParticleField(粒子网络) · 纯 CSS 画猫(见 demo)
Agent 原生：StreamText(LLM 式流式) · ThinkingText(扫光思考) · TextScramble(解码) · TextRotate(轮换) · AgentSteps(任务时间线) · ToolCallCard(工具调用卡+活计时) · PromptBar(指令输入) · StatusDot · VoiceBars · LiveCounter

## Roadmap
- v0.2 → Drawer / CommandPalette / Stepper / Blog Prose 排版
- v0.3 → npm 发布 + token CLI
- 皮肤征集：按 `src/tokens.css` 块格式提交你的皮

主题引擎：SkinProvider（皮肤 / 昼夜 / 字体三维度）· 字体五包：系统 / 衬线 / 等宽 / 圆体 / 楷体
图标：Phosphor 精选桶 45 枚（src/icons.ts，MIT）· 六档字重 · currentColor 随主题 · 按需打包

License: MIT · Curated by two cats
