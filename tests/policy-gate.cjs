/* Fragrance UI · Design Policy Gate（DESIGN.md 硬规则自动执行）
 * 运行：npm run check:policy
 * 把宪法里可机械判定的条款变成 CI 可跑的断言：
 *   1. CORE 纯度：src/components、src/theme、src/motion 不得依赖 src/lab（§6.4 LAB 隔离）
 *   2. LAB 隔离：src/lab 只允许 demo/ 与 barrel 引用（§6.5 禁止 LAB→CORE 直通）
 *   3. BRAND 稀缺：src/brand 不得被 CORE 组件引用（§6.2）
 *   4. 禁用词：博物馆叙事（馆长/馆藏/展品/镇馆/策展/博物馆）在 src 与 demo 全零
 *   5. 零 emoji（用户铁律）
 *   6. 遗留前缀 mui- 全零
 *   7. Hover 哲学（§14）：CORE 样式中不得有 :hover 位移上浮
 *   8. Glass 不属于 Action（§6.1）：Button 变体表不得含 glass
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
let pass = 0, fail = 0;
const ok = (name, cond, detail = "") => {
  if (cond) { pass++; console.log(`  ✓ ${name}`); }
  else { fail++; console.log(`  ✗ ${name} ${detail}`); }
};
const walk = (dir, ext = [".ts", ".tsx", ".css"]) => {
  const out = [];
  const visit = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) { if (!["node_modules", "docs", "audit", ".git"].includes(e.name)) visit(p); }
      else if (ext.some((x) => e.name.endsWith(x))) out.push(p);
    }
  };
  visit(path.join(ROOT, dir));
  return out;
};
const rel = (p) => path.relative(ROOT, p);
const read = (p) => fs.readFileSync(p, "utf8");

console.log("[1] CORE 纯度（不得依赖 LAB / BRAND）");
const coreFiles = [...walk("src/components"), ...walk("src/theme"), ...walk("src/motion")];
const coreLeaks = coreFiles.filter((f) => {
  const s = read(f);
  return /from\s+["'][^"']*\/lab\//.test(s) || /from\s+["'][^"']*\/brand\//.test(s);
}).map(rel);
ok("CORE 无 LAB/BRAND 依赖", coreLeaks.length === 0, coreLeaks.join(", "));

console.log("[2] LAB 隔离（仅 demo 与 barrel 可引用）");
const allFiles = [...walk("src"), ...walk("demo"), ...walk("golden")];
const labImporters = allFiles.filter((f) => {
  if (rel(f).startsWith("src/lab/")) return false;
  if (rel(f) === "src/index.ts") return false; // barrel 显式再导出
  return /from\s+["'][^"']*\/lab\//.test(read(f));
}).map(rel);
ok("LAB 仅经 barrel/demo 引用", labImporters.length === 0, labImporters.join(", "));

console.log("[3] 禁用词与 emoji");
const contentFiles = [...walk("src"), ...walk("demo"), ...walk("golden")];
const banned = /馆长|馆藏|博物馆|镇馆|策展|展品|借展|特展/;
const bannedHits = contentFiles.filter((f) => banned.test(read(f))).map(rel);
ok("博物馆叙事全零", bannedHits.length === 0, bannedHits.join(", "));
const emoji = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u;
const emojiHits = contentFiles.filter((f) => emoji.test(read(f))).map(rel);
ok("零 emoji", emojiHits.length === 0, emojiHits.join(", "));

console.log("[4] 前缀与 Hover 哲学");
const muiHits = contentFiles.filter((f) => /\bmui-/.test(read(f))).map(rel);
ok("mui- 前缀清零", muiHits.length === 0, muiHits.join(", "));
const cssFiles = [...walk("src/components", [".css"])];
const liftHits = cssFiles.filter((f) => {
  // 按规则块扫描：块内含 :hover 且含 translateY(- → 违规（不跨块误报 keyframes）
  return read(f).split("}").some((blk) => /:hover/.test(blk) && /translateY\(-/.test(blk));
}).map(rel);
ok("CORE hover 无位移上浮（§14）", liftHits.length === 0, liftHits.join(", "));

console.log("[5] Glass 不属于 Action（§6.1）");
const btnSrc = read(path.join(ROOT, "src/components/atoms.tsx"));
ok("Button 变体不含 glass", !/BtnVariant\s*=[^;]*"glass"/.test(btnSrc));

console.log(`\nRESULT: ${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);
