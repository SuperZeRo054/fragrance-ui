import React, { Suspense, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  SkinProvider, useTheme, ToastProvider, useToast,
  Reveal, Button, Badge, Kicker, SectionHead, ChipGroup, Rating, Avatar, Tooltip,
  CatMark, CatFull, catLoafGroup,
  TextField, SelectField, Switch, Checkbox, RadioGroup, RangeField,
  Modal, ConfirmModal, ErrorModal, Lightbox, Drawer, CommandPalette,
  Stepper, type CommandItem,
  Card, Table, Tabs, Accordion, Pagination, EmptyState, Skeleton, SharedLightbox, Prose,
  PageTransition, viewNavigate, Spinner, Progress, CountUp, LazyImage,
  House, Atom, Textbox, FrameCorners, Cards, Swap, Cube, SquaresFour, List,
  CircleNotch, Sparkle, Robot, Waveform, HScroll, Star, MoonStars,
  type SkinId, type FontId, type Icon, type Lang,
  CatCharacter, useT, type Pair,
} from "../src";
import { SectionHost } from "./host";
import { GoldenHome } from "../golden/home/page";
import { GoldenProject } from "../golden/project/page";
import { GoldenGallery } from "../golden/gallery/page";
import { GoldenArticle } from "../golden/article/page";
import { MotionLab } from "./motionlab";
import { ModernEffects, ThreeLab } from "./modernlab";
import { AgentLab } from "./agentlab";
import { ArtHero } from "./arthero";

/* icon 货架动态分包：45 枚 Phosphor 连字重 defs 不进主包 */
const IconShelf = React.lazy(() => import("./iconshelf").then((m) => ({ default: m.IconShelf })));
import catCream from "./gallery/frg-portrait-cream.jpg";
import catBlue from "./gallery/frg-portrait-blue.jpg";
import frgWave from "./gallery/frg-greatwave.jpg";
import frgWaterlilies from "./gallery/frg-waterlilies.jpg";
import frgStarry from "./gallery/frg-starrynight.jpg";
import frgPearl from "./gallery/frg-pearlearring.jpg";
import frgAthens from "./gallery/frg-athens.jpg";
import frgSill from "./gallery/frg-windowsill.jpg";

/* ---------- 换肤控制台：引擎的活体证明 ---------- */
const FONT_LABELS: [FontId, string][] = [
  ["system", "系统"], ["serif", "衬线"], ["mono", "等宽"], ["rounded", "圆体"], ["kaiti", "楷体"],
];
function ThemeConsole() {
  const { skin, mode, font, lang, setSkin, setMode, setFont, setLang } = useTheme();
  return (
    <div className="console">
      <span className="cap">SKIN</span>
      {( ["fragrance", "graphite"] as SkinId[] ).map((s) => (
        <button key={s} className={skin === s ? "on" : ""}
          onClick={() => setSkin(s)}>{s}</button>
      ))}
      <i />
      <span className="cap">FONT</span>
      <select className="font-select" value={font} aria-label="字体包"
        onChange={(e) => setFont(e.target.value as FontId)}>
        {FONT_LABELS.map(([id, label]) => <option key={id} value={id}>{label}</option>)}
      </select>
      <i />
      <span className="cap">MODE</span>
      <button onClick={() => setMode(mode === "day" ? "night" : "day")}>
        {mode === "day" ? "夜间" : "日间"}
      </button>
      <i />
      <span className="cap">LANG</span>
      {(["zh", "en"] as Lang[]).map((l) => (
        <button key={l} className={lang === l ? "on" : ""} onClick={() => setLang(l)}>
          {l === "zh" ? "中文" : "EN"}
        </button>
      ))}
    </div>
  );
}


/* ---------- 滚动进度引导线 ---------- */
function ScrollGuide() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current!; let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        el.style.width = `${((h.scrollTop / (h.scrollHeight - h.clientHeight || 1)) * 100).toFixed(2)}%`;
      });
    };
    on();
    addEventListener("scroll", on, { passive: true });
    return () => { removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, []);
  return <div className="scroll-guide" ref={ref} aria-hidden />;
}

