# AGENTS.md · Fragrance UI Agent Working Rules

> 本文件是 Agent 在本仓库工作时的最高行为约束。设计权威为 `DESIGN.md`。

## 权威顺序（冲突时向上看）

```text
DESIGN.md > Golden Samples > Patterns > Core Components > 现有实现 > Lab > Agent 个人偏好
```

历史代码不是设计依据。

## 开工前必读

```text
1. DESIGN.md
2. 最近的 Golden Sample（golden/）
3. 已有 Pattern（patterns/）
4. 已有 Core Component（src/components, src/primitives）
5. 才轮到实现
```

禁止因为「Demo 里能看到某个效果」就默认继续使用该效果。

## 能力分级（详见 DESIGN.md §6）

| 级别 | Agent 权限 | 位置 |
|---|---|---|
| CORE | 语义符合即可用 | src/components, src/tokens.css |
| BRAND | 猫 / 手写体 / 颗粒 / 艺术处理；稀缺资源，需出场理由 | src/brand |
| CONTROLLED | 需显式 Design Intent（Glass Surface / Magnetic / CountUp / Shared Transition / GSAP timeline） | 标注于组件注释 |
| LAB | 默认禁止进入正式实现 | src/lab |

LAB → CORE 禁止直通；晋升必须走：用例 → Design Intent → Visual Budget → 实现 → Human Review → Golden Sample。

## Visual Budget（每页上限，不是目标）

```text
Primary Visual Moment = 1
Secondary ≤ 2
Continuous Motion ≤ 1
Atmosphere ≤ 1
Mascot Scene ≤ 1
Lab = 0
```

## 快速否决清单

- 关闭动画后页面不成立 → 重做静态设计
- 理由只有「更酷 / 更高级 / 更现代 / 更有科技感」→ 不成立
- 大面积渐变 / 发光边框 / 满屏 Card / 处处 hover 上浮 / Aurora+Gradient+Beam 堆叠 → Anti-Pattern
- Scroll 首先是阅读，不是 effect 触发器
- 猫是角色不是装饰：不出现在业务图标、Button 装饰、无意义配图

## 双语

中文不是小号英文：中文正文不继承超宽 letter-spacing / 过细字重 / 过小字号。双语 = Equal Authority, Different Rhythm，允许意译。

## 提交前自检

```text
Intent / Static / Budget / Choreography / Interruption / Reduced-Motion / Technology Visibility
```

（DESIGN.md §20 Motion Quality Gate）
