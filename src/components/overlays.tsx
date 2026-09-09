import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import "./overlays.css";

/* ---------------- Modal（含 Confirm 组合模式） ---------------- */
export function Modal({ open, onClose, width = 520, kicker, title, children }: {
  open: boolean; onClose: () => void; width?: number;
  kicker?: string; title?: React.ReactNode; children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fui-backdrop open" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="fui-modal" style={{ maxWidth: width }} role="dialog" aria-modal="true">
        <button className="fui-modal__close" onClick={onClose} aria-label="关闭">×</button>
        {kicker && <p className="fui-kicker" style={{ fontSize: 10 }}>{kicker}</p>}
        {title && <h4 className="fui-modal__title">{title}</h4>}
        {children}
      </div>
    </div>
  );
}

export function ConfirmModal({ open, onClose, title, body, dangerText = "确认", onCancel }: {
  open: boolean; onClose: () => void; title: string; body?: string;
  dangerText?: string; onCancel: () => void;
}) {
  return (
    <Modal open={open} onClose={onClose} kicker="Confirm">
      <div className="fui-shake">
        <h4 className="fui-modal__title" style={{ color: "var(--danger)" }}>{title}</h4>
        {body && <p>{body}</p>}
      </div>
      <div className="fui-modal__actions">
        <button className="fui-btn fui-btn--outline fui-btn--sm" onClick={onCancel}>再想想</button>
        <button className="fui-btn fui-btn--danger fui-btn--sm"
          onClick={() => { onClose(); onCancel(); }}>{dangerText}</button>
      </div>
    </Modal>
  );
}

/* ---------------- ErrorModal：错误弹窗（入场震动 + 警示三角） ---------------- */
export function ErrorModal({ open, onClose, title, body, closeText = "知道了" }: {
  open: boolean; onClose: () => void; title: string; body?: string; closeText?: string;
}) {
  return (
    <Modal open={open} onClose={onClose} width={440}>
      <div className="fui-shake">
        <span className="fui-badge fui-badge--err" style={{ marginBottom: 12 }}>ERROR</span>
        <svg viewBox="0 0 24 24" width="34" height="34" style={{ display: "block", margin: "10px 0 4px" }} aria-hidden>
          <path d="M12 2.8L22.6 21H1.4L12 2.8z" fill="none" stroke="var(--danger)" strokeWidth="1.8" strokeLinejoin="round"/>
          <rect x="11.1" y="9" width="1.8" height="6.2" rx=".9" fill="var(--danger)"/>
          <circle cx="12" cy="17.6" r="1.15" fill="var(--danger)"/>
        </svg>
        <h4 className="fui-modal__title" style={{ color: "var(--danger)" }}>{title}</h4>
        {body && <p>{body}</p>}
      </div>
      <div className="fui-modal__actions">
        <button className="fui-btn fui-btn--danger fui-btn--sm" onClick={onClose}>{closeText}</button>
      </div>
    </Modal>
  );
}

/* ---------------- Toast ---------------- */
interface ToastItem { id: number; msg: string }
const ToastCtx = createContext<(msg: string) => void>(() => {});
export const useToast = () => useContext(ToastCtx);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const seq = useRef(0);
  const show = useCallback((msg: string) => {
    const id = ++seq.current;
    setItems((s) => [...s, { id, msg }]);
    setTimeout(() => setItems((s) => s.filter((t) => t.id !== id)), 2400);
  }, []);
  return (
    <ToastCtx.Provider value={show}>
      {children}
      <div className="fui-toast-region" role="status" aria-live="polite">
        {items.map((t) => <div key={t.id} className="fui-toast">{t.msg}</div>)}
      </div>
    </ToastCtx.Provider>
  );
}

/* ---------------- Drawer（侧滑面板：同 Modal 的覆盖层语义，Medium Surface 物理） ---------------- */
export function Drawer({ open, onClose, side = "right", width = 420, kicker, title, children, footer }: {
  open: boolean; onClose: () => void; side?: "left" | "right";
  width?: number; kicker?: string; title?: React.ReactNode;
  children: React.ReactNode; footer?: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fui-backdrop open" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <aside className={`fui-drawer fui-drawer--${side}`} style={{ width }} role="dialog" aria-modal="true">
        <header className="fui-drawer__head">
          <div>
            {kicker && <p className="fui-kicker" style={{ fontSize: 10 }}>{kicker}</p>}
            {title && <h4 className="fui-modal__title" style={{ margin: 0 }}>{title}</h4>}
          </div>
          <button className="fui-drawer__close" onClick={onClose} aria-label="关闭">
            <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden>
              <path d="M3 3l10 10M13 3L3 13" fill="none" stroke="currentColor"
                strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </header>
        <div className="fui-drawer__body">{children}</div>
        {footer && <footer className="fui-drawer__foot">{footer}</footer>}
      </aside>
    </div>
  );
}

/* ---------------- Tooltip 定位提示已在 atoms；这里补 Lightbox ---------------- */
export function Lightbox({ src, alt = "", caption, open, onClose }: {
  src: string; alt?: string; caption?: string; open: boolean; onClose: () => void;
}) {
  return (
    <Modal open={open} onClose={onClose} width={760}>
      <img className="fui-lightbox__img" src={src} alt={alt} />
      {caption && <p className="fui-lightbox__cap">{caption}</p>}
    </Modal>
  );
}