/* ---------- 悬停展开的导航舱：icon + 区块，点了平滑跳 ---------- */
const SECTIONS: { id: string; label: Pair; icon: Icon }[] = [
  { id: "top", label: ["首页", "Home"], icon: House },
  { id: "atoms", label: ["原子件", "Atoms"], icon: Atom },
  { id: "forms", label: ["表单", "Forms"], icon: Textbox },
  { id: "overlays", label: ["覆盖层", "Overlays"], icon: FrameCorners },
  { id: "gallery", label: ["内容展示", "Content"], icon: Cards },
  { id: "route-lab", label: ["页面切换", "Transitions"], icon: Swap },
  { id: "loading-lab", label: ["加载", "Loading"], icon: CircleNotch },
  { id: "effects-lab", label: ["现代特效", "Effects"], icon: Sparkle },
  { id: "three-lab", label: ["三维粒子", "3D & Particles"], icon: Cube },
  { id: "agent-lab", label: ["Agent", "Agent"], icon: Robot },
  { id: "icon-lab", label: ["图标", "Icons"], icon: SquaresFour },
  { id: "motion-lab", label: ["动效实验室", "Motion Lab"], icon: Waveform },
  { id: "golden/home", label: ["金样本首页", "Golden Home"], icon: Star },
];

function NavDock() {
  const [open, setOpen] = useState(false);
  const t = useT();
  const timer = useRef<number>(0);
  const enter = () => { window.clearTimeout(timer.current); setOpen(true); };
  const leave = () => { timer.current = window.setTimeout(() => setOpen(false), 220); };
  return (
    <div className="navdock" onMouseEnter={enter} onMouseLeave={leave}>
      <button className="navdock__btn" aria-label="站内导航" aria-expanded={open}
        onClick={() => setOpen((v) => !v)}>
        <List size={18} weight="light" />
      </button>
      <nav className={`navdock__panel${open ? " on" : ""}`} aria-hidden={!open}>
        {SECTIONS.map(({ id, label, icon: Ic }) => (
          <a key={id} className="navdock__item" href={`#${id}`} tabIndex={open ? 0 : -1}
            onClick={(e) => {
              e.preventDefault();
              window.clearTimeout(timer.current);
              setOpen(false);
              if (id.startsWith("golden/")) { location.hash = `#${id}`; return; }
              document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
              history.replaceState(null, "", `#${id}`);
            }}>
            <Ic size={17} weight="light" />
            <span>{t(label)}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}

/* ---------- 各分类展示块 ---------- */
function Atoms() {
  const toast = useToast();
  const t = useT();
  const [era, setEra] = useState("all");
  return (
    <section id="atoms">
      <SectionHead kicker="01 · Atoms" title={t(["原子件", "Atoms"])} sub={t(["按钮 / 徽章 / 标签组 / 稀有度 / 头像 / 提示词。", "Buttons / badges / chip groups / ratings / avatars / tooltips."])} />
      <SectionHost host="qianqian" />
      <Reveal>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 18, marginTop: 40 }}>
          <Button>主要操作</Button>
          <Button variant="outline">描边次级</Button>
          <Button variant="ghost">软底款</Button>
          <Button variant="outline">毛玻璃款</Button>
          <Button variant="danger">危险</Button>
          <Button size="sm" loading>Loading</Button>
          <Button variant="outline" size="sm" disabled>禁用</Button>
        </div>
      </Reveal>
      <Reveal delay={120}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 14, marginTop: 60 }}>
          <Badge tone="gold">精选</Badge><Badge tone="ok">已发布</Badge><Badge tone="info">文档中</Badge>
          <Badge tone="warn">重构中</Badge><Badge tone="err">禁止删除</Badge>
          <span style={{ display: "inline-flex", gap: 20, marginLeft: 24 }}>
            <Rating value={4} size={18} /><Rating value={5} size={18} /><Rating value={2} size={18} />
          </span>
        </div>
      </Reveal>
      <Reveal delay={200}>
        <div style={{ display: "flex", gap: 32, alignItems: "center", margin: "60px 0 10px", flexWrap: "wrap" }}>
          <ChipGroup items={[{ id: "all", label: "全部" }, { id: "imp", label: "印象派" },
            { id: "uki", label: "浮世绘" }, { id: "mod", label: "现代" }]}
            value={era} onChange={setEra} />
          <Avatar><CatMark tone="cream" size={54} /></Avatar>
          <Avatar shape="rounded" size={64}><CatMark tone="blue" size={38} /></Avatar>
          <Tooltip tip="我是 Tooltip，悬停或聚焦可见">
            <span style={{ border: "1px solid var(--line)", borderRadius: 999,
              padding: "7px 16px", fontSize: 12.5, color: "var(--text-dim)", cursor: "help" }}>
              悬停这枚词
            </span>
          </Tooltip>
          <Button variant="outline" size="sm" onClick={() => toast("轻提示已送达")}>触发 Toast</Button>
        </div>
      </Reveal>
    </section>
  );
}

