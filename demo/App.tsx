import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  SkinProvider, useTheme, ToastProvider, useToast,
  Reveal, Button, Badge, Kicker, SectionHead, ChipGroup, Rating, Avatar, Tooltip,
  OxMark, SheepMark,
  TextField, SelectField, Switch, Checkbox, RadioGroup, RangeField,
  Modal, ConfirmModal, ErrorModal, Lightbox,
  Card, Table, Tabs, Accordion, Pagination, EmptyState, Skeleton,
  PageTransition, viewNavigate, Spinner, Progress, CountUp, LazyImage,
  type SkinId,
} from "../src";

/* ---------- 换肤控制台：引擎的活体证明 ---------- */
function ThemeConsole() {
  const { skin, mode, setSkin, setMode } = useTheme();
  return (
    <div className="console">
      <span className="cap">SKIN</span>
      {( ["musee", "graphite"] as SkinId[] ).map((s) => (
        <button key={s} className={skin === s ? "on" : ""}
          onClick={() => setSkin(s)}>{s}</button>
      ))}
      <i />
      <span className="cap">MODE</span>
      <button onClick={() => setMode(mode === "day" ? "night" : "day")}>
        {mode === "day" ? "夜间" : "日间"}
      </button>
    </div>
  );
}

/* ---------- 各分类展示块 ---------- */
function Atoms() {
  const toast = useToast();
  const [era, setEra] = useState("all");
  return (
    <section>
      <SectionHead kicker="01 · Atoms" title="原子件" sub="按钮 / 徽章 / 标签组 / 稀有度 / 头像 / 提示词。" />
      <Reveal>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
          <Button>主要操作</Button>
          <Button variant="outline">描边次级</Button>
          <Button variant="ghost">软底款</Button>
          <Button variant="glass">毛玻璃款</Button>
          <Button variant="danger">危险</Button>
          <Button size="sm" loading>Loading</Button>
          <Button variant="glass" size="sm" disabled>禁用</Button>
        </div>
      </Reveal>
      <Reveal delay={120}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, margin: "22px 0" }}>
          <Badge tone="gold">镇馆藏品</Badge><Badge tone="ok">已鉴定</Badge><Badge tone="info">借展中</Badge>
          <Badge tone="warn">修复期</Badge><Badge tone="err">禁止触摸</Badge>
          <Rating value={4} size={18} /><Rating value={5} size={18} /><Rating value={2} size={18} />
        </div>
      </Reveal>
      <Reveal delay={200}>
        <div style={{ display: "flex", gap: 24, alignItems: "center", margin: "18px 0" }}>
          <ChipGroup items={[{ id: "all", label: "全部" }, { id: "imp", label: "印象派" },
            { id: "uki", label: "浮世绘" }, { id: "mod", label: "现代" }]}
            value={era} onChange={setEra} />
          <Avatar><OxMark size={54} /></Avatar>
          <Avatar shape="rounded" size={64}><SheepMark size={38} /></Avatar>
          <Tooltip tip="我是 Tooltip，悬停或聚焦可见">
            <span style={{ border: "1px solid var(--line)", borderRadius: 999,
              padding: "7px 16px", fontSize: 12.5, color: "var(--text-dim)", cursor: "help" }}>
              悬停这枚词
            </span>
          </Tooltip>
          <Button variant="glass" size="sm" onClick={() => toast("轻提示已送达")}>触发 Toast</Button>
        </div>
      </Reveal>
    </section>
  );
}

