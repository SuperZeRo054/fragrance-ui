# G03 · Golden Gallery（v0.2）

Status: **implemented** · 路由 `#golden/gallery` · 代码 `page.tsx` + `gallery.css`

## Visual Budget Declaration

```text
Primary:    图片本身（栅格 + 右侧详情大图）
Secondary:  筛选胶囊、编号元数据、Caveat 手写注
Continuous: 0
Atmosphere: 0
Mascot:     真实猫照两张作为被摄主体（非互动场景）
Lab:        0
```

## 交互

- 筛选胶囊（All/Scenery/Portrait/Paintings/Daily）真实过滤
- 点缩略图 → 右侧详情面板更新；左右箭头循环
- **View Larger 走 SharedLightbox 共享过渡**（M01/M05 复用，CONTROLLED）

## 主动不使用

卡片 hover 上浮、图片 scale 缩放、瀑布流视差。