function Forms() {
  const toast = useToast();
  const t = useT();
  const [mail, setMail] = useState("moo@moo");
  const [mailShake, setMailShake] = useState(0);
  const [sw, setSw] = useState(true);
  const [ck, setCk] = useState(true);
  const [rd, setRd] = useState("day");
  const [rng, setRng] = useState(64);
  return (
    <section id="forms">
      <SectionHead kicker="02 · Forms" title={t(["表单控件全套", "Forms"])} sub={t(["含校验错误与成功反馈态、开关、单选复选与滑块。", "Validation, error & success feedback, switches, radios and sliders."])} />
      <SectionHost host="qianqian" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 20, marginTop: 30 }}>
        <Reveal><TextField label="访客姓名" placeholder="可匿名观展"
          hint="可以留空，匿名观展" state="success" /></Reveal>
        <Reveal delay={80} key={mailShake}><TextField label="邮箱" value={mail} onChange={(e) => setMail(e.target.value)}
          hint="这不是一个合法的邮箱" state="error" /></Reveal>
        <Reveal delay={160}><SelectField label="最想参观的年代"
          options={["印象派 · 睡莲池畔", "浮世绘 · 冲浪现场", "史前 · 洞窟涂鸦区"]} /></Reveal>
      </div>
      <Reveal delay={240}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 26, marginTop: 28, alignItems: "center" }}>
          <Switch checked={sw} onChange={setSw} label="接收版本周报" />
          <Checkbox checked={ck} onChange={setCk} label="同意馆规" />
          <RadioGroup name="session" options={[{ value: "day", label: "日场" }, { value: "night", label: "夜场" }]}
            value={rd} onChange={setRd} />
          <RangeField value={rng} suffix="%" onChange={setRng} />
          <Button variant="primary" size="sm" onClick={() => {
            if (!mail.includes("@")) { setMailShake((k) => k + 1); toast("邮箱格式不正确"); }
            else toast("登记成功，见字如面");
          }}>提交登记</Button>
        </div>
      </Reveal>
    </section>
  );
}

