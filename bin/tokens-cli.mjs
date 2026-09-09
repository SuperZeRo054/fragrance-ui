#!/usr/bin/env node
/* Fragrance UI · token CLI
 *
 *   fragrance-ui tokens          列出语义令牌契约（组件只准消费这些）
 *   fragrance-ui skin <name>     打印一份新皮肤模板（day / night 两块）
 *   fragrance-ui check [file]    校验皮肤块是否覆盖契约（默认读包内 CSS）
 *
 * 无依赖，只用 Node 内置模块。契约与 src/tokens.css 同步维护。
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const CONTRACT = [
  ["--surface", "页面底色"],
  ["--surface-raised", "抬升表面（卡片/面板）"],
  ["--surface-inset", "凹陷表面（代码块/输入槽）"],
  ["--text", "主文本"],
  ["--text-dim", "次级文本"],
  ["--text-inverse", "反色文本（用于 accent 底）"],
  ["--accent", "强调色"],
  ["--accent-soft", "强调色浅阶"],
  ["--on-accent", "强调底上的文字"],
  ["--success", "成功"],
  ["--warning", "警告"],
  ["--danger", "危险"],
  ["--info", "信息"],
  ["--line", "分隔线与描边"],
];

const here = dirname(fileURLToPath(import.meta.url));
const defaultCss = resolve(here, "../dist/fragrance-ui.css");

const [, , cmd, arg] = process.argv;

const readCss = (file) => {
  const target = file ? resolve(process.cwd(), file) : defaultCss;
  try { return { css: readFileSync(target, "utf8"), target }; }
  catch {
    console.error(`读不到样式文件：${target}`);
    console.error("先运行 npm run build:lib，或传入路径：fragrance-ui check src/tokens.css");
    process.exit(2);
  }
};

const blocks = (css) => {
  const out = [];
  const re = /\[data-skin="([^"]+)"\]\[data-mode="([^"]+)"\]\s*\{([^}]*)\}/g;
  let m;
  while ((m = re.exec(css))) out.push({ skin: m[1], mode: m[2], body: m[3] });
  return out;
};

if (cmd === "tokens" || !cmd) {
  console.log("Fragrance UI · 语义令牌契约（组件只准消费这些）\n");
  for (const [t, why] of CONTRACT) console.log(`  ${t.padEnd(18)} ${why}`);
  console.log("\n皮肤 = 一组覆盖上述令牌的 [data-skin][data-mode] 块。");
  console.log("生成模板：fragrance-ui skin <name>");
  process.exit(0);
}

if (cmd === "skin") {
  const name = (arg || "custom").replace(/[^a-z0-9-]/gi, "");
  const block = (mode) =>
    `[data-skin="${name}"][data-mode="${mode}"] {\n` +
    CONTRACT.map(([t]) => `  ${t}: ;`).join("\n") +
    "\n}";
  console.log(`/* 新皮肤：${name}（粘进 src/tokens.css 即可生效） */`);
  console.log(`/* 建议：day 用浅色、night 用深色，mode 语义在全皮肤下保持一致。 */\n`);
  console.log(block("day"));
  console.log("");
  console.log(block("night"));
  console.log(`\n/* 校验：fragrance-ui check src/tokens.css */`);
  process.exit(0);
}

if (cmd === "check") {
  const { css, target } = readCss(arg);
  const list = blocks(css);
  if (list.length === 0) {
    console.error(`没找到 [data-skin][data-mode] 块：${target}`);
    process.exit(1);
  }
  let bad = 0;
  for (const b of list) {
    const missing = CONTRACT.filter(([t]) => !new RegExp(`${t}\\s*:`).test(b.body));
    if (missing.length) {
      bad++;
      console.error(`  ✗ ${b.skin}/${b.mode} 缺少：${missing.map(([t]) => t).join(", ")}`);
    } else {
      console.log(`  ✓ ${b.skin}/${b.mode}`);
    }
  }
  console.log(`\n${list.length} 个皮肤块，${bad} 个不完整`);
  process.exit(bad ? 1 : 0);
}

console.log(`未知命令：${cmd}\n可用：tokens | skin <name> | check [file]`);
process.exit(2);