function Forms() {
  const toast = useToast();
  const [mail, setMail] = useState("moo@moo");
  const [mailShake, setMailShake] = useState(0);
  const [sw, setSw] = useState(true);
  const [ck, setCk] = useState(true);
  const [rd, setRd] = useState("day");
  const [rng, setRng] = useState(64);
  return (
    <section>
      <SectionHead kicker="02 · Forms" title="表单控件全套" sub="含校验错误与成功反馈态、开关、单选复选与滑块。" />
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
          <Switch checked={sw} onChange={setSw} label="接收月度展讯" />
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
  const [modal, setModal] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [err, setErr] = useState(false);
  const [lb, setLb] = useState(false);
  return (
    <section>
      <SectionHead kicker="03 · Overlays" title="覆盖层系统"
        sub="Modal / Confirm / Error（入场震动）/ Lightbox / Toast · Esc 与遮罩点击均可关闭。" />
      <Reveal>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 30 }}>
          <Button onClick={() => setModal(true)}>打开 Modal</Button>
          <Button variant="danger" onClick={() => setConfirm(true)}>打开 Confirm</Button>
          <Button variant="outline" onClick={() => setErr(true)}>打开报错弹窗</Button>
          <Button variant="outline" onClick={() => setLb(true)}>打开 Lightbox</Button>
        </div>
      </Reveal>
      <Modal open={modal} onClose={() => setModal(false)} kicker="Reservation" title="预约馆长导览">
        <p>馆长将带你重走「凝视五千年」动线，全程禁止提问「它为什么不眨眼」。</p>
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 22 }}>
          <Button sm onClick={() => setModal(false)}>好的约定了</Button>
        </div>
      </Modal>
      <ConfirmModal open={confirm} onClose={() => setConfirm(false)} onCancel={() => {}}
        title="清空收藏夹？" body="此操作不可撤销：你收藏的全部金样本将被移除并喂给隔壁的羊。"
        dangerText="确认清空" />
      <ErrorModal open={err} onClose={() => setErr(false)}
        title="网络波动，馆长暂时失联" body="请求超时（ETIMEDOUT）。请检查网络后重试；若持续失败，馆长可能在假装没看见。" />
      {/* 用一段内联 SVG 当 lightbox 的演示图 —— 零位图传统 */}
      <Lightbox open={lb} onClose={() => setLb(false)}
        src={"data:image/svg+xml;charset=utf-8," + encodeURIComponent(
          `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 400'><defs><radialGradient id='g' cx='35%' cy='78%' r='85%'><stop offset='0%' stop-color='#ffeec4'/><stop offset='45%' stop-color='#eed493'/><stop offset='100%' stop-color='#93a9b4'/></radialGradient></defs><rect width='640' height='400' fill='url(#g)'/><g transform='translate(530,320)'><circle cx='0' cy='-14' r='40' fill='#cf9a52'/><ellipse cx='0' cy='8' rx='15' ry='10.5' fill='#ecd2b4'/><circle cx='-9.5' cy='-19' r='3.6' fill='#33291f'/><circle cx='9.5' cy='-19' r='3.6' fill='#33291f'/><path d='M-24 -34 Q-31 -50 -19 -55 Q-13 -46 -12 -39Z' fill='#2e2620'/><path d='M24 -34 Q31 -50 19 -55 Q13 -46 12 -39Z' fill='#2e2620'/></g></svg>`)}
        caption="NLM·GOLD-01《镜面湖上的牛来》示意 — 内联 SVG" />
    </section>
  );
}

const WORKS = [
  { no: "NLM·IMP-01", zh: "睡莲中的牛来", en: "Ox Among Water Lilies", era: "印象派", artist: "Claude Monet", year: "1916", stars: 4 },
  { no: "NLM·UKI-01", zh: "神奈川冲浪牛来", en: "The Great Wave Ox", era: "浮世绘", artist: "Hokusai", year: "c. 1831", stars: 4 },
  { no: "NLM·MOD-01", zh: "构成八号牛来", en: "Composition VIII Ox", era: "现代", artist: "Kandinsky", year: "1923", stars: 5 },
];

