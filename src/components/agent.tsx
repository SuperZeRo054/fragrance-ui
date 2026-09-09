import React, { useEffect, useRef, useState } from "react";
import "./agent.css";

const reduced = () =>
  typeof matchMedia !== "undefined" &&
  matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ================= StreamText：流式输出（按 token 不规则流出 + 块状光标） =================
   Agent 时代的正文不是打字机——是 LLM 的 chunk 流：块长随机、间隔带抖动。 */
export function StreamText({ text, cps = 26, startOnView = true, onDone, className = "" }: {
  text: string; cps?: number; startOnView?: boolean; onDone?: () => void; className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const doneRef = useRef(false);
  const [go, setGo] = useState(!startOnView);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!startOnView) return;
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setGo(true); io.disconnect(); }
    }, { threshold: .3 });
    io.observe(el);
    return () => io.disconnect();
  }, [startOnView]);
  useEffect(() => { setN(0); doneRef.current = false; }, [text]);
  useEffect(() => {
    if (!go) return;
    if (n >= text.length) {
      if (!doneRef.current) { doneRef.current = true; onDone?.(); }
      return;
    }
    if (reduced()) { setN(text.length); return; }
    const chunk = 1 + Math.floor(Math.random() * 3);
    const jitter = .55 + Math.random() * .9;
    const id = setTimeout(() => setN(Math.min(text.length, n + chunk)),
      (1000 / cps) * chunk * jitter);
    return () => clearTimeout(id);
  }, [go, n, text, cps]);
  const done = n >= text.length;
  return (
    <span ref={ref} className={`fui-stream${done ? " done" : ""} ${className}`}>
      {text.slice(0, n)}
      {!done && <i className="fui-stream__caret" aria-hidden />}
    </span>
  );
}

/* ================= ThinkingText：思考态（扫光 + 呼吸点） ================= */
export function ThinkingText({ label = "思考中", className = "" }: { label?: string; className?: string }) {
  return (
    <span className={`fui-thinking ${className}`} role="status">
      <span className="fui-thinking__label">{label}</span>
      <span className="fui-thinking__dots" aria-hidden><i /><i /><i /></span>
    </span>
  );
}

/* ================= TextScramble：解码动效（乱码翻动收敛为原文） ================= */
const SCRAMBLE_CHARS = "ABCDEFGHKMNPRSTUVXYZ0123456789#%&@+$";
export function TextScramble({ text, duration = 900, startOnView = true, className = "" }: {
  text: string; duration?: number; startOnView?: boolean; className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [disp, setDisp] = useState(() => (reduced() || !startOnView ? text : ""));
  const [go, setGo] = useState(!startOnView);
  useEffect(() => {
    if (!startOnView) return;
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setGo(true); io.disconnect(); }
    }, { threshold: .4 });
    io.observe(el);
    return () => io.disconnect();
  }, [startOnView]);
  useEffect(() => {
    if (!go) return;
    if (reduced()) { setDisp(text); return; }
    let raf = 0; const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const reveal = Math.floor(p * text.length);
      let out = text.slice(0, reveal);
      for (let i = reveal; i < text.length; i++) {
        const ch = text[i];
        out += ch === " " ? " " : SCRAMBLE_CHARS[(Math.random() * SCRAMBLE_CHARS.length) | 0];
      }
      setDisp(out);
      if (p < 1) raf = requestAnimationFrame(tick); else setDisp(text);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [go, text, duration]);
  return <span ref={ref} className={`fui-scramble ${className}`}>{disp || "\u00A0"}</span>;
}

