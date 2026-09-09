import React, { createContext, useContext, useEffect } from "react";

export type SkinId = "fragrance" | "graphite";
export type Mode = "day" | "night";
export type FontId = "system" | "serif" | "mono" | "rounded" | "kaiti";
export type Lang = "zh" | "en";

interface ThemeState { skin: SkinId; mode: Mode; font: FontId; lang: Lang }
interface ThemeCtx extends ThemeState {
  setSkin: (s: SkinId) => void;
  setMode: (m: Mode) => void;
  setFont: (f: FontId) => void;
  setLang: (l: Lang) => void;
}

const Ctx = createContext<ThemeCtx>({
  skin: "fragrance", mode: "day", font: "system", lang: "zh",
  setSkin: () => {}, setMode: () => {}, setFont: () => {}, setLang: () => {},
});

/** 把皮肤/模式/字体写到 <html> 的 data 属性 —— CSS 变量整组换血的唯一入口 */
export function SkinProvider({
  children,
  defaultSkin = "fragrance",
  defaultMode = "day",
  defaultFont = "system",
  defaultLang = "zh",
  persistKey = "fragrance-ui",
}: {
  children: React.ReactNode;
  defaultSkin?: SkinId;
  defaultMode?: Mode;
  defaultFont?: FontId;
  defaultLang?: Lang;
  persistKey?: string;
}) {
  const [state, setState] = React.useState<ThemeState>(() => {
    const base = { skin: defaultSkin, mode: defaultMode, font: defaultFont, lang: defaultLang };
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
    root.setAttribute("data-lang", state.lang);
    try { localStorage.setItem(persistKey, JSON.stringify(state)); } catch { /* ignore */ }
  }, [state]);

  return (
    <Ctx.Provider value={{
      ...state,
      setSkin: (skin) => setState((s) => ({ ...s, skin })),
      setMode: (mode) => setState((s) => ({ ...s, mode })),
      setFont: (font) => setState((s) => ({ ...s, font })),
    setLang: (lang) => setState((s) => ({ ...s, lang })),
    }}>
      {children}
    </Ctx.Provider>
  );
}

export const useTheme = () => useContext(Ctx);
