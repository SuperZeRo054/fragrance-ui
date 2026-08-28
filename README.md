# Fragrance UI

多皮肤主题引擎驱动的个人品牌 React 组件库。**一套结构，任意换皮。**
两位猫咪馆长（奶油 × 蓝灰）督阵——所有吉祥物均为运行时内联 SVG，零位图零 emoji。

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

## Roadmap
- v0.2 → Drawer / CommandPalette / Stepper / Blog Prose 排版
- v0.3 → npm 发布 + token CLI
- 皮肤征集：按 `src/tokens.css` 块格式提交你的皮

License: MIT · Curated by two cats