function Overlays() {
  const t = useT();
  const [modal, setModal] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [err, setErr] = useState(false);
  const [lb, setLb] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [cmd, setCmd] = useState(false);
  const [lastCmd, setLastCmd] = useState("");
  const CMDS: CommandItem[] = [
    { id: "home", label: "跳到首页", hint: "Home", group: "导航", icon: <House size={15} weight="light" /> },
    { id: "atoms", label: "跳到原子件", hint: "Atoms", group: "导航", icon: <Atom size={15} weight="light" /> },
    { id: "gallery", label: "跳到内容展示", hint: "Content", group: "导航", icon: <Cards size={15} weight="light" /> },
    { id: "agent", label: "跳到 Agent 实验室", hint: "Agent", group: "导航", icon: <Robot size={15} weight="light" /> },
    { id: "golden", label: "打开金样本首页", hint: "Golden", group: "路由", icon: <Star size={15} weight="light" /> },
    { id: "theme", label: "切换昼夜", hint: "Theme", group: "设置", icon: <MoonStars size={15} weight="light" /> },
  ];
  return (
    <section id="overlays">
      <SectionHead kicker="03 · Overlays" title={t(["覆盖层系统", "Overlays"])}
        sub="Modal / Confirm / Error（入场震动）/ Lightbox / Toast · Esc 与遮罩点击均可关闭。" />
      <SectionHost host="qianqian" />
      <Reveal>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 30 }}>
          <Button onClick={() => setModal(true)}>打开 Modal</Button>
          <Button variant="danger" onClick={() => setConfirm(true)}>打开 Confirm</Button>
          <Button variant="outline" onClick={() => setErr(true)}>打开报错弹窗</Button>
          <Button variant="outline" onClick={() => setLb(true)}>打开 Lightbox</Button>
          <Button variant="outline" onClick={() => setDrawer(true)}>打开 Drawer</Button>
          <Button variant="ghost" onClick={() => setCmd(true)}>打开指令面板 ⌘K</Button>
          {lastCmd && <span style={{ fontSize: 12, color: "var(--text-dim)" }}>上次执行：{lastCmd}</span>}
        </div>
      </Reveal>
      <Modal open={modal} onClose={() => setModal(false)} kicker="Reservation" title="预约组件演示">
        <p>两位猫吉祥物全程旁听：万万负责踩键盘，千千负责凝视。全程禁止提问「它们为什么不理你」。</p>
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 22 }}>
          <Button sm onClick={() => setModal(false)}>好的，到时见</Button>
        </div>
      </Modal>
      <ConfirmModal open={confirm} onClose={() => setConfirm(false)} onCancel={() => {}}
        title="清空收藏夹？" body="此操作不可撤销：你收藏的全部样品将被移除并叼给隔壁的狗。"
        dangerText="确认清空" />
      <ErrorModal open={err} onClose={() => setErr(false)}
        title="网络波动，猫主子暂时失联" body="请求超时（ETIMEDOUT）。请检查网络后重试；若持续失败，主子可能只是在假装没看见。" />
      {/* 用一段内联 SVG 当 lightbox 的演示图 —— 零位图传统 */}
      <Drawer open={drawer} onClose={() => setDrawer(false)} kicker="Drawer" title="侧滑面板"
        footer={<Button size="sm" onClick={() => setDrawer(false)}>完成</Button>}>
        <p style={{ margin: 0 }}>侧滑面板用与 Modal 同一套覆盖层语义：Esc 关闭、遮罩点击关闭、滚动锁、
          落定曲线无回弹。适合放筛选器、详情、设置这类不该打断页面的内容。</p>
      </Drawer>
      <CommandPalette open={cmd} onClose={() => setCmd(false)} items={CMDS}
        onSelect={(id) => {
          setLastCmd(CMDS.find((c) => c.id === id)?.label ?? id);
          if (id === "golden") { location.hash = "#golden/home"; return; }
          if (id === "theme") { setMode(mode === "day" ? "night" : "day"); return; }
          const map: Record<string, string> = { home: "top", atoms: "atoms", gallery: "gallery", agent: "agent-lab" };
          document.getElementById(map[id])?.scrollIntoView({ behavior: "smooth" });
        }} />
      <Lightbox open={lb} onClose={() => setLb(false)}
        src={"data:image/svg+xml;charset=utf-8," + encodeURIComponent(
          `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 400'><defs><radialGradient id='g' cx='35%' cy='78%' r='85%'><stop offset='0%' stop-color='#ffeec4'/><stop offset='45%' stop-color='#eed493'/><stop offset='100%' stop-color='#93a9b4'/></radialGradient></defs><rect width='640' height='400' fill='url(#g)'/><g transform='translate(530,320)'><circle cx='0' cy='-14' r='40' fill='#cf9a52'/><ellipse cx='0' cy='8' rx='15' ry='10.5' fill='#ecd2b4'/><circle cx='-9.5' cy='-19' r='3.6' fill='#33291f'/><circle cx='9.5' cy='-19' r='3.6' fill='#33291f'/><path d='M-24 -34 Q-31 -50 -19 -55 Q-13 -46 -12 -39Z' fill='#2e2620'/><path d='M24 -34 Q31 -50 19 -55 Q13 -46 12 -39Z' fill='#2e2620'/></g></svg>`)}
        caption="FRG·GOLD-01《窗台上的猫》示意 — 内联 SVG" />
    </section>
  );
}

