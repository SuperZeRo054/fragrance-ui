# GLM Handoff Draft — Review 后使用

> 注意：这不是最终施工单。待用户 Review Golden Sample 后再冻结。

## 目标

将当前 fragrance-ui 从“Component + Effects Playground”改造成 DESIGN.md 驱动的 Frontend Harness。

## Phase 1 — Repo Governance

建议目标结构：

```text
fragrance-ui/
├── AGENTS.md
├── DESIGN.md
├── src/
│   ├── tokens/
│   ├── primitives/
│   ├── components/
│   ├── layouts/
│   ├── brand/
│   └── motion/
├── patterns/
├── golden/
├── lab/
├── audit/
└── tests/
    ├── visual/
    ├── a11y/
    └── interaction/
```

## Phase 2 — Capability Separation

必须先移动 / 重分类，不直接重写全部代码。

- Core 保留业务和布局能力。
- Brand 单独管理 Cat / Grain / signature typography / artwork treatment。
- Controlled 需要明确 opt-in。
- Beam / Aurora / Three / Particle / Rough / Shader 等移入 Lab。

## Phase 3 — Core Reduction

优先处理：

- Button variant 收敛，Glass 不作为 action variant。
- Token 扩展：spacing / type scale / container / grid / elevation / control height。
- 删除大量重复 inline layout 数值。
- 清理 Musée / Fragrance 命名残留。
- 重新定义 skin / mode 语义。

## Phase 4 — Motion Rebuild

P0：Shared Gallery → Detail Transition。

P0：真实 Scene Choreography。

P1：Surface physics / image interaction。

P1：Cat Character State Machine。

当前基础 CSS / SVG 动画不得被简单“调慢、调 easing”当作完成重构。

## Phase 5 — Golden Samples

只把用户 Review 通过的视觉样板实现为生产 Golden Sample。

建议优先：Home / Project Detail / Gallery / Motion Shared Transition。

## Phase 6 — Visual Eval

至少覆盖：

- desktop + mobile
- light / dark（若保留）
- Chinese / English
- reduced-motion
- hover / keyboard focus
- Golden screenshot regression

## Agent Rule

GLM 实现时必须先读：

```text
DESIGN.md
→ nearest Golden Sample
→ existing Pattern
→ existing Core Component
→ implementation
```

不得根据现有 Demo 中“能看到某个效果”就默认继续使用该效果。
