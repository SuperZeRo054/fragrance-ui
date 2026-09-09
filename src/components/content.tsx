import React, { useState } from "react";
import "./content.css";

/* ---------------- Card ---------------- */
export function Card({ media, kicker, title, subtitle, footer, onClick, interactive = true }: {
  media?: React.ReactNode; kicker?: React.ReactNode; title: string;
  subtitle?: string; footer?: React.ReactNode; onClick?: React.MouseEventHandler<HTMLDivElement>; interactive?: boolean;
}) {
  return (
    <article className={`fui-card${interactive ? " fui-card--hot" : ""}`}
      onClick={onClick} tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === "Enter") onClick(e as never); } : undefined}>
      {media && <div className="fui-card__media">{media}</div>}
      <div className="fui-card__meta">
        {kicker && <div className="fui-card__era">{kicker}</div>}
        <h4>{title}</h4>
        {subtitle && <p className="fui-card__sub">{subtitle}</p>}
        {footer && <div className="fui-card__foot">{footer}</div>}
      </div>
    </article>
  );
}

/* ---------------- Table ---------------- */
export interface Col<T> { key: string; label: string; align?: "left" | "right"; render?: (row: T) => React.ReactNode }
export function Table<T extends Record<string, unknown>>({ columns, rows, rowKey, onRowClick }: {
  columns: Col<T>[]; rows: T[]; rowKey: (r: T) => string; onRowClick?: (r: T) => void;
}) {
  return (
    <div className="fui-tablewrap">
      <table className="fui-table">
        <thead><tr>{columns.map((c) => (
          <th key={c.key} style={{ textAlign: c.align ?? "left" }}>{c.label}</th>))}</tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={rowKey(r)} onClick={onRowClick ? () => onRowClick(r) : undefined}
              style={{ cursor: onRowClick ? "pointer" : undefined }}>
              {columns.map((c) => (
                <td key={c.key} style={{ textAlign: c.align ?? "left" }}>
                  {c.render ? c.render(r) : String(r[c.key] ?? "")}
                </td>))}
            </tr>))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------------- Tabs ---------------- */