const WORKS = [
 {no:'FRG·UKI-01',zh:'神奈川冲浪猫',en:'The Great Wave Cat',era:'浮世绘',artist:'葛饰北斋',year:'c. 1831',stars:5,img:frgWave,orig:'仿《神奈川冲浪里》',
  story:'巨浪以普鲁士蓝扑向船头，两只猫在船板上圆睁双眼、一动不动——浪再大，呆滞不动如山。'},
 {no:'FRG·IMP-01',zh:'睡莲中的猫',en:'Cat Among Water Lilies',era:'印象派',artist:'Claude Monet',year:'1916',stars:5,img:frgWaterlilies,orig:'仿《睡莲》与日本桥',
  story:'莫奈画了三十年的水面，这次的主角换成了两只猫：一只占桥，一只守岸。'},
 {no:'FRG·POS-01',zh:'星月夜猫',en:'Starry Night Cat',era:'后印象派',artist:'Vincent van Gogh',year:'1889',stars:5,img:frgStarry,orig:'仿《星月夜》',
  story:'旋涡星云下，蓝灰那只坐在尖顶屋顶仰望，奶油那只从窗台探出头——柏树如火焰，猫如灯塔。'},
 {no:'FRG·DUT-01',zh:'戴珍珠耳环的猫',en:'Cat with a Pearl Earring',era:'荷兰黄金时代',artist:'Johannes Vermeer',year:'c. 1665',stars:5,img:frgPearl,orig:'仿《戴珍珠耳环的少女》',
  story:'回眸的一瞬被永远定格。珍珠是借的，眼神是自己的。'},
 {no:'FRG·REN-01',zh:'雅典学院猫',en:'Cats of the Athens School',era:'文艺复兴',artist:'Raphael',year:'1511',stars:4,img:frgAthens,orig:'仿《雅典学院》',
  story:'台阶正中并肩而坐，如两位哲学家。诸位学者环绕——但他们才是这幅画真正的主角。'},
];

