/* Fragrance UI · Phase 6 Eval Matrix
 * 运行：npm run check:matrix（需 preview :4173）
 * 矩阵：desktop/mobile × day/night × zh/en 全组合渲染回归
 *      + reduced-motion 降级检查 + a11y（img alt / 按钮可达 / 键盘焦点） */
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

  /* ---- 1. 组合矩阵：2 viewport × 2 mode × 2 lang ---- */
  console.log("[Matrix] viewport × mode × lang");
  const combos = [];
  for (const vp of [{ w: 1280, h: 800, name: "desktop" }, { w: 390, h: 844, name: "mobile" }]) {
    for (const mode of ["day", "night"]) {
      for (const lang of ["zh", "en"]) combos.push({ vp, mode, lang });
    }
  }
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e).slice(0, 120)));
  for (const { vp, mode, lang } of combos) {
    await page.setViewport({ width: vp.w, height: vp.h, deviceScaleFactor: 1 });
    await page.evaluateOnNewDocument((m, l) => {
      localStorage.setItem("fragrance-ui-demo", JSON.stringify({ skin: "fragrance", mode: m, font: "system", lang: l }));
    }, mode, lang);
    await page.goto(URL, { waitUntil: "networkidle0" });
    await sleep(1100);
    const d = await page.evaluate(() => ({
      rendered: (document.getElementById("root")?.children.length ?? 0) > 0,
      sections: document.querySelectorAll("main section").length,
      sw: document.documentElement.scrollWidth,
      lang: document.documentElement.getAttribute("data-lang"),
      meaning: !!document.querySelector(".hero-meaning"),
    }));
    const tag = `${vp.name}/${mode}/${lang}`;
    ok(`${tag} 渲染`, d.rendered && d.sections >= 11);
    ok(`${tag} data-lang=${lang}`, d.lang === lang);
    if (vp.name === "mobile") ok(`${tag} 零溢出`, d.sw === 390, `got ${d.sw}`);
    if (!d.meaning) ok(`${tag} 意义行存在`, false);
  }
  ok("矩阵全程零 pageerror", errors.length === 0, errors.slice(0, 3).join(" | "));

  /* ---- 2. reduced-motion 降级 ---- */
  console.log("[ReducedMotion]");
  const page2 = await browser.newPage();
  await page2.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  const errors2 = [];
  page2.on("pageerror", (e) => errors2.push(String(e)));
  await page2.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 });
  await page2.goto(URL, { waitUntil: "networkidle0" });
  await sleep(1400);
  await page2.evaluate(() => document.querySelector("#gallery .rail-card")?.scrollIntoView({ block: "center" }));
  await sleep(900);
  const rm = await page2.evaluate(() => {
    const img = document.querySelector(".rail-card img");
    const tail = document.querySelector(".ccat-tail");
    return {
      railVisible: !!img && img.getBoundingClientRect().width > 0,
      tailAnim: tail ? getComputedStyle(tail).animationName : "none",
      revealIn: [...document.querySelectorAll(".fui-reveal")].every((el) => getComputedStyle(el).opacity === "1" || el.classList.contains("in")),
    };
  });
  ok("reduced-motion 页面成立", rm.railVisible && rm.revealIn);
  ok("reduced-motion 常驻动画停止", rm.tailAnim === "none");

  /* ---- 3. a11y ---- */
  console.log("[A11y]");
  await page2.emulateMediaFeatures([]);
  await page2.goto(URL, { waitUntil: "networkidle0" });
  await sleep(1400);
  const a11y = await page.evaluate(() => {
    const imgs = [...document.querySelectorAll("img")];
    const noAlt = imgs.filter((i) => i.getAttribute("alt") === null).length;
    const btns = [...document.querySelectorAll("button")];
    const unlabeled = btns.filter((b) => !b.textContent.trim() && !b.getAttribute("aria-label")).length;
    return { imgs: imgs.length, noAlt, btns: btns.length, unlabeled };
  });
  ok("全部图片有 alt", a11y.noAlt === 0, `${a11y.noAlt} missing of ${a11y.imgs}`);
  ok("全部按钮可达（文本或 aria-label）", a11y.unlabeled === 0, `${a11y.unlabeled} unlabeled of ${a11y.btns}`);

  // 键盘焦点：Tab 到导航钮，焦点环可见
  await page.keyboard.press("Tab"); await page.keyboard.press("Tab");
  await page.keyboard.press("Tab"); await page.keyboard.press("Tab");
  const focus = await page.evaluate(() => {
    const el = document.activeElement;
    if (!el || el === document.body) return { ok: false };
    const cs = getComputedStyle(el);
    return { ok: true, tag: el.tagName, outline: cs.outlineWidth, shadow: cs.boxShadow !== "none" };
  });
  ok("键盘焦点有可见指示", focus.ok && (parseFloat(focus.outline) > 0 || focus.shadow),
    JSON.stringify(focus).slice(0, 90));

  /* ---- 4. 对比度：主文本 ≥7 (AAA)，次级文本 ≥4.5 (AA) ---- */
  console.log("[Contrast]");
  const lum = (c) => {
    const m = c.match(/\d+(\.\d+)?/g);
    if (!m || m.length < 3) return null;
    const f = (v) => { v /= 255; return v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; };
    return .2126 * f(+m[0]) + .7152 * f(+m[1]) + .0722 * f(+m[2]);
  };
  const ratio = (fg, bg) => {
    const a = lum(fg), b = lum(bg);
    if (a == null || b == null) return null;
    return +(((Math.max(a, b) + .05) / (Math.min(a, b) + .05)).toFixed(2));
  };
  for (const mode of ["day", "night"]) {
    await page2.evaluate((m) => {
      localStorage.setItem("fragrance-ui-demo", JSON.stringify({ skin: "fragrance", mode: m, font: "system", lang: "zh" }));
    }, mode);
    await page2.reload({ waitUntil: "networkidle0" });
    await sleep(900);
    const r = await page2.evaluate(() => {
      const bg = getComputedStyle(document.body).backgroundColor;
      const title = document.querySelector("#atoms .fui-sechead__title");
      const sub = document.querySelector("#atoms .fui-sechead__sub");
      return {
        bg: getComputedStyle(document.body).backgroundColor,
        title: title ? getComputedStyle(title).color : null,
        sub: sub ? getComputedStyle(sub).color : null,
      };
    });
    const mainR = ratio(r.title, r.bg);
    const subR = ratio(r.sub, r.bg);
    ok(`对比度 ${mode} 主文本 ≥ 7 (AAA)`, mainR !== null && mainR >= 7, `got ${mainR}`);
    ok(`对比度 ${mode} 次级文本 ≥ 4.5 (AA)`, subR !== null && subR >= 4.5, `got ${subR}`);
  }

  console.log(`\nRESULT: ${pass} pass, ${fail} fail`);
  await browser.close();
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.error("FATAL", e); process.exit(1); });
