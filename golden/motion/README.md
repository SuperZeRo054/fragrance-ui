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