/* ---------------- Tabs（underline 常规 / steps 步骤条：连接线联动 + 勾态） ---------------- */
export function Tabs({ items, variant = "underline" }: {
  items: { id: string; label: string; content: React.ReactNode }[];
  variant?: "underline" | "steps";
}) {
  const [active, setActive] = useState(items[0]?.id);
  const activeIdx = items.findIndex((it) => it.id === active);
  if (variant === "steps") {
    return (
      <div>
        <div className="fui-tabs fui-tabs--steps" role="tablist">
          {items.map((it, i) => (
            <React.Fragment key={it.id}>
              {i > 0 && <i className={`fui-step-line${i <= activeIdx ? " done" : ""}`} aria-hidden />}
              <button role="tab" aria-selected={active === it.id}
                className={`fui-step${active === it.id ? " active" : ""}${i < activeIdx ? " done" : ""}`}
                onClick={() => setActive(it.id)}>
                <b className="no">{i < activeIdx ? (
                  <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden>
                    <path d="M4.5 12.5l4.6 4.6L19.5 6.7" fill="none" stroke="currentColor"
                      strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : String(i + 1).padStart(2, "0")}</b>
                <span>{it.label}</span>
              </button>
            </React.Fragment>
          ))}
        </div>
        {items.map((it) => active === it.id && (
          <div key={it.id} role="tabpanel" className="fui-tabpanel">{it.content}</div>))}
      </div>
    );
  }
  return (
    <div>
      <div className="fui-tabs" role="tablist">
        {items.map((it) => (
          <button key={it.id} role="tab" aria-selected={active === it.id}
            className={`fui-tab${active === it.id ? " active" : ""}`} onClick={() => setActive(it.id)}>
            {it.label}
          </button>))}
      </div>
      {items.map((it) => active === it.id && (
        <div key={it.id} role="tabpanel" className="fui-tabpanel">{it.content}</div>))}
    </div>
  );
}

/* ---------------- Accordion（单开） ---------------- */
export function Accordion({ items, defaultOpen = -1 }: {
  items: { q: React.ReactNode; a: React.ReactNode }[]; defaultOpen?: number;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="fui-acc">
      {items.map((it, i) => (
        <details key={i} open={open === i} onToggle={(e) =>
          (e.target as HTMLDetailsElement).open && setOpen(i)}>
          <summary>{it.q}<span className="plus">＋</span></summary>
          <div className="fui-acc__body">{it.a}</div>
        </details>))}
    </div>
  );
}

/* ---------------- Pagination（受控） ---------------- */
export function Pagination({ page, total, onChange }: {
  page: number; total: number; onChange: (p: number) => void;
}) {
  const nums: (number | "…")[] = [];
  for (let i = 1; i <= total; i++) {
    if (i <= 2 || i > total - 2 || Math.abs(i - page) <= 1) nums.push(i);
    else if (nums[nums.length - 1] !== "…") nums.push("…");
  }
  return (
    <nav className="fui-pagi" aria-label="分页">
      <button disabled={page <= 1} onClick={() => onChange(page - 1)}>‹</button>
      {nums.map((n, i) => n === "…"
        ? <span key={`e${i}`} className="dots">…</span>
        : <button key={n} aria-current={n === page || undefined}
            className={n === page ? "cur" : ""} onClick={() => onChange(n)}>{n}</button>)}
      <button disabled={page >= total} onClick={() => onChange(page + 1)}>›</button>
    </nav>
  );
}

/* ---------------- EmptyState / Skeleton ---------------- */
export function EmptyState({ icon, title, desc }: {
  icon?: React.ReactNode; title: string; desc?: string;
}) {
  return (
    <div className="fui-empty">
      <span className="ico">{icon ?? (
        <svg viewBox="0 0 32 32" width={34} height={34} aria-hidden>
          <rect x="5" y="7" width="22" height="18" rx="2.5" fill="none"
            stroke="currentColor" strokeWidth="1.6" opacity=".5" />
          <path d="M9 21l5.5-6 4 4.2L22 16l3 5" fill="none" stroke="currentColor"
            strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity=".5" />
        </svg>
      )}</span>
      <strong>{title}</strong>
      {desc && <p>{desc}</p>}
    </div>
  );
}

export function Skeleton({ lines = 3, rect = false }: { lines?: number; rect?: boolean }) {
  return (
    <div aria-hidden>
      {Array.from({ length: rect ? 1 : lines }).map((_, i) => (
        <div key={i} className={`fui-skeleton ${rect ? "rect" : "line"}`}
          style={rect ? undefined : { width: `${100 - (i % 3) * 12}%` }} />
      ))}
    </div>
  );
}

/* ---------------- Stepper（流程步骤：完成 / 当前 / 未到，键盘可达） ---------------- */
export function Stepper({ steps, current, onStepClick, className = "" }: {
  steps: { id: string; label: string; hint?: string }[];
  current: number;
  onStepClick?: (i: number) => void;
  className?: string;
}) {
  return (
    <nav className={`fui-stepper ${className}`} aria-label="步骤">
      {steps.map((st, i) => {
        const state = i < current ? "done" : i === current ? "cur" : "next";
        return (
          <button key={st.id} className={`fui-stepper__step is-${state}`}
            onClick={() => onStepClick?.(i)}
            aria-current={i === current ? "step" : undefined}
            disabled={!onStepClick}>
            <span className="fui-stepper__dot" aria-hidden>
              {state === "done" ? (
                <svg viewBox="0 0 12 12" width="10" height="10">
                  <path d="M2.4 6.3l2.4 2.4 4.8-5" fill="none" stroke="currentColor"
                    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : i + 1}
            </span>
            <span className="fui-stepper__body">
              <b>{st.label}</b>
              {st.hint && <i>{st.hint}</i>}
            </span>
            {i < steps.length - 1 && <span className="fui-stepper__line" aria-hidden />}
          </button>
        );
      })}
    </nav>
  );
}
