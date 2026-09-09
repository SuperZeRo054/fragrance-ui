import React, { useEffect, useRef, useState } from "react";
import {
  SectionHead, Reveal, Badge, Button, CatMark, Kicker, Skeleton,
  StreamText, ThinkingText, TextScramble, TextRotate, AgentSteps, ToolCallCard,
  PromptBar, StatusDot, VoiceBars, LiveCounter, useT,
  type AgentStepStatus,
} from "../src";
import { SectionHost } from "./host";

/* ---------- 三套轮换的 mock 任务 ---------- */
const CANNED = [
  {
    q: "把新封面接进演示站，别弄坏 Lighthouse",
    toolLabel: "构建与质检",
    tool: "vite.build", args: "$ vite build --mode production · base=/fragrance-ui/",
    result: "831ms · chunks 6 · 0 error",
    steps: [
      { label: "理解意图", detail: "解析指令与约束：接入资源 + 性能红线" },
      { label: "调用工具", detail: "vite.build --mode production" },
      { label: "汇总答复", detail: "引用 4 段上下文，压缩为结论" },
    ],
    answer: "已接入新封面并跑完构建：831ms 通过、0 报错，Lighthouse 91 分持平。灯箱与表格联动复验正常，可以推送。",
  },
  {
    q: "夜间模式下哪个令牌对比度不达标？",
    toolLabel: "令牌体检",
    tool: "a11y.scan", args: '$ scan contrast --skin fragrance --mode night --wcag "AA"',
    result: "scanned 46 · passed 45 · fixed 1",
    steps: [
      { label: "理解意图", detail: "锁定皮肤 fragrance / 夜间，AA 阈值 4.5:1" },
      { label: "调用工具", detail: "a11y.scan contrast --wcag AA" },
      { label: "汇总答复", detail: "汇总 46 枚令牌的扫描矩阵" },
    ],
    answer: "扫了 46 枚令牌：45 枚达标，仅 --text-dim 在玻璃底上差 0.3:1。已把它从 62% 提到 68% 透明度补偿，全站热更新完成。",
  },
  {
    q: "跑一遍 390px 移动端回归",
    toolLabel: "移动端回归",
    tool: "puppeteer.run", args: "$ run regression --viewport 390x844 --probe scrollWidth",
    result: "12 pages · scrollWidth 390 · 0 overflow",
    steps: [
      { label: "理解意图", detail: "以 390×844 为基准，探针盯横向溢出" },
      { label: "调用工具", detail: "puppeteer.run --viewport 390x844" },
      { label: "汇总答复", detail: "比对 12 个区块的 scrollWidth" },
    ],
    answer: "390px 全量回归通过：12 个区块 scrollWidth 均为 390，零横向溢出。签名行与 H1 的 clamp 表现稳定，可以发版。",
  },
];

type Phase = "idle" | "think" | "tools" | "sum" | "answer" | "done";

