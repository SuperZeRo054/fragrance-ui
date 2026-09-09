# Fragrance UI · Design Harness v0.1

> 本包汇总 2026-09-08 围绕 Fragrance UI 的 Design.md / Golden Sample / Motion Harness 共建结果。
>
> 状态：**设计方向已对齐，v0.1 可作为 Review Baseline；尚未进入 GLM 批量改造。**

## 目标

Fragrance UI 不再被定义为“有什么组件就展示什么”的 React UI Demo，而是一套面向个人作品、观点、项目与技术表达的 **Agent-first Frontend Design System / Design Harness**。

核心目标：

1. 让 Agent 知道 Fragrance UI **是什么**。
2. 让 Agent 知道能力虽然存在，但**什么时候允许使用**。
3. 通过 `DESIGN.md + Golden Sample + Patterns + Visual Eval` 限制设计漂移。
4. 将现有 Repo 中的实验性特效与正式设计语言分离。
5. 重构当前过于基础、Demo 感明显的 CSS / SVG 动画，形成真正的 Motion Language。
6. 支持中英文双语界面。

## 推荐阅读顺序

1. `DESIGN.md` — 当前最高设计权威，包含 Identity、原则、Visual Budget、Capability Governance、Motion System。
2. `01-CURRENT-REPO-AUDIT.md` — 对当前 fragrance-ui Repo 的审计结论。
3. `02-DESIGN-DECISIONS.md` — 本轮共建达成的核心决策摘要。
4. `03-GOLDEN-SAMPLE-GUIDE.md` — 本包视觉样板的用途和 Review 方法。
5. `04-MOTION-GOLDEN-SAMPLES.md` — 重点 Motion 场景的 Storyboard 和实现意图。
6. `05-GLM-HANDOFF-DRAFT.md` — Review 完成后可交给 GLM 的改造方向草案，目前不要视为最终施工单。

## 权威顺序

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

历史代码不是设计依据；Golden Sample 也会过时。发生冲突时，以更高层规则为准。

## 素材目录

- `samples/`：本轮生成的视觉 / Motion Golden Sample 候选。
- `references/`：两只真实猫咪参考照，后续生成角色资产时必须以其外观为锚。

## 当前最重要的 Review 问题

请 Review 的不是“这张图是否好看”，而是：

- Fragrance 是否应该继续保持 Editorial / Artistic / Technical / Restrained 这四个核心气质？
- 双猫是否应该作为“馆长 / Character”，而非装饰性 mascot？
- 暗色、暖灰、低饱和、摄影 / 艺术主导的视觉基准是否正确？
- Golden Sample 是否需要进一步提高技术感，或降低摄影杂志感？
- Motion 是否认可“Scene Choreography + Shared Continuity + Character State Machine”的路线？
- 中英文是否采用“同权但不逐字镜像”的排版策略？

Review 完成后，再冻结 v0.2，并生成 GLM 的正式 Repo Migration Plan。
