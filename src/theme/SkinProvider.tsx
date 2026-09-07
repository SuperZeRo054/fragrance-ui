import React, { createContext, useContext, useEffect } from "react";

export type SkinId = "fragrance" | "graphite";
export type Mode = "day" | "night";
export type FontId = "system" | "serif" | "mono" | "rounded" | "kaiti";

interface ThemeState { skin: SkinId; mode: Mode; font: FontId }
interface ThemeCtx extends ThemeState {
  setSkin: (s: SkinId) => void;
  setMode: (m: Mode) => void;
  setFont: (f: FontId) => void;
}

const Ctx = createContext<ThemeCtx>({
  skin: "fragrance", mode: "day", font: "system",
  setSkin: () => {}, setMode: () => {}, setFont: () => {},
});

/** 把皮肤/模式/字体写到 <html> 的 data 属性 —— CSS 变量整组换血的唯一入口 */
export function SkinProvider({
  children,
  defaultSkin = "fragrance",
  defaultMode = "day",
  defaultFont = "system",
  persistKey = "fragrance-ui",
}: {
  children: React.ReactNode;
  defaultSkin?: SkinId;
  defaultMode?: Mode;
  defaultFont?: FontId;
  persistKey?: string;
}) {
  const [state, setState] = React.useState<ThemeState>(() => {
    const base = { skin: defaultSkin, mode: defaultMode, font: defaultFont };
    try {
      const raw = localStorage.getItem(persistKey);
      if (raw) return { ...base, ...JSON.parse(raw) as ThemeState };
    } catch { /* ignore */ }
    return base;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-skin", state.skin);
    root.setAttribute("data-mode", state.mode);
    root.setAttribute("data-font", state.font);
    try { localStorage.setItem(persistKey, JSON.stringify(state)); } catch { /* ignore */ }
  }, [state]);

  return (
    <Ctx.Provider value={{
      ...state,
      setSkin: (skin) => setState((s) => ({ ...s, skin })),
      setMode: (mode) => setState((s) => ({ ...s, mode })),
      setFont: (font) => setState((s) => ({ ...s, font })),
    }}>
      {children}
    </Ctx.Provider>
  );
}

export const useTheme = () => useContext(Ctx);