/* ---------- 10 · Agent Lab ---------- */
export function AgentLab() {
  const t = useT();
  const [cur, setCur] = useState(CANNED[0]);
  const [phase, setPhase] = useState<Phase>("idle");
  const [prompt, setPrompt] = useState("");
  const [draft, setDraft] = useState("");
  const [toolStatus, setToolStatus] = useState<"running" | "done">("running");
  const runN = useRef(0);
  const timers = useRef<number[]>([]);

  const later = (ms: number, fn: () => void) => { timers.current.push(window.setTimeout(fn, ms)); };
  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  useEffect(() => clearTimers, []);

  const start = (q?: string) => {
    const c = CANNED[runN.current % CANNED.length];
    runN.current += 1;
    clearTimers();
    setCur(c);
    setPrompt(q?.trim() || c.q);
    setDraft("");
    setToolStatus("running");
    setPhase("think");
    later(1200, () => setPhase("tools"));
    later(2700, () => setToolStatus("done"));
    later(3200, () => setPhase("sum"));
    later(4100, () => setPhase("answer"));
  };
  // 进视口自动演示一轮（比挂载定时器可靠：锚点直跳/慢加载都不会漏）
  const secRef = useRef<HTMLElement>(null);
  const startedRef = useRef(false);
  useEffect(() => {
    const el = secRef.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !startedRef.current) {
        startedRef.current = true;
        io.disconnect();
        window.setTimeout(() => start(), 700);
      }
    }, { threshold: .25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const stepStatus = (i: number): AgentStepStatus => {
    if (phase === "idle") return "pending";
    if (phase === "think") return i === 0 ? "running" : "pending";
    if (phase === "tools") return i === 0 ? "done" : i === 1 ? "running" : "pending";
    if (phase === "sum") return i < 2 ? "done" : "running";
    return "done";
  };
  const running = phase !== "idle" && phase !== "done";

  return (
    <section id="agent-lab" ref={secRef}>
      <SectionHead kicker="10 · Agent Native" title={t(["Agent 原生界面", "Agent-Native UI"])}
        sub={t(["给「机器正在工作」做的界面：流式输出、思考态、工具调用卡、任务时间线。输入框可以直接指挥，不打字就看它自己跑。", "Interfaces for machines at work: streaming text, thinking states, tool-call cards, task timelines. Command the input — or watch it run on its own."])} />
      <SectionHost host="wanwan" />

      <Reveal>
        <div className="agent-hero">
          <Kicker>ON DUTY</Kicker>
          <h3 className="agent-hero__line">
            今晚我来<TextRotate interval={2400}
              words={["查资料。", "写测试。", "修构建。", "盯发布。"]} />
          </h3>
          <p className="agent-hero__sub">
            <TextScramble text="AGENT-NATIVE · STREAMING FIRST" />
          </p>
        </div>
      </Reveal>

      <Reveal delay={90}>
        <div className="agent-run">
          {/* 左：对话流 */}
          <div className="agent-run__main">
            <PromptBar value={draft} onChange={setDraft} onSubmit={start} disabled={running}
              hints={CANNED.map((c) => c.q)} placeholder="给 Agent 下一个指令，回车发送" />

            <div className="agent-feed">
              {phase !== "idle" && (
                <div className="agent-feed__user">
                  <span className="cap">YOU</span>
                  <p>{prompt}</p>
                </div>
              )}
              {(phase === "think") && <ThinkingText label="读取上下文" />}
              {phase !== "idle" && phase !== "think" && (
                <div className="agent-feed__agent">
                  <div className="agent-feed__head">
                    <CatMark size={22} tone="cream" />
                    <StatusDot status={phase === "done" ? "done" : "busy"} />
                    <VoiceBars active={running} />
                  </div>
                  <AgentSteps
                    steps={cur.steps.map((s, i) => ({
                      label: s.label,
                      detail: s.detail,
                      status: stepStatus(i),
                    }))} />
                  {(phase === "tools" || phase === "sum" || phase === "answer" || phase === "done") && (
                    <ToolCallCard tool={cur.tool} args={cur.args} status={toolStatus}
                      ms={toolStatus === "done" ? 1428 : undefined} result={cur.result} />
                  )}
                  {(phase === "answer" || phase === "done") && (
                    <div className="agent-answer fui-glass">
                      <StreamText key={runN.current} text={cur.answer} startOnView={false}
                        onDone={() => setPhase((p) => (p === "answer" ? "done" : p))} />
                      {phase === "done" && (
                        <div className="agent-answer__meta">
                          <LiveCounter base={38} gain={4} unit="tok/s" />
                          <span>首字 0.42s · 上下文 4 段</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
              {phase === "done" && (
                <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
                  <Button size="sm" variant="outline" onClick={() => start()}>再跑一轮</Button>
                </div>
              )}
            </div>
          </div>

          {/* 右：仪表 */}
          <div className="agent-run__side">
            <div className="lab-card agent-tele">
              <span className="cap">SESSION</span>
              <div className="agent-tele__row">
                <StatusDot status={running ? "busy" : phase === "done" ? "done" : "idle"} />
                <VoiceBars active={running} />
              </div>
              <div className="agent-tele__grid">
                <div><LiveCounter base={1204} gain={7} unit="ctx tokens" /></div>
                <div><LiveCounter base={42} gain={3} unit="steps/min" /></div>
              </div>
              <div className="agent-tele__q">
                <Skeleton lines={2} />
              </div>
              <p className="lab-note">右侧仪表全部由 LiveCounter / VoiceBars / StatusDot 驱动——运行期间数字持续跳动，收工即定格。</p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* 原语货架 */}
      <div className="combo-grid" style={{ marginTop: 34 }}>
        <Reveal>
          <div className="lab-card">
            <Badge tone="info">ThinkingText</Badge>
            <div style={{ padding: "22px 0" }}><ThinkingText label="正在检索文档" /></div>
            <p className="lab-note">扫光掠过文字 + 三点呼吸。替代裸 Spinner：让用户知道「在忙什么」，而不只是「在忙」。</p>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="lab-card">
            <Badge tone="gold">ToolCallCard</Badge>
            <div style={{ display: "grid", gap: 10, padding: "18px 0" }}>
              <ToolCallCard tool="search.index" args='query="cat museum"' status="running" ms={340} />
              <ToolCallCard tool="read.file" args="src/tokens.css" status="done" ms={86} result="46 lines" />
              <ToolCallCard tool="net.fetch" args="GET /api/works" status="error" ms={5012} result="ETIMEDOUT" />
            </div>
            <p className="lab-note">mono 字体 + 活计时器；ERROR 态整卡轻震（与表单错误同一套 shake 曲线）。</p>
          </div>
        </Reveal>
        <Reveal delay={160}>
          <div className="lab-card">
            <Badge tone="ok">StreamText</Badge>
            <div style={{ padding: "22px 0", minHeight: 76 }}>
              <StreamText key={phase === "idle" ? "a" : "b"} cps={30}
                text="流式输出不是打字机：块长随机、间隔带抖动，像真的 token 在到达。" />
            </div>
            <p className="lab-note">按 LLM chunk 语义流出的正文，块状光标收笔即隐。这是 Agent 时代正文的默认形态。</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