function Content() {
  const t = useT();
  const [page, setPage] = useState(2);
  const [lbWork, setLbWork] = useState<any>(null);
  const [lbRect, setLbRect] = useState<DOMRect | null>(null);
  const openWork = (w: any, e: React.MouseEvent<HTMLElement>) => {
    const img = e.currentTarget.querySelector("img");
    setLbRect(img?.getBoundingClientRect() ?? null);
    setLbWork(w);
  };
  return (
    <section id="gallery">
      <SectionHead kicker="04 · Content" title={t(["数据与内容展示", "Content"])} sub={t(["卡片 / 名录表 / 标签页 / 手风琴 / 分页 / 空态与骨架屏。", "Cards / tables / tabs / accordion / pagination / empty states / skeletons."])} />
      <SectionHost host="qianqian" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 32, marginTop: 34 }}>
        {WORKS.map((w, i) => (
          <Reveal key={w.no} delay={i * 80}>
            <Card media={<LazyImage src={w.img} ratio="4 / 3" alt={w.zh} />}
              kicker={<><span>{w.era}</span><span>{w.no}</span></>}
              title={w.zh} subtitle={w.en} onClick={(e) => openWork(w, e)}
              footer={<><span>{w.orig}</span><Rating value={w.stars} /></>} />
          </Reveal>
        ))}
        <SharedLightbox open={!!lbWork} onClose={() => { setLbWork(null); setLbRect(null); }}
          src={lbWork?.img || ""} alt={lbWork?.zh}
          caption={lbWork ? `${lbWork.no} · ${lbWork.orig} · ${lbWork.year}` : ""}
          origin={lbRect} />
      </div>
      <div style={{ marginTop: 52 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
          <span style={{ fontSize: 10, letterSpacing: ".28em", textTransform: "uppercase", color: "var(--text-dim)" }}>长廊 · 拖着看</span>
          <span style={{ fontSize: 12, color: "var(--text-dim)" }}>按住拖动，松手即停；点卡片开灯箱</span>
        </div>
        <HScroll>
          {WORKS.map((w) => (
            <div className="rail-card" key={w.no} onClick={(e) => openWork(w, e)}>
              <img src={w.img} alt={w.zh} loading="lazy" />
              <div className="rail-foot">
                <span className="rail-no">{w.no}</span>
                <span className="rail-zh">{w.zh}</span>
              </div>
            </div>
          ))}
        </HScroll>
      </div>
      <div style={{ marginTop: 46 }}>
        <Table
          rowKey={(r) => r.no as string}
          onRowClick={(r) => setLbWork(r)}
          columns={[
            { key: "no", label: "编号" },
            { key: "zh", label: "作品名称" },
            { key: "artist", label: "艺术家" },
            { key: "year", label: "年代", align: "right" },
            { key: "stars", label: "稀有度", align: "right",
              render: (r) => <Rating value={r.stars as number} /> },
          ]}
          rows={WORKS as never[]} />
      </div>
      <div style={{ maxWidth: 720, marginTop: 44 }}>
        <Tabs variant="steps" items={[
          { id: "1", label: "定妆照", content: "第一条 prompt 永远是猫咪定妆照：奶油金渐层绿眼（万万）与蓝灰重点色蓝眼（千千），全部分镜以它为首帧参考锁定一致性。" },
          { id: "2", label: "Prompt 工程", content: "风格契约前缀 + 主语槽位 + 负面词，参考图最多 10 张；组图参数保证整套出图主体不跑。" },
          { id: "3", label: "装配", content: "A 中景缓推 → B 肉垫特写 → 叠化 C 窗台大全景 → D 凝视镜头被光吞没 → 回切 A 尾帧成无缝循环。" },
          { id: "4", label: "交付", content: "ffmpeg -r 24 -an crf20 · 1280×720；离屏自动暂停解码，猫都嫌它安静。" },
        ]} />
        <div style={{ marginTop: 34 }}>
          <Accordion defaultOpen={0} items={[
            { q: "为什么整套库零位图？", a: "整活要有尊严：位图放大就糊，矢量永不辜负放大镜。所有装饰均为运行时 SVG 或 CSS。" },
            { q: "换肤是怎么实现的？", a: "组件只消费语义令牌（--surface/--accent…），皮肤=一组 CSS 变量挂在 html[data-skin] 上，整组换血零闪烁。" },
          ]} />
        </div>
        <div style={{ display: "grid", gap: 18, gridTemplateColumns: "1fr 1fr", alignItems: "start", marginTop: 40 }}>
          <EmptyState icon={<CatCharacter tone="qian" width={96} />} title="这里还没有内容" desc="狗还没来，猫先看着。" />
          <Skeleton lines={3} /><Skeleton rect />
        </div>
        <div style={{ marginTop: 46 }}>
          <Stepper current={page - 1} onStepClick={(i) => setPage(i + 1)}
            steps={[
              { id: "s1", label: "定妆照", hint: "锁定形象" },
              { id: "s2", label: "Prompt 工程", hint: "风格契约" },
              { id: "s3", label: "装配", hint: "分镜拼接" },
              { id: "s4", label: "交付", hint: "编码导出" },
            ]} />
        </div>
        <div style={{ marginTop: 40 }}>
          <Pagination page={page} total={9} onChange={setPage} />
        </div>
        <div style={{ marginTop: 52 }}>
          <p style={{ fontSize: 10, letterSpacing: ".28em", textTransform: "uppercase",
            color: "var(--text-dim)", marginBottom: 18 }}>PROSE · 长文排版</p>
          <Prose>
            <p className="fui-prose__lede">
              长文排版是一套库最容易做砸的地方。这一块把它交给 Prose。
              <span className="fui-prose__en">Long-form typography is where most libraries fall apart. Prose handles it.</span>
            </p>
            <h2>标题会自己找到节奏<span className="fui-prose__en">Headings find their own rhythm</span></h2>
            <p>
              标题、正文、引用、代码、图注都消费同一组语义令牌，所以换皮肤、换昼夜、换字体包时，
              排版跟着走，不需要为每一页重写 CSS。
              <span className="fui-prose__en">Every element consumes the same semantic tokens, so skins, day/night and font packs all carry through.</span>
            </p>
            <blockquote>
              “内容始终拥有最高优先级。”
              <span className="fui-prose__en">Content always has the highest priority.</span>
            </blockquote>
            <ul>
              <li>中文正文 1.9 行高，英文 1.75<span className="fui-prose__en">zh 1.9 / en 1.75 line-height</span></li>
              <li>代码块与行内代码用等宽栈<span className="fui-prose__en">mono stack for code</span></li>
            </ul>
          </Prose>
        </div>
      </div>
    </section>
  );
}