/* ================= TextRotate：文字轮换（等宽栈位，升起+去模糊切换） ================= */
export function TextRotate({ words, interval = 2600, className = "" }: {
  words: string[]; interval?: number; className?: string;
}) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (words.length < 2 || reduced()) return;
    const id = setInterval(() => setI((v) => (v + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);
  return (
    <span className={`fui-rotate ${className}`}>
      {words.map((w, k) => (
        <span key={k} className={k === i ? "on" : "off"} aria-hidden={k !== i}>{w}</span>
      ))}
    </span>
  );
}

/* ================= AgentSteps：任务时间线（受控：外部推 status） ================= */
export type AgentStepStatus = "pending" | "running" | "done" | "error";
export function AgentSteps({ steps, className = "" }: {
  steps: { label: string; detail?: string; status: AgentStepStatus }[]; className?: string;
}) {
  return (
    <ol className={`fui-steps ${className}`}>
      {steps.map((s, i) => (
        <li key={i} className={`fui-steps__item is-${s.status}`}>
          <span className="fui-steps__node" aria-hidden>
            {s.status === "running" && <i className="fui-steps__spin" />}
            {s.status === "done" && (
              <svg className="fui-steps__check" viewBox="0 0 12 12"><path d="M2.2 6.4 5 9.1 9.8 3.2" /></svg>
            )}
            {s.status === "error" && (
              <svg className="fui-steps__cross" viewBox="0 0 12 12"><path d="M3.2 3.2l5.6 5.6M8.8 3.2 3.2 8.8" /></svg>
            )}
            {s.status === "pending" && <i className="fui-steps__dot" />}
          </span>
          <span className="fui-steps__body">
            <span className="fui-steps__label">{s.label}</span>
            {s.detail && (s.status === "running" || s.status === "error") && (
              <span className={`fui-steps__detail${s.status === "error" ? " err" : ""}`}>{s.detail}</span>
            )}
          </span>
        </li>
      ))}
    </ol>
  );
}

/* ================= ToolCallCard：工具调用卡（mono 字体 + 活计时器） ================= */
export function ToolCallCard({ tool, args, status = "running", ms, result, className = "" }: {
  tool: string; args?: string; status?: "running" | "done" | "error";
  ms?: number; result?: string; className?: string;
}) {
  const [live, setLive] = useState(0);
  useEffect(() => {
    if (status !== "running" || reduced()) return;
    const id = setInterval(() => setLive((v) => v + 90), 90);
    return () => clearInterval(id);
  }, [status]);
  const shown = status === "running" ? (ms ?? live) : (ms ?? live);
  const stateText = { running: "RUNNING", done: "DONE", error: "ERROR" }[status];
  return (
    <div className={`fui-tool is-${status} ${className}`}>
      <div className="fui-tool__head">
        <svg className="fui-tool__glyph" viewBox="0 0 16 16" aria-hidden>
          <path d="M5.5 4.5 2 8l3.5 3.5M10.5 4.5 14 8l-3.5 3.5" />
        </svg>
        <span className="fui-tool__name">{tool}</span>
        <span className="fui-tool__state">{stateText}</span>
      </div>
      <div className="fui-tool__body">
        {args && <code className="fui-tool__args">{args}</code>}
        <span className="fui-tool__meta">
          {status !== "running" && result && <span className="fui-tool__result">{result}</span>}
          <span className="fui-tool__ms">{shown >= 1000 ? `${(shown / 1000).toFixed(2)}s` : `${shown}ms`}</span>
        </span>
      </div>
    </div>
  );
}

/* ================= PromptBar：Agent 指令输入条（glass + 图标发送） ================= */
export function PromptBar({ value, onChange, onSubmit, placeholder = "给 Agent 下一个指令", hints = [], disabled = false, className = "" }: {
  value: string; onChange?: (v: string) => void; onSubmit?: (v: string) => void;
  placeholder?: string; hints?: string[]; disabled?: boolean; className?: string;
}) {
  const canSend = !disabled && value.trim().length > 0;
  return (
    <form className={`fui-prompt ${className}`}
      onSubmit={(e) => { e.preventDefault(); if (canSend) onSubmit?.(value.trim()); }}>
      {hints.length > 0 && (
        <div className="fui-prompt__hints">
          {hints.map((h) => (
            <button type="button" key={h} disabled={disabled}
              onClick={() => onChange?.(h)}>{h}</button>
          ))}
        </div>
      )}
      <div className="fui-prompt__field fui-glass">
        <input value={value} placeholder={placeholder} disabled={disabled}
          onChange={(e) => onChange?.(e.target.value)} aria-label="指令输入" />
        <button type="submit" className="fui-prompt__send" disabled={!canSend} aria-label="发送指令">
          <svg viewBox="0 0 16 16" aria-hidden><path d="M2.5 8h10M8.5 3.8 12.8 8l-4.3 4.2" /></svg>
        </button>
      </div>
    </form>
  );
}

/* ================= StatusDot：状态点（idle / busy / done / error） ================= */
export function StatusDot({ status = "idle", label, className = "" }: {
  status?: "idle" | "busy" | "done" | "error"; label?: string; className?: string;
}) {
  const text = label ?? { idle: "空闲", busy: "执行中", done: "已完成", error: "异常" }[status];
  return (
    <span className={`fui-status is-${status} ${className}`} role="status">
      <i aria-hidden />{text}
    </span>
  );
}

/* ================= VoiceBars：活动均衡条（Agent 在干活的氛围信号） ================= */
export function VoiceBars({ n = 7, active = true, className = "" }: {
  n?: number; active?: boolean; className?: string;
}) {
  return (
    <span className={`fui-vbars${active ? " on" : ""} ${className}`} aria-hidden>
      {Array.from({ length: n }, (_, i) => (
        <i key={i} style={{
          "--lo": `${.18 + (i % 3) * .08}`,
          "--hi": `${.55 + ((i * 37) % 45) / 100}`,
          animationDelay: `${i * -.14}s`,
          animationDuration: `${.7 + ((i * 53) % 40) / 100}s`,
        } as React.CSSProperties} />
      ))}
    </span>
  );
}

/* ================= LiveCounter：活计数器（IO 门控 + 数字上滚闪现） ================= */
export function LiveCounter({ base = 0, gain = 5, every = 750, unit = "", className = "" }: {
  base?: number; gain?: number; every?: number; unit?: string; className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(base);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    let inView = false; let id = 0;
    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting;
      clearInterval(id);
      if (inView && !reduced()) {
        id = window.setInterval(() => {
          setV((x) => x + Math.round(Math.random() * gain));
        }, every);
      }
    }, { threshold: .2 });
    io.observe(el);
    return () => { io.disconnect(); clearInterval(id); };
  }, [gain, every]);
  return (
    <span ref={ref} className={`fui-live ${className}`}>
      <span key={v} className="fui-live__num">{v}</span>
      <span className="fui-live__unit">{unit}</span>
    </span>
  );
}