function Content() {
  const [page, setPage] = useState(2);
  return (
    <section>
      <SectionHead kicker="04 · Content" title="数据与内容展示" sub="卡片 / 名录表 / 标签页 / 手风琴 / 分页 / 空态与骨架屏。" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 32, marginTop: 34 }}>
        {[WORKS[0], WORKS[1], WORKS[2]].map((w, i) => (
          <Reveal key={w.no} delay={i * 90}>
            <Card kicker={<><span>{w.era}</span><span>{w.no}</span></>}
              title={w.zh} subtitle={w.en}
              footer={<><span>{`仿 · ${w.artist}`}</span><Rating value={w.stars} /></>} />
          </Reveal>
        ))}
      </div>
      <div style={{ marginTop: 46 }}>
        <Table
          rowKey={(r) => r.no as string}
          onRowClick={(r) => alert(`灯箱会在这里打开：${r.zh}`)}
          columns={[
            { key: "no", label: "馆藏编号" },
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
          { id: "1", label: "定妆照", content: "第一条 prompt 永远是角色定妆照：姜黄蓬松短绒毛、呆萌圆脸、黑尖短角。全部分镜以它为首帧参考锁定一致性。" },
          { id: "2", label: "Prompt 工程", content: "风格契约前缀 + 主语槽位 + 负面词，参考图最多 10 张；组图参数保证整套出图主体不跑。" },
          { id: "3", label: "装配", content: "A 中景缓推 → B 蹄部特写 → 叠化 C 大全景 → D 面部凝视被晨雾吞没 → 回切 A 尾帧成无缝循环。" },
          { id: "4", label: "交付", content: "ffmpeg -r 24 -an crf20 · 1280×720 与原站同规格；离屏自动暂停解码。" },
        ]} />
        <div style={{ marginTop: 34 }}>
          <Accordion defaultOpen={0} items={[
            { q: "为什么整套库零位图？", a: "整活要有尊严：位图放大就糊，矢量永不辜负放大镜。所有装饰均为运行时 SVG 或 CSS。" },
            { q: "换肤是怎么实现的？", a: "组件只消费语义令牌（--surface/--accent…），皮肤=一组 CSS 变量挂在 html[data-skin] 上，整组换血零闪烁。" },
          ]} />
        </div>
        <div style={{ display: "grid", gap: 18, gridTemplateColumns: "1fr 1fr", alignItems: "start", marginTop: 40 }}>
          <EmptyState icon={<SheepMark size={42} />} title="这里还没有展品" desc="羊还没下水，牛先看着。" />
          <Skeleton lines={3} /><Skeleton rect />
        </div>
        <div style={{ marginTop: 40 }}>
          <Pagination page={page} total={9} onChange={setPage} />
        </div>
      </div>
    </section>
  );
}