/* ---------- 页面切换实验室 ---------- */
function RouteLab() {
  const t = useT();
  const [view, setView] = useState<"gallery" | "essay">("gallery");
  return (
    <section id="route-lab">
      <SectionHead kicker="05 · Page Transition" title={t(["页面切换实验室", "Page Transitions"])}
        sub={t(["SPA 切页用 PageTransition。跨页和锚点跳转走 viewNavigate，合成器接管过渡，稳定 60fps。", "In-page transitions via PageTransition; cross-page jumps via viewNavigate — compositor-driven, steady 60fps."])} />
      <SectionHost host="wanwan" />
      <Reveal>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 28 }}>
          <Button variant={view === "gallery" ? "primary" : "outline"}
            onClick={() => { setView("gallery"); }}>陈列视图</Button>
          <Button variant={view === "essay" ? "primary" : "outline"}
            onClick={() => { setView("essay"); }}>文章视图</Button>
          <Button variant="outline" onClick={() => viewNavigate("#loading-lab")}>
            锚点跳转 · View Transition
          </Button>
          <Button variant="outline" onClick={() => viewNavigate("#top")}>过渡回顶</Button>
        </div>
      </Reveal>
      <div style={{ marginTop: 30 }}>
        <PageTransition pageKey={view} variant={view === "essay" ? "slideL" : "slideR"}>
          {view === "gallery" ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 26 }}>
              {WORKS.slice(0, 3).map((w) => (
                <Card key={w.no} media={<LazyImage src={w.img} ratio="4 / 3" alt={w.zh} />}
                  kicker={<><span>{w.era}</span><span>{w.no}</span></>}
                  title={w.zh} subtitle={w.en}
                  footer={<><span>{w.orig}</span><Rating value={w.stars} /></>} />
              ))}
            </div>
          ) : (
            <article style={{ maxWidth: 680 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 26, marginBottom: 12 }}>
                午睡的弧度，就是留白的度量衡
              </h3>
              <p style={{ color: "var(--text-dim)", fontSize: 15 }}>
                排版的第一原则不是对齐，是呼吸。猫趴在窗台上之所以好看，是因为它周围什么都没有——
                没有杂物，没有装饰，没有多余的家具。留白不是空，是把所有注意力让给你的主角。</p>
              <span className="fui-hand" style={{ fontSize: 27, color: "var(--accent)", display: "inline-block", marginTop: 14 }}>
                — the two cats, on negative space
              </span>
            </article>
          )}
        </PageTransition>
      </div>
    </section>
  );
}

/* ---------- Loading 画廊 ---------- */
function LoadingLab() {
  const t = useT();
  return (
    <section id="loading-lab">
      <SectionHead kicker="06 · Loading & Lazy" title={t(["加载与懒加载", "Loading & Lazy"])}
        sub={t(["四种 Spinner 口味 · 进度条 · 数字滚动 · LazyImage 进入视口才拉取并 blur-up 淡入。", "Four spinners · progress · count-up · LazyImage with blur-up on viewport entry."])} />
      <SectionHost host="qianqian" />
      <Reveal>
        <div style={{ display: "flex", gap: 44, alignItems: "center", flexWrap: "wrap", marginTop: 32 }}>
          <Spinner variant="ring" /><Spinner variant="dots" /><Spinner variant="bars" />
          <Spinner variant="pulse" />
          <div style={{ flex: 1, minWidth: 240 }}><Progress value={64} label="猫粮余量" /></div>
        </div>
      </Reveal>
      <Reveal delay={120}>
        <div style={{ display: "flex", gap: "clamp(28px,6vw,80px)", flexWrap: "wrap", margin: "42px 0" }}>
          {[["Components", 48, "+"], ["Icons", 45, " 枚"], ["Cats", 2, " 只"]].map(([cap, n, suf]) => (
            <div key={cap as string} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 600,
                fontSize: 52, lineHeight: 1, color: "var(--accent)" }}>
                <CountUp to={n as number} suffix={suf as string} />
              </div>
              <div style={{ fontSize: 10.5, letterSpacing: ".3em", textTransform: "uppercase",
                color: "var(--text-dim)", marginTop: 8 }}>{cap}</div>
            </div>
          ))}
        </div>
      </Reveal>
      <Reveal delay={160}>
        <div style={{ position: "relative" }}>
          <LazyImage src={"data:image/svg+xml;charset=utf-8," + frgSill} ratio="16 / 10" alt="窗台双猫 · GPT 生图" />
          <div className="fui-glass glass-float" style={{ position: "absolute", left: 18, bottom: 18,
            padding: "14px 20px", display: "flex", gap: 16, alignItems: "center" }}>
            <span className="fui-hand" style={{ fontSize: 24, color: "var(--text)" }}>Live by the two cats</span>
            <Button variant="outline" size="sm">进入直播</Button>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 22, marginTop: 22 }}>
          <LazyImage src={"data:image/svg+xml;charset=utf-8," + catCream} ratio="4 / 3" alt="定妆照 · 万万" />
          <LazyImage src={"data:image/svg+xml;charset=utf-8," + catBlue} ratio="4 / 3" alt="定妆照 · 千千" />
        </div>
        <p style={{ marginTop: 12, textAlign: "center", fontSize: 12.5, color: "var(--text-dim)" }}>
          LazyImage 演示 · GPT 生图：shimmer 占位 → 进入视口拉取 → blur-up 淡入｜ 玻璃卡悬浮其上，糊化肉眼可见</p>
      </Reveal>
    </section>
  );
}

