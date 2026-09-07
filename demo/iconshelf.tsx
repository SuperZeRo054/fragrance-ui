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
  type IconWeight, type Icon,
} from "../src";

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
            默认 light 字重正好压住银色细线；导航、关闭这类实-高频位可以升 regular，强调位换 duotone 让 accent 从双层里透出来。
          </p>
        </div>
      </Reveal>
    </section>
  );
}
