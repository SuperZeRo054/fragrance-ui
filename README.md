# Musée UI

多皮肤主题引擎驱动的个人品牌 React 组件库。**一套结构，任意换皮。**

- 组件只消费语义令牌（`--surface / --accent / --font-display …`）
- 皮肤 = 一组挂在 `<html data-skin data-mode>` 上的 CSS 变量，整组换血零闪烁
- 内置皮肤：`musée`（象牙纸×古铜金，日/夜）、`graphite`(石墨暗室×熔铜，日/夜)
- 全部动效仅使用 `opacity / transform`，离屏自动让位，尊重 `prefers-reduced-motion`

## 使用

```tsx
import { SkinProvider, Button, Card } from "musee-ui";
import "musee-ui/styles.css";

<SkinProvider defaultSkin="musée" defaultMode="day">
  <Button variant="primary">你牛大了</Button>
</SkinProvider>
```

## v0.1 导出清单
原子：Reveal · Button · Badge · Kicker · SectionHead · ChipGroup · Rating · Avatar · Tooltip
表单：TextField · SelectField · Switch · Checkbox · RadioGroup · RangeField
覆盖层：Modal · ConfirmModal · Lightbox · ToastProvider/useToast
内容：Card · Table · Tabs · Accordion · Pagination · EmptyState · Skeleton

## Roadmap
- v0.2 → Drawer / CommandPalette / Stepper / Blog 专用排版组件（Prose）
- v0.3 → npm 发布 + token CLI（Figma → CSS vars）
- 皮肤征集：欢迎按 `src/tokens.css` 的块格式提交你的皮

License: MIT · All Works Transformative Parody 🐂