function App() {
  // 路由：根路径与 #golden/* 是金样本（What good looks like）；
  // #lab 与区块锚点（#atoms…）是能力目录 Playground。
  const parseRoute = (h: string) => {
    const isGolden = h === "" || h === "#" || h.startsWith("#golden/");
    return {
      golden: isGolden,
      view: h.startsWith("#golden/") ? (h.replace("#golden/", "") || "home") : "home",
    };
  };
  const [golden, setGolden] = useState(() => parseRoute(location.hash).golden);
  const [goldenView, setGoldenView] = useState(() => parseRoute(location.hash).view);
  useEffect(() => {
    const on = () => {
      const r = parseRoute(location.hash);
      setGolden(r.golden);
      setGoldenView(r.view);
    };
    addEventListener("hashchange", on);
    return () => removeEventListener("hashchange", on);
  }, []);
  // SPA 锚点：挂载后补跳 + 监听 hash 变化（含 viewNavigate 的同页跳转）
  useEffect(() => {
    const go = () => {
      const h = location.hash;
      if (!h || h === "#top") { window.scrollTo({ top: 0 }); return; }
      if (!h || h === "#" || h === "#lab" || h.startsWith("#golden/")) return; // 由视图切换接管
      try {
        const el = document.querySelector(h);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } catch { /* 非法选择器（如 #golden/home）忽略 */ }
    };
    go();
    addEventListener("hashchange", go);
    return () => removeEventListener("hashchange", go);
  }, []);
  return (
    <>
      <div style={{ display: golden && goldenView === "home" ? undefined : "none" }}>
        <GoldenHome />
      </div>
      <div style={{ display: golden && goldenView === "project" ? undefined : "none" }}>
        <GoldenProject />
      </div>
      <div style={{ display: golden && goldenView === "gallery" ? undefined : "none" }}>
        <GoldenGallery />
      </div>
      <div style={{ display: golden && goldenView === "article" ? undefined : "none" }}>
        <GoldenArticle />
      </div>
      <div style={{ display: golden ? "none" : undefined }}>
    <SkinProvider persistKey="fragrance-ui-demo">
      <ToastProvider>
        <header style={{ position: "sticky", top: 0, zIndex: 50, display: "flex", alignItems: "center",
          justifyContent: "space-between", padding: "14px 28px", background: "color-mix(in srgb, var(--surface) 88%, transparent)",
          backdropFilter: "blur(12px)", borderBottom: "1px solid var(--line)" }}>
          <a href="#golden/home" className="fui-kicker" style={{ textDecoration: "none", fontSize: 13 }}>FRAGRANCE UI</a>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <ThemeConsole />
            <NavDock />
          </div>
        </header>
        <ScrollGuide />
        <main style={{ maxWidth: 1100, margin: "0 auto", padding: "70px 28px 90px" }} id="top">
          <ArtHero />
          <Atoms /><Forms /><Overlays /><Content />
          <RouteLab /><LoadingLab /><ModernEffects /><ThreeLab /><AgentLab />
          <Suspense fallback={<div style={{ minHeight: 180 }} />}><IconShelf /></Suspense>
          <MotionLab />
        </main>
      </ToastProvider>
    </SkinProvider>
      </div>
    </>
  );
}
createRoot(document.getElementById("root")!).render(<App />);

export default App;