/* ---------- 页面切换实验室 ---------- */
function RouteLab() {
  const [view, setView] = useState<"gallery" | "essay">("gallery");
  return (
    <section id="route-lab">
      <SectionHead kicker="05 · Page Transition" title="页面切换实验室"
        sub="SPA 切页用 PageTransition；跨页 / 锚点跳转走 viewNavigate —— 浏览器合成器接管，60fps。" />
      <Reveal>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 28 }}>
          <Button variant={view === "gallery" ? "primary" : "outline"}
            onClick={() => { setView("gallery"); }}>陈列视图</Button>
          <Button variant={view === "essay" ? "primary" : "outline"}
            onClick={() => { setView("essay"); }}>文章视图</Button>
          <Button variant="glass" onClick={() => viewNavigate("#loading-lab")}>
            锚点跳转 · View Transition
          </Button>
          <Button variant="glass" onClick={() => viewNavigate("#top")}>过渡回顶</Button>
        </div>
      </Reveal>
      <div style={{ marginTop: 30 }}>
        <PageTransition pageKey={view} variant={view === "essay" ? "slideL" : "slideR"}>
          {view === "gallery" ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 26 }}>
              {WORKS.slice(0, 3).map((w) => (
                <Card key={w.no} kicker={<><span>{w.era}</span><span>{w.no}</span></>}
                  title={w.zh} subtitle={w.en}
                  footer={<><span>{`仿 · ${w.artist}`}</span><Rating value={w.stars} /></>} />
              ))}
            </div>
          ) : (
            <article style={{ maxWidth: 680 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 26, marginBottom: 12 }}>
                湖面的水位，就是留白的度量衡
              </h3>
              <p style={{ color: "var(--text-dim)", fontSize: 15 }}>
                排版的第一原则不是对齐，是呼吸。牛来站在镜面湖上之所以好看，是因为它周围什么都没有——
                没有岩虾，没有浮萍，没有多余的礁石。留白不是空，是把所有注意力让给你的主角。</p>
              <span className="mui-hand" style={{ fontSize: 27, color: "var(--accent)", display: "inline-block", marginTop: 14 }}>
                — the curator, on negative space
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
  return (
    <section id="loading-lab">
      <SectionHead kicker="06 · Loading & Lazy" title="加载与懒加载"
        sub="四种 Spinner 口味 · 进度条 · 数字滚动 · LazyImage 进入视口才拉取并 blur-up 淡入。" />
      <Reveal>
        <div style={{ display: "flex", gap: 44, alignItems: "center", flexWrap: "wrap", marginTop: 32 }}>
          <Spinner variant="ring" /><Spinner variant="dots" /><Spinner variant="bars" />
          <Spinner variant="pulse" />
          <div style={{ flex: 1, minWidth: 240 }}><Progress value={64} label="修复进度" /></div>
        </div>
      </Reveal>
      <Reveal delay={120}>
        <div style={{ display: "flex", gap: "clamp(28px,6vw,80px)", flexWrap: "wrap", margin: "42px 0" }}>
          {[["Artworks", 32, " 件"], ["Footage", 30, " s"], ["Sequels", 2, " 部"]].map(([cap, n, suf]) => (
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
          <LazyImage
            src={"data:image/svg+xml;charset=utf-8," + encodeURIComponent(
              `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500'><defs><radialGradient id='g' cx='32%' cy='76%' r='90%'><stop offset='0%' stop-color='#ffeec4'/><stop offset='42%' stop-color='#eed493'/><stop offset='100%' stop-color='#8fa9b6'/></radialGradient></defs><rect width='800' height='500' fill='url(#g)'/><g transform='translate(400,330) scale(1.6)'><circle cx='0' cy='-40' r='44' fill='#cf9a52'/><ellipse cx='0' cy='-6' rx='17' ry='12' fill='#ecd2b4'/><circle cx='-11' cy='-47' r='4' fill='#33291f'/><circle cx='11' cy='-47' r='4' fill='#33291f'/><path d='M-28 -60 Q-36 -78 -22 -83 Q-16 -72 -14 -64Z' fill='#2e2620'/><path d='M28 -60 Q36 -78 22 -83 Q16 -72 14 -64Z' fill='#2e2620'/></g></svg>`)}
            ratio="16 / 10" alt="镜面湖上的牛来示意" />
          <div className="mui-glass glass-float" style={{ position: "absolute", left: 18, bottom: 18,
            padding: "14px 20px", display: "flex", gap: 16, alignItems: "center" }}>
            <span className="mui-hand" style={{ fontSize: 24, color: "var(--text)" }}>Live by the lake</span>
            <Button variant="glass" size="sm">进入直播</Button>
          </div>
        </div>
        <p style={{ marginTop: 12, textAlign: "center", fontSize: 12.5, color: "var(--text-dim)" }}>
          LazyImage 演示 · 占位 shimmer → 进入视口拉取 → blur-up 淡入 ｜ 玻璃卡悬浮于图像之上，糊化肉眼可见</p>
      </Reveal>
    </section>
  );
}

function App() {
  return (
    <SkinProvider persistKey="musee-ui-demo">
      <ToastProvider>
        <header style={{ position: "sticky", top: 0, zIndex: 50, display: "flex", alignItems: "center",
          justifyContent: "space-between", padding: "14px 28px", background: "color-mix(in srgb, var(--surface) 88%, transparent)",
          backdropFilter: "blur(12px)", borderBottom: "1px solid var(--line)" }}>
          <a href="#" className="mui-kicker" style={{ textDecoration: "none", fontSize: 13 }}>MUSÉE UI</a>
          <ThemeConsole />
        </header>
        <main style={{ maxWidth: 1100, margin: "0 auto", padding: "70px 28px 90px" }} id="top">
          <Reveal>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 600,
              fontSize: "clamp(30px, 8vw, 64px)", lineHeight: 1.1, letterSpacing: "-0.015em",
              overflowWrap: "anywhere" }}>
              一套结构，<em style={{ color: "var(--accent)" }}>任意换皮</em>。
            </h1>
            <p className="mui-sechead__sub" style={{ marginTop: 16 }}>
              Musée UI v0.1 · 多皮肤主题引擎 React 组件库。右上角切换皮肤与昼夜，整站变量即时换血。</p>
            <span className="mui-hand hero-sig" style={{ display: "inline-block", marginTop: 14,
              fontSize: 30, color: "var(--accent)" }}>Curated with love — Musée du Niu Lai</span>
          </Reveal>
          <Atoms /><Forms /><Overlays /><Content />
          <RouteLab /><LoadingLab />
        </main>
      </ToastProvider>
    </SkinProvider>
  );
}
createRoot(document.getElementById("root")!).render(<App />);

export default App;
