import { useTheme } from "./SkinProvider";

/** 双语文案层（DESIGN.md §4：Equal Authority, Different Rhythm）。
 *  Pair = [zh, en]。useT 返回按当前语言取词的函数。
 *  范围：结构层/编辑层文案（导航、区块标题、副题、铭牌、按钮）。
 *  深层内容（作品故事、实验笔记）按"中文为主 + 英文 metadata"保持中文。 */
export type Pair = [zh: string, en: string];

export function useT() {
  const { lang } = useTheme();
  return (p: Pair) => (lang === "en" ? p[1] : p[0]);
}
