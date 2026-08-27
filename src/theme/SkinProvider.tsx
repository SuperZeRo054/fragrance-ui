import React, { createContext, useContext, useEffect } from "react";

export type SkinId = "musee" | "graphite";
export type Mode = "day" | "night";

interface ThemeState { skin: SkinId; mode: Mode }
interface ThemeCtx extends ThemeState {
  setSkin: (s: SkinId) => void;
  setMode: (m: Mode) => void;
}

const Ctx = createContext<ThemeCtx>({ skin: "musee", mode: "day", setSkin: () => {}, setMode: () => {} });

/** 把皮肤/模式写到 <html> 的 data 属性 —— CSS 变量整组换血的唯一入口 */
export function SkinProvider({
  children,
  defaultSkin = "musee",
  defaultMode = "day",
  persistKey = "mui-theme",
}: {
  children: React.ReactNode;
  defaultSkin?: SkinId;
  defaultMode?: Mode;
  persistKey?: string;
}) {
  const [state, setState] = React.useState<ThemeState>(() => {
    try {
      const raw = localStorage.getItem(persistKey);
      if (raw) return JSON.parse(raw) as ThemeState;
    } catch { /* ignore */ }
    return { skin: defaultSkin, mode: defaultMode };
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-skin", state.skin);
    root.setAttribute("data-mode", state.mode);
    try { localStorage.setItem(persistKey, JSON.stringify(state)); } catch { /* ignore */ }
  }, [state]);

  return (
    <Ctx.Provider value={{
      ...state,
      setSkin: (skin) => setState((s) => ({ ...s, skin })),
      setMode: (mode) => setState((s) => ({ ...s, mode })),
    }}>
      {children}
    </Ctx.Provider>
  );
}

export const useTheme = () => useContext(Ctx);
