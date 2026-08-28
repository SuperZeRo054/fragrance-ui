import React, { useState } from "react";
import { CatMark } from "./atoms";
import "./content.css";

/* ---------------- Card ---------------- */
export function Card({ media, kicker, title, subtitle, footer, onClick, interactive = true }: {
  media?: React.ReactNode; kicker?: React.ReactNode; title: string;
  subtitle?: string; footer?: React.ReactNode; onClick?: () => void; interactive?: boolean;
}) {
  return (
    <article className={`mui-card${interactive ? " mui-card--hot" : ""}`}
      onClick={onClick} tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === "Enter" && onClick() : undefined}>
      {media && <div className="mui-card__media">{media}</div>}
      <div className="mui-card__meta">
        {kicker && <div className="mui-card__era">{kicker}</div>}
        <h4>{title}</h4>
        {subtitle && <p className="mui-card__sub">{subtitle}</p>}
        {footer && <div className="mui-card__foot">{footer}</div>}
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
    <div className="mui-tablewrap">
      <table className="mui-table">
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
        <div className="mui-tabs mui-tabs--steps" role="tablist">
          {items.map((it, i) => (
            <React.Fragment key={it.id}>
              {i > 0 && <i className={`mui-step-line${i <= activeIdx ? " done" : ""}`} aria-hidden />}
              <button role="tab" aria-selected={active === it.id}
                className={`mui-step${active === it.id ? " active" : ""}${i < activeIdx ? " done" : ""}`}
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
          <div key={it.id} role="tabpanel" className="mui-tabpanel">{it.content}</div>))}
      </div>
    );
  }
  return (
    <div>
      <div className="mui-tabs" role="tablist">
        {items.map((it) => (
          <button key={it.id} role="tab" aria-selected={active === it.id}
            className={`mui-tab${active === it.id ? " active" : ""}`} onClick={() => setActive(it.id)}>
            {it.label}
          </button>))}
      </div>
      {items.map((it) => active === it.id && (
        <div key={it.id} role="tabpanel" className="mui-tabpanel">{it.content}</div>))}
    </div>
  );
}

/* ---------------- Accordion（单开） ---------------- */
export function Accordion({ items, defaultOpen = -1 }: {
  items: { q: React.ReactNode; a: React.ReactNode }[]; defaultOpen?: number;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mui-acc">
      {items.map((it, i) => (
        <details key={i} open={open === i} onToggle={(e) =>
          (e.target as HTMLDetailsElement).open && setOpen(i)}>
          <summary>{it.q}<span className="plus">＋</span></summary>
          <div className="mui-acc__body">{it.a}</div>
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
    <nav className="mui-pagi" aria-label="分页">
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
    <div className="mui-empty">
      <span className="ico">{icon ?? <CatMark tone="blue" size={38} />}</span>
      <strong>{title}</strong>
      {desc && <p>{desc}</p>}
    </div>
  );
}

export function Skeleton({ lines = 3, rect = false }: { lines?: number; rect?: boolean }) {
  return (
    <div aria-hidden>
      {Array.from({ length: rect ? 1 : lines }).map((_, i) => (
        <div key={i} className={`mui-skeleton ${rect ? "rect" : "line"}`}
          style={rect ? undefined : { width: `${100 - (i % 3) * 12}%` }} />
      ))}
    </div>
  );
}
