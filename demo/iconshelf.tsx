import React, { useState } from "react";
import {
  SectionHead, Reveal, ChipGroup, CatMark, Star,
  Cat, PawPrint, MoonStars, Sun, Palette, PaintBrush,
  MagnifyingGlass, Plus, X, CaretDown, CaretRight, CheckCircle, WarningCircle,
  Info, Question, DotsThree, Gear, List,
  PencilSimple, Notebook, Article, Image, Camera, TagSimple, FolderOpen,
  Clock, CalendarBlank, Eye,
  User, Users, ChatCircle, EnvelopeSimple, Heart, BookmarkSimple, ShareNetwork,
  LinkSimple, DownloadSimple,
  Sparkle, Robot, Cpu, TerminalWindow, Waveform, PaperPlaneRight, CircleNotch,
  ArrowRight,
  Bell, House, Trash,
  PaperPlaneRight as SendIc, ArrowRight as ArrowIc,
  type IconWeight, type Icon,
} from "../src";
import { SectionHost } from "./host";
import { COMPARE_SETS, GLYPH_KEYS } from "./iconcompare-data";
import { REMOTE_GLYPHS, REMOTE_SET_SPECS, type RemoteSet } from "./iconsets-data";

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
      <SectionHost host="qianqian" line="45 枚精选归我管，六档字重、六家笔迹，随你挑。" />
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

      <IconWardrobe />
    </section>
  );
}


/* ================= SET · 一套图标换整块界面 ================= */
type WardSet = "phosphor" | RemoteSet;
type WardName = "search" | "heart" | "settings" | "send" | "calendar" | "star"
  | "user" | "bell" | "home" | "folder" | "camera" | "chat" | "download"
  | "trash" | "plus" | "arrow" | "eye" | "image" | "pencil";

const PH: Record<string, IconComp> = {
  search: MagnifyingGlass, heart: Heart, settings: Gear, send: SendIc,
  calendar: CalendarBlank, star: Star, user: User, bell: Bell, home: House,
  folder: FolderOpen, camera: Camera, chat: ChatCircle, download: DownloadSimple,
  trash: Trash, plus: Plus, arrow: ArrowIc, eye: Eye, image: Image, pencil: PencilSimple,
};

function WardIcon({ name, set, size = 17 }: { name: WardName; set: WardSet; size?: number }) {
  if (set === "phosphor") {
    const Ic = PH[name];
    return <Ic size={size} weight="light" />;
  }
  const it = REMOTE_GLYPHS[name]?.[set as RemoteSet];
  if (!it) return <span style={{ width: size, height: size }} />;
  return <svg viewBox={it.vb} width={size} height={size} {...it.at}
    dangerouslySetInnerHTML={{ __html: it.body }} />;
}

export function IconWardrobe() {
  const [set, setSet] = useState<WardSet>("phosphor");
  return (
    <Reveal delay={180}>
      <div className="lab-card" style={{ marginTop: 22 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
          <span className="cap">SET · 一套图标，换整块界面</span>
          <ChipGroup
            items={[{ id: "phosphor", label: "Phosphor" },
              ...REMOTE_SET_SPECS.map((s) => ({ id: s.id as string, label: s.label }))]}
            value={set} onChange={(v) => setSet(v as WardSet)} />
        </div>
        <div className="mini-app mui-glass">
          <div className="mini-app__bar">
            <WardIcon name="home" set={set} size={18} />
            <b>馆长工作台</b>
            <span style={{ flex: 1 }} />
            <span className="mini-app__bell">
              <WardIcon name="bell" set={set} size={17} /><i />
            </span>
            <span className="mini-app__me"><CatMark tone="cream" size={15} /></span>
          </div>
          <div className="mini-app__search">
            <WardIcon name="search" set={set} size={15} />
            <span>搜 312 件馆藏…</span>
          </div>
          <div className="mini-app__rows">
            <div className="mini-app__row">
              <span className="mini-app__ic"><WardIcon name="image" set={set} /></span>
              <span className="mini-app__tt"><b>睡莲中的猫</b><i>FRG·IMP-01 · 印象派</i></span>
              <em>在展</em>
            </div>
            <div className="mini-app__row">
              <span className="mini-app__ic"><WardIcon name="pencil" set={set} /></span>
              <span className="mini-app__tt"><b>展讯 prompt 草稿</b><i>改于两小时前</i></span>
              <em>草稿</em>
            </div>
            <div className="mini-app__row">
              <span className="mini-app__ic"><WardIcon name="calendar" set={set} /></span>
              <span className="mini-app__tt"><b>十月特展排期</b><i>3 位借展方待确认</i></span>
              <em>临近</em>
            </div>
          </div>
          <div className="mini-app__stats">
            <span><WardIcon name="eye" set={set} size={15} /> 1,284 浏览</span>
            <span><WardIcon name="heart" set={set} size={15} /> 236 收藏</span>
            <span><WardIcon name="star" set={set} size={15} /> 4.9 评分</span>
          </div>
          <div className="mini-app__actions">
            <span className="mini-btn pri"><WardIcon name="plus" set={set} size={14} /> 新增展品</span>
            <span className="mini-btn"><WardIcon name="arrow" set={set} size={14} /> 分享</span>
            <span className="mini-btn danger" title="删除"><WardIcon name="trash" set={set} size={14} /></span>
          </div>
        </div>
        <p className="lab-note">
          切一套，顶栏、搜索、列表、统计、按钮整套跟着换。网格和圆头不一样，整块界面长出来的气质就不一样；这也是为什么 icon 要一开始就选对家族，而不是后期逐枚混搭。
        </p>
      </div>
    </Reveal>
  );
}
