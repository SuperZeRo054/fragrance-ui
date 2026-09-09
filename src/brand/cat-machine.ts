import { assign, setup } from "xstate";

export type CatTemperament = "bold" | "shy";
export type CatState = "idle" | "notice" | "watch" | "curious" | "interact" | "return";

/** 性格参数：感知圈半径（px）。万万凑近、千千慢热。 */
export const TEMPO: Record<CatTemperament, { notice: number; watch: number; lean: number }> = {
  bold: { notice: 380, watch: 190, lean: 1 },
  shy: { notice: 300, watch: 150, lean: -1 },
};

/** BRAND · M02 Character State Machine（DESIGN.md §16）。
 *
 *  转移图：
 *    idle  --POINTER(≤notice)--> notice --POINTER(≤watch)--> watch
 *    watch --停留 1600ms--> curious
 *    interact（点击）--1700ms--> return --900ms--> idle
 *
 *  计时由状态机自身驱动（命名 delay），不依赖指针继续移动；
 *  留在原状态的 POINTER 事件是无 target 的内部转移，不重置计时。
 *  纯逻辑、无 DOM 依赖 —— 可在 Node 中直接单测（tests/cat-machine.test.mjs）。
 */
export const catMachine = setup({
  types: {
    context: {} as { dist: number; temperament: CatTemperament },
    events: {} as
      | { type: "POINTER"; dist: number }
      | { type: "INTERACT" }
      | { type: "LEAVE" },
    input: {} as { temperament: CatTemperament },
  },
  guards: {
    // 注意：必须读事件载荷而非 context——同一事件内 assign 在 guard 之后执行，
    // 读 context 会拿到上一次的距离（经典 XState 陷阱）。
    inWatch: ({ context, event }) =>
      event.type === "POINTER" && event.dist <= TEMPO[context.temperament].watch,
    inNotice: ({ context, event }) =>
      event.type === "POINTER" && event.dist <= TEMPO[context.temperament].notice,
  },
  delays: {
    watchHold: 1600,
    interactHold: 1700,
    returnHold: 900,
  },
}).createMachine({
  id: "cat",
  initial: "idle",
  context: ({ input }) => ({ dist: Infinity, temperament: input.temperament }),
  on: {
    POINTER: { actions: assign({ dist: ({ event }) => event.dist }) },
    INTERACT: ".interact",
    LEAVE: ".return",
  },
  states: {
    idle: {
      on: {
        POINTER: [
          { guard: "inWatch", target: "watch" },
          { guard: "inNotice", target: "notice" },
        ],
      },
    },
    notice: {
      on: {
        POINTER: [
          { guard: "inWatch", target: "watch" },
          { guard: "inNotice" }, // 内部转移：留在 notice，不重置计时
          { target: "idle" },
        ],
      },
    },
    watch: {
      on: {
        POINTER: [
          { guard: "inWatch" }, // 内部转移：计时继续累计
          { guard: "inNotice", target: "notice" },
          { target: "return" },
        ],
      },
      after: { watchHold: "curious" },
    },
    curious: {
      on: {
        POINTER: [
          { guard: "inWatch" },
          { guard: "inNotice", target: "notice" },
          { target: "return" },
        ],
      },
    },
    interact: {
      after: { interactHold: "return" },
    },
    return: {
      after: { returnHold: "idle" },
    },
  },
});
