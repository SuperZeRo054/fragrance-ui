/* Fragrance UI · Golden Pages Gate
 * 运行：npm run check:golden（需 preview :4173）
 * 覆盖：四个金样本路由渲染 / Scene Hero 入场编排与视差 / reduced-motion 降级 /
 *       G03 筛选与共享过渡 / 零 pageerror */
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
  page.on("pageerror", (e) => errors.push(String(e).slice(0, 120)));
  await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 });

  console.log("[1] 四个金样本路由");
  for (const [route, sel] of [["home", ".ghome"], ["project", ".pd-hero"],
    ["gallery", ".gg-grid"], ["article", ".gart-body"]]) {
    await page.goto(`${URL}#golden/${route}`, { waitUntil: "networkidle0" });
    await sleep(1300);
    const d = await page.evaluate((s) => ({
      present: !!document.querySelector(s),
      golden: !!document.querySelector(".ghome"),
    }), sel);
    ok(`#golden/${route} 渲染`, d.present && d.golden);
  }

  console.log("[2] Scene Hero（M03）");
  await page.goto(`${URL}#golden/home`, { waitUntil: "networkidle0" });
  await sleep(2600);
  const scene = await page.evaluate(() => ({
    inClass: !!document.querySelector(".scene-in"),
    mediaAnim: getComputedStyle(document.querySelector(".scene-media")).animationName,
    titleSettled: getComputedStyle(document.querySelector(".ghome__display")).opacity === "1",
  }));
  ok("入场编排触发", scene.inClass && scene.mediaAnim === "scene-media-in");
  ok("标题落位", scene.titleSettled);
  const y0 = await page.evaluate(() => document.querySelector(".scene-img").style.transform || "none");
  await page.evaluate(() => window.scrollTo({ top: 400, behavior: "instant" }));
  await sleep(400);
  const y1 = await page.evaluate(() => document.querySelector(".scene-img").style.transform);
  ok("滚动视差响应", y0 !== y1 && /translateY/.test(y1), `${y0} -> ${y1}`);

  console.log("[3] G03 筛选与共享过渡");
  await page.goto(`${URL}#golden/gallery`, { waitUntil: "networkidle0" });
  await sleep(1300);
  const total = await page.evaluate(() => document.querySelectorAll(".gg-item").length);
  await page.evaluate(() => [...document.querySelectorAll(".gg-chips button")]
    .find((b) => b.textContent.includes("Scenery"))?.click());
  await sleep(400);
  const filtered = await page.evaluate(() => document.querySelectorAll(".gg-item").length);
  ok("筛选生效", filtered > 0 && filtered < total, `${total} -> ${filtered}`);
  await page.evaluate(() => document.querySelector(".gg-larger")?.click());
  await sleep(800);
  const zoom = await page.evaluate(() => document.querySelector(".fui-shared")?.getAttribute("data-phase"));
  ok("View Larger 共享过渡", zoom === "open", `phase=${zoom}`);
  await page.keyboard.press("Escape");
  await sleep(600);

  console.log("[4] reduced-motion 降级");
  const p2 = await browser.newPage();
  await p2.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await p2.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 });
  await p2.goto(`${URL}#golden/home`, { waitUntil: "networkidle0" });
  await sleep(900);
  const rm = await p2.evaluate(() => ({
    mediaAnim: getComputedStyle(document.querySelector(".scene-media")).animationName,
    titleOpacity: getComputedStyle(document.querySelector(".ghome__display")).opacity,
  }));
  await p2.evaluate(() => window.scrollTo({ top: 400, behavior: "instant" }));
  await sleep(300);
  const rmTransform = await p2.evaluate(() => document.querySelector(".scene-img").style.transform || "none");
  ok("reduced-motion 无入场动画", rm.mediaAnim === "none" && rm.titleOpacity === "1");
  ok("reduced-motion 无视差", rmTransform === "none", rmTransform);

  ok("全程零 pageerror", errors.length === 0, errors.slice(0, 2).join(" | "));
  console.log(`\nRESULT: ${pass} pass, ${fail} fail`);
  await browser.close();
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.error("FATAL", e); process.exit(1); });
