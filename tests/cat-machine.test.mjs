/* Cat character state machine · 纯逻辑单元测试
 * 运行：npm run check:machine
 * 直接 import src 的 .ts（Node 原生类型剥离），无需浏览器与构建产物。 */
import { createActor } from "xstate";
import { catMachine, TEMPO } from "../src/brand/cat-machine.ts";

let pass = 0, fail = 0;
const ok = (name, cond, detail = "") => {
  if (cond) { pass++; console.log(`  ✓ ${name}`); }
  else { fail++; console.log(`  ✗ ${name} ${detail}`); }
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const make = (temperament = "bold") => {
  const actor = createActor(catMachine, { input: { temperament } });
  actor.start();
  return actor;
};
const val = (a) => String(a.getSnapshot().value);

console.log("[状态机] 转移表");

// idle 的距离判定
{
  const a = make("bold");
  ok("初始 idle", val(a) === "idle");
  a.send({ type: "POINTER", dist: 900 });
  ok("远处指针 → 保持 idle", val(a) === "idle");
  a.send({ type: "POINTER", dist: TEMPO.bold.notice - 10 });
  ok("进入 notice 圈 → notice", val(a) === "notice", val(a));
  a.send({ type: "POINTER", dist: TEMPO.bold.watch - 10 });
  ok("进入 watch 圈 → watch", val(a) === "watch", val(a));
  a.send({ type: "POINTER", dist: 900 });
  ok("指针远离 → return（不是直接 idle）", val(a) === "return", val(a));
  a.stop();
}

// notice 在圈外直接回 idle（不经 return）
{
  const a = make("bold");
  a.send({ type: "POINTER", dist: 300 });
  ok("notice 建立", val(a) === "notice");
  a.send({ type: "POINTER", dist: 900 });
  ok("notice + 远离 → idle", val(a) === "idle", val(a));
  a.stop();
}

// 计时驱动：watch 停留 → curious
{
  const a = make("bold");
  a.send({ type: "POINTER", dist: 100 });
  ok("watch 建立", val(a) === "watch");
  await sleep(1750);
  ok("停留 1.6s → curious", val(a) === "curious", val(a));
  a.stop();
}

// 计时不被内部转移重置：持续 POINTER 仍会到 curious
{
  const a = make("bold");
  a.send({ type: "POINTER", dist: 100 });
  const t0 = Date.now();
  while (Date.now() - t0 < 1750) {
    a.send({ type: "POINTER", dist: 100 }); // 内部转移
    await sleep(120);
  }
  ok("持续指针不重置计时 → curious", val(a) === "curious", val(a));
  a.stop();
}

// 点击 → interact → 自动回 return → idle
{
  const a = make("bold");
  a.send({ type: "INTERACT" });
  ok("点击 → interact", val(a) === "interact", val(a));
  await sleep(1850);
  ok("1.7s 后 → return", val(a) === "return", val(a));
  await sleep(1000);
  ok("再 0.9s → idle", val(a) === "idle", val(a));
  a.stop();
}

// 性格差异：同样距离，千千不进入 watch
{
  const w = make("bold"), q = make("shy");
  const d = TEMPO.shy.watch + 20; // 170px：bold 的 watch 圈内，shy 的圈外
  w.send({ type: "POINTER", dist: d });
  q.send({ type: "POINTER", dist: d });
  ok("同距离：万万 watch", val(w) === "watch", val(w));
  ok("同距离：千千仅 notice", val(q) === "notice", val(q));
  w.stop(); q.stop();
}

// 离开窗口
{
  const a = make("bold");
  a.send({ type: "POINTER", dist: 100 });
  a.send({ type: "LEAVE" });
  ok("LEAVE → return", val(a) === "return", val(a));
  a.stop();
}

console.log(`\nRESULT: ${pass} pass, ${fail} fail`);
process.exit(fail ? 1 : 0);
