# G05/M01+M05 · Gallery → Detail Shared Element Transition

Status: **implemented (P0)** · 实现：`src/motion/shared-lightbox.tsx`

## Visual Budget Declaration

```text
Primary:    展开后的作品图像本身
Secondary:  字幕胶囊（后置建立）
Continuous: 0
Atmosphere: scrim 轻模糊（静态）
Mascot:     0
Lab:        0
```

## Motion Intent

Continuity + Focus。「打开的是同一个作品，而不是跳到另一个网页。」

## Storyboard 落实

Lift（原位抬升，等比）→ Shared Transform（.48s cubic-bezier(.32,.72,0,1)，无 overshoot）→
Context Establish（transform 结束后字幕/关闭钮才建立）→ Settle（静止）。
关闭 = 同一轨迹反放，背景最后退出。

## 主动不使用

fade-blank 换页、大幅 zoom、弹跳 overshoot、多元素独立 fade-up、Lightbox 内装饰动效。

## 边界

CONTROLLED：仅用于作品/图像类媒体的展开。reduced-motion 直接呈现终态。

---

## M03 · Scroll Narrative（Scene Hero，2026-09-09 实现）

实现：`golden/scene.tsx` + `scene.css`，应用于 G01 首页与 G02 项目详情。

Storyboard 落实：

```text
01 Artwork establishes first        主视觉 1.1s 建立（scale 1.04 → 1）
02 Metadata follows quietly         kicker / 边款 .30s 起错峰跟进
03 Title settles into composition   标题 .42s、导语 .56s、按钮 .74s 依次落位
04 Scroll changes spatial relation  仅主视觉层视差（≤42px，rAF 合帧）
05 Artwork transitions into flow    滚出 Hero 后运动停止，进入阅读
```

约束：Continuous = 0（视差只在滚动时发生）；只移动主视觉层，不移动文字；
reduced-motion 直接呈现终态（无动画、无视差）。
