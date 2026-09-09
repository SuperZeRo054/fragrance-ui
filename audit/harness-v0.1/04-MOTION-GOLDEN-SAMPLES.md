# Motion Golden Samples · v0.1 Storyboard

## M01 — Gallery → Project Detail / Shared Element Transition

### Intent

Continuity。

用户应该感受到：

> “我打开的是同一个作品，而不是跳到了另一个网页。”

### Storyboard

```text
1. Gallery Rest
   缩略图稳定存在。

2. Select
   其它内容轻微降权；选中图像不做夸张放大。

3. Lift
   图像脱离原 grid，但保持 aspect ratio / spatial identity。

4. Shared Transform
   图像平滑扩张至 Hero 目标区域；background / metadata 延迟退出。

5. Context Establish
   新页面 title / metadata 在图像接近最终位置后建立。

6. Settle
   Hero 成为稳定静态布局，动画完成后不残留高存在感运动。
```

### 禁止

- old page fade out → blank → new page fade in
- 大幅 zoom
- 弹跳 overshoot
- 同时出现多个独立 fade-up

---

## M02 — Cat Character State Machine

### Intent

Personality。

用户应该感受到：

> “猫注意到了我。”

而不是“猫在循环播放动画”。

### Candidate states

```text
idle
notice
watch
curious
interact
return
sleep
alert
```

### Example

```text
pointer distant
→ idle

pointer enters character zone
→ notice (ears / gaze first)

pointer moves nearby
→ watch (eyes follow, head follows less)

pointer remains
→ curious

explicit click / interaction
→ interact

pointer leaves
→ hold briefly
→ return
→ idle
```

两只猫可以拥有不同 temperament，避免同频同动作。

---

## M03 — Scroll Narrative

### Intent

Continuity + Editorial Storytelling。

### Scene

```text
Hero
→ Introduction
→ Artwork / Main Content
→ Closing
```

Scroll 首先是阅读，不是 effect trigger。

只有主视觉、图像和少量背景关系可以发生轻微层级运动。

---

## M04 — Image Hover / Focus

### Intent

Focus / Feedback。

推荐：

- local brightness change
- crop shift 1–3%
- border / focus treatment
- pointer-relative subtle light

不推荐：

- 每张图都明显 scale 1.08
- 大 shadow + translateY
- generic tilt

Keyboard focus 必须比 hover 更明确。

---

## M05 — Lightbox

### Intent

Continuity + Focus。

Gallery image → Lightbox 应保持同一图像的身份与空间轨迹。

背景退后，图像成为唯一 Primary Moment。

Lightbox 内不再叠加新的 decorative motion。
