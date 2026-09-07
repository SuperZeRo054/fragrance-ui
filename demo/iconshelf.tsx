import React, { useState } from "react";
import {
  SectionHead, Reveal, ChipGroup,
  Cat, PawPrint, MoonStars, Sun, Palette, PaintBrush,
  MagnifyingGlass, Plus, X, CaretDown, CaretRight, CheckCircle, WarningCircle,
  Info, Question, DotsThree, Gear, List,
  PencilSimple, Notebook, Article, Image, Camera, TagSimple, FolderOpen,
  Clock, CalendarBlank, Eye,
  User, Users, ChatCircle, EnvelopeSimple, Heart, BookmarkSimple, ShareNetwork,
  LinkSimple, DownloadSimple,
  Sparkle, Robot, Cpu, TerminalWindow, Waveform, PaperPlaneRight, CircleNotch,
  ArrowRight,
  Star,
  type IconWeight, type Icon,
} from "../src";
import { COMPARE_SETS, GLYPH_KEYS } from "./iconcompare-data";

type IconComp = Icon;

const SHELF: [IconComp, string][] = [
  [Cat, "cat"], [PawPrint, "paw-print"], [MoonStars, "moon-stars"], [Sun, "sun"],
  [Palette, "palette"], [PaintBrush, "paint-brush"],
  [MagnifyingGlass, "magnifying-glass"], [Plus, "plus"], [X, "x"],
  [CaretDown, "caret-down"], [CaretRight, "caret-right"], [CheckCircle, "check-circle"],
  [WarningCircle, "warning-circle"], [Info, "info"], [Question, "question"],
  [DotsThree, "dots-three"], [Gear, "gear"], [List, "list"],
  [PencilSimple, "pencil-simple"], [Notebook, "notebook"], [Article, "article"],
  [Image, "image"], [Camera, "camera"], [TagSimple, "tag-simple"],
  [FolderOpen, "folder-open"], [Clock, "clock"], [CalendarBlank, "calendar"],
  [Eye, "eye"],
  [User, "user"], [Users, "users"], [ChatCircle, "chat-circle"],
  [EnvelopeSimple, "envelope"], [Heart, "heart"], [BookmarkSimple, "bookmark"],
  [ShareNetwork, "share-network"], [LinkSimple, "link"], [DownloadSimple, "download"],
  [Sparkle, "sparkle"], [Robot, "robot"], [Cpu, "cpu"],
  [TerminalWindow, "terminal"], [Waveform, "waveform"], [PaperPlaneRight, "paper-plane"],
  [CircleNotch, "circle-notch"], [ArrowRight, "arrow-right"],
];

const WEIGHTS: { id: string; label: IconWeight }[] = [
  { id: "thin", label: "thin" }, { id: "light", label: "light" },
  { id: "regular", label: "regular" }, { id: "bold", label: "bold" },
  { id: "fill", label: "fill" }, { id: "duotone", label: "duotone" },
];

/* 11 · Icons：Phosphor 精选货架 */
export function IconShelf() {
  const [w, setW] = useState<IconWeight>("light");
  return (
    <section id="icon-lab">
      <SectionHead kicker="11 · Icons" title="图标精选货架"
        sub="取自 Phosphor（MIT）：细线圆头，跟整套库一条笔路。currentColor 上色，随皮肤昼夜自动换装。" />
      <Reveal>
        <div className="lab-card">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
            <span className="cap">WEIGHT</span>
            <ChipGroup items={WEIGHTS} value={w} onChange={(v) => setW(v as IconWeight)} />
            <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--text-dim)" }}>
              {SHELF.length} 枚 · currentColor · 按需打包
            </span>
          </div>
          <div className="icon-shelf">
            {SHELF.map(([Ic, label]) => (
              <div className="icon-cell" key={label} title={`ph-${label}`}>
                <Ic size={26} weight={w} />
                <span>{label}</span>
              </div>
            ))}
          </div>
          <p className="lab-note">
            默认 light 字重正好压住银色细线；导航、关闭这类高频位可以升 regular，强调位换 duotone 让 accent 从双层里透出来。
          </p>
        </div>
      </Reveal>

      {/* 找形对比：同一个词，六家笔迹 */}
      <Reveal delay={120}>
        <div className="lab-card" style={{ marginTop: 22 }}>
          <span className="cap">FIND-FORM · 同一个词，六家笔迹</span>
          <div className="icon-compare">
            <div className="cmp-row cmp-headrow">
              <div className="cmp-set" />
              {GLYPH_KEYS.map((g) => <div className="cmp-cell cmp-gname" key={g}>{g}</div>)}
            </div>
            <div className="cmp-row">
              <div className="cmp-set"><b>Phosphor</b><span>MIT · 6 档字重 · 本库主力</span></div>
              {([MagnifyingGlass, Heart, Gear, PaperPlaneRight, CalendarBlank, Star]).map((Ic, i) => (
                <div className="cmp-cell" key={i}><Ic size={26} weight="light" /></div>
              ))}
            </div>
            {COMPARE_SETS.map((cs) => (
              <div className="cmp-row" key={cs.set}>
                <div className="cmp-set"><b>{cs.set}</b><span>{cs.spec}</span></div>
                {GLYPH_KEYS.map((g) => {
                  const it = cs.glyphs[g];
                  return (
                    <div className="cmp-cell" key={g}>
                      <svg viewBox={it.vb} width={26} height={26} {...it.at}
                        dangerouslySetInnerHTML={{ __html: it.body }} />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          <p className="lab-note">
            同一个词摆在一起看笔迹：Phosphor、Lucide、Tabler 是同一条几何细线路，混搭不违和，Tabler 胜在量大；Iconoir 最轻，1.5px 压得住银底；Heroicons 更敦实保守；Remix 是填充式线版，棱角偏方，点缀可以，整套换会伤风格。
          </p>
        </div>
      </Reveal>
    </section>
  );
}
