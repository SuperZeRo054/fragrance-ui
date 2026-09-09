import React, { useEffect, useMemo, useRef, useState } from "react";
import "./command-palette.css";

export interface CommandItem {
  id: string;
  label: string;
  hint?: string;
  group?: string;
  icon?: React.ReactNode;
}

/** CORE · CommandPalette —— 指令面板（⌘K 语义）。
 *  键盘：↑↓ 移动、Enter 执行、Esc 关闭；输入即过滤。
 *  Design Intent：让键盘用户与 Agent 都能一条路径触达所有动作。 */
export function CommandPalette({ open, onClose, items, placeholder = "输入命令或搜索…", onSelect }: {
  open: boolean; onClose: () => void; items: CommandItem[]; placeholder?: string;
  onSelect: (id: string) => void;
}) {
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const list = useMemo(() => {
    const k = q.trim().toLowerCase();
    if (!k) return items;
    return items.filter((i) =>
      `${i.label} ${i.hint ?? ""} ${i.group ?? ""}`.toLowerCase().includes(k));
  }, [q, items]);

  useEffect(() => { if (open) { setQ(""); setIdx(0); } }, [open]);
  useEffect(() => { setIdx(0); }, [q]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); onClose(); }
      else if (e.key === "ArrowDown") { e.preventDefault(); setIdx((i) => Math.min(list.length - 1, i + 1)); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setIdx((i) => Math.max(0, i - 1)); }
      else if (e.key === "Enter" && list[idx]) { e.preventDefault(); onSelect(list[idx].id); onClose(); }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, list, idx, onSelect, onClose]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(".fui-cmd__item.on")?.scrollIntoView({ block: "nearest" });
  }, [idx]);

  if (!open) return null;

  return (
    <div className="fui-backdrop open" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="fui-cmd" role="dialog" aria-modal="true" aria-label="指令面板">
        <div className="fui-cmd__field">
          <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden>
            <circle cx="7" cy="7" r="4.4" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10.4 10.4L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input autoFocus value={q} placeholder={placeholder}
            onChange={(e) => setQ(e.target.value)}
            aria-controls="fui-cmd-list" aria-expanded="true" role="combobox" />
          <kbd>ESC</kbd>
        </div>
        <div className="fui-cmd__list" id="fui-cmd-list" role="listbox" ref={listRef}>
          {list.length === 0 && <p className="fui-cmd__empty">没有匹配的命令</p>}
          {list.map((it, i) => (
            <button key={it.id} role="option" aria-selected={i === idx}
              className={`fui-cmd__item${i === idx ? " on" : ""}`}
              onMouseEnter={() => setIdx(i)}
              onClick={() => { onSelect(it.id); onClose(); }}>
              {it.icon && <span className="fui-cmd__icon">{it.icon}</span>}
              <span className="fui-cmd__label">{it.label}</span>
              {it.hint && <span className="fui-cmd__hint">{it.hint}</span>}
              {it.group && <span className="fui-cmd__group">{it.group}</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
