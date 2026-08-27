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
    <div className="mui-backdrop open" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="mui-modal" style={{ maxWidth: width }} role="dialog" aria-modal="true">
        <button className="mui-modal__close" onClick={onClose} aria-label="关闭">×</button>
        {kicker && <p className="mui-kicker" style={{ fontSize: 10 }}>{kicker}</p>}
        {title && <h4 className="mui-modal__title">{title}</h4>}
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
      <h4 className="mui-modal__title" style={{ color: "var(--danger)" }}>{title}</h4>
      {body && <p>{body}</p>}
      <div className="mui-modal__actions">
        <button className="mui-btn mui-btn--outline mui-btn--sm" onClick={onCancel}>再想想</button>
        <button className="mui-btn mui-btn--danger mui-btn--sm"
          onClick={() => { onClose(); onCancel(); }}>{dangerText}</button>
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
      <div className="mui-toast-region" role="status" aria-live="polite">
        {items.map((t) => <div key={t.id} className="mui-toast">{t.msg}</div>)}
      </div>
    </ToastCtx.Provider>
  );
}

/* ---------------- Tooltip 定位提示已在 atoms；这里补 Lightbox ---------------- */
export function Lightbox({ src, alt = "", caption, open, onClose }: {
  src: string; alt?: string; caption?: string; open: boolean; onClose: () => void;
}) {
  return (
    <Modal open={open} onClose={onClose} width={760}>
      <img className="mui-lightbox__img" src={src} alt={alt} />
      {caption && <p className="mui-lightbox__cap">{caption}</p>}
    </Modal>
  );
}
