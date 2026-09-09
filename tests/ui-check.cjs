/* Fragrance UI · UI 质量门（Handoff Phase 6 最小集）
 * 运行：npm run check:ui   （需本地 preview :4173 已启动）
 * 覆盖：渲染完整 / 锚点区块 / 溢出 / 导航舱 / 共享过渡开合 / 角色状态机 / 双语切换 */
const puppeteer = require("puppeteer-core");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const URL = process.env.CHECK_URL || "http://localhost:4173/fragrance-ui/";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let pass = 0, fail = 0;
const ok = (name, cond, detail = "") => {
  if (cond) { pass++; console.log(`  ✓ ${name}`); }
  else { fail++; console.log(`  ✗ ${name} ${detail}`); }
};

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new" });
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));

  console.log("[1] 渲染与锚点");
  await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 });
  await page.goto(URL + "#lab", { waitUntil: "networkidle0" });
  await sleep(1500);
  const base = await page.evaluate(() => ({
    sections: document.querySelectorAll("main section").length,
    ids: ["atoms", "forms", "overlays", "gallery", "route-lab", "loading-lab",
      "effects-lab", "three-lab", "agent-lab", "icon-lab", "motion-lab"]
      .filter((id) => !document.getElementById(id)),
    hosts: document.querySelectorAll(".host-scene").length,
    ccats: document.querySelectorAll(".ccat").length,
  }));
  ok("区块数量 >= 11", base.sections >= 11, `got ${base.sections}`);
  ok("全部锚点 id 存在", base.ids.length === 0, base.ids.join(","));
  ok("吉祥物引导条 11 条", base.hosts === 11, `got ${base.hosts}`);
  ok("角色状态机挂载", base.ccats >= 2, `got ${base.ccats}`);
  ok("零 pageerror", errors.length === 0, errors.join(" | "));

  console.log("[2] 导航舱");
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(400);
  await page.hover(".navdock__btn");
  await sleep(450);
  const dock = await page.evaluate(() => ({
    on: document.querySelector(".navdock__panel")?.classList.contains("on"),
    items: document.querySelectorAll(".navdock__item").length,
  }));
  ok("悬停展开", !!dock.on);
  ok("13 个入口（含金样本）", dock.items === 13, `got ${dock.items}`);

  console.log("[3] 画廊共享过渡");
  await page.evaluate(() => document.querySelector("#gallery .rail-card")?.scrollIntoView({ block: "center" }));
  await sleep(900);
  await page.evaluate(() => document.querySelectorAll(".rail-card")[0].click());
  await sleep(750);
  const lb = await page.evaluate(() => ({
    phase: document.querySelector(".fui-shared")?.getAttribute("data-phase"),
    cap: !!document.querySelector(".fui-shared__cap"),
  }));
  ok("过渡到位 open", lb.phase === "open", `got ${lb.phase}`);
  ok("字幕已建立", lb.cap);
  await page.keyboard.press("Escape");
  await sleep(650);
  const closed = await page.evaluate(() => ({
    gone: !document.querySelector(".fui-shared"),
    unlocked: document.body.style.overflow === "",
  }));
  ok("关闭卸载", closed.gone);
  ok("滚动锁释放", closed.unlocked);

  console.log("[4] 角色状态机");
  await page.evaluate(() => document.querySelector("#motion-lab .lab-grid")?.scrollIntoView({ block: "start" }));
  await page.evaluate(() => window.scrollBy({ top: 400, behavior: "instant" }));
  await sleep(1000);
  const hasM02 = await page.evaluate(() =>
    [...document.querySelectorAll("#motion-lab .lab-card")]
      .some((c) => c.textContent.includes("Character State Machine")));
  ok("M02 卡存在", hasM02);
  if (hasM02) {
    await page.evaluate(() => {
      const card = [...document.querySelectorAll("#motion-lab .lab-card")]
        .find((c) => c.textContent.includes("Character State Machine"));
      card.scrollIntoView({ block: "center", behavior: "instant" });
    });
    await sleep(900);
    const m02 = await page.evaluate(() => {
      const svg = [...document.querySelectorAll("#motion-lab .lab-card")]
        .find((c) => c.textContent.includes("Character State Machine"))
        ?.querySelector("svg");
      const r = svg.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height * .36 };
    });
    await page.mouse.move(m02.x + 60, m02.y + 4, { steps: 6 });
    await sleep(700);
    const s = await page.evaluate(() => {
      const card = [...document.querySelectorAll("#motion-lab .lab-card")]
        .find((c) => c.textContent.includes("Character State Machine"));
      return card?.querySelector(".ccat")?.getAttribute("data-state");
    });
    ok("靠近进入 watch/notice", s === "watch" || s === "notice", `got ${s}`);
  }

  console.log("[5] 双语切换");
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(400);
  await page.evaluate(() => [...document.querySelectorAll(".console button")].find((b) => b.textContent.trim() === "EN")?.click());
  await sleep(500);
  const lang = await page.evaluate(() => ({
    attr: document.documentElement.getAttribute("data-lang"),
    enSize: getComputedStyle(document.querySelector(".hero-meaning__en")).fontSize,
    zhSize: getComputedStyle(document.querySelector(".hero-meaning__zh")).fontSize,
  }));
  ok("data-lang=en", lang.attr === "en");
  ok("英文行升为主视觉", parseFloat(lang.enSize) > parseFloat(lang.zhSize), `${lang.enSize} vs ${lang.zhSize}`);

  console.log("[6] Prose 长文排版");
  await page.evaluate(() => {
    const t = [...document.querySelectorAll("#gallery p")].find((e) => e.textContent.includes("PROSE"));
    t?.scrollIntoView({ block: "center" });
  });
  await sleep(900);
  const prose = await page.evaluate(() => {
    const el = document.querySelector("#gallery .fui-prose");
    if (!el) return { present: false };
    const h2 = el.querySelector("h2");
    return {
      present: true,
      h2Size: h2 ? parseFloat(getComputedStyle(h2).fontSize) : 0,
      en: !!el.querySelector(".fui-prose__en"),
      quote: !!el.querySelector("blockquote"),
    };
  });
  ok("Prose 渲染", prose.present);
  ok("标题字阶生效", prose.h2Size > 20, `got ${prose.h2Size}`);
  ok("双语对照与引用块", prose.en && prose.quote);

  console.log("[7] Drawer / CommandPalette / Stepper");
  await page.evaluate(() => document.querySelector("#overlays")?.scrollIntoView({ block: "start" }));
  await sleep(700);
  await page.evaluate(() => [...document.querySelectorAll("button")].find((b) => b.textContent.includes("打开 Drawer"))?.click());
  await sleep(650);
  const dr = await page.evaluate(() => ({
    open: !!document.querySelector(".fui-drawer"),
    role: document.querySelector(".fui-drawer")?.getAttribute("role"),
    locked: document.body.style.overflow === "hidden",
  }));
  ok("Drawer 打开 / dialog / 滚动锁", dr.open && dr.role === "dialog" && dr.locked);
  await page.keyboard.press("Escape");
  await sleep(600);
  ok("Drawer Esc 关闭并解锁", await page.evaluate(() =>
    !document.querySelector(".fui-drawer") && document.body.style.overflow === ""));

  await page.evaluate(() => [...document.querySelectorAll("button")].find((b) => b.textContent.includes("指令面板"))?.click());
  await sleep(600);
  const cp0 = await page.evaluate(() => ({
    open: !!document.querySelector(".fui-cmd"),
    items: document.querySelectorAll(".fui-cmd__item").length,
  }));
  ok("指令面板打开", cp0.open && cp0.items >= 5, `items=${cp0.items}`);
  await page.keyboard.type("gold");
  await sleep(400);
  const cp1 = await page.evaluate(() => document.querySelectorAll(".fui-cmd__item").length);
  ok("输入即过滤", cp1 === 1, `got ${cp1}`);
  await page.keyboard.press("Enter");
  await sleep(900);
  ok("Enter 执行并关闭", await page.evaluate(() => !document.querySelector(".fui-cmd")));
  await page.evaluate(() => { location.hash = "#gallery"; });
  await sleep(1200);

  await page.evaluate(() => document.querySelector(".fui-stepper")?.scrollIntoView({ block: "center" }));
  await sleep(700);
  const st = await page.evaluate(() => ({
    steps: document.querySelectorAll(".fui-stepper__step").length,
    aria: document.querySelector(".fui-stepper__step.is-cur")?.getAttribute("aria-current"),
  }));
  ok("Stepper 步骤与 aria-current", st.steps === 4 && st.aria === "step", JSON.stringify(st));
  await page.evaluate(() => document.querySelectorAll(".fui-stepper__step")[3]?.click());
  await sleep(400);
  const st2 = await page.evaluate(() => document.querySelectorAll(".fui-stepper__step.is-done").length);
  ok("点击步骤推进", st2 === 3, `done=${st2}`);

  console.log("[8] 390px 溢出");
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await sleep(600);
  const sw = await page.evaluate(() => document.documentElement.scrollWidth);
  ok("scrollWidth == 390", sw === 390, `got ${sw}`);
  ok("零 pageerror（全程）", errors.length === 0, errors.join(" | "));

  console.log(`\nRESULT: ${pass} pass, ${fail} fail`);
  await browser.close();
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.error("FATAL", e); process.exit(1); });
