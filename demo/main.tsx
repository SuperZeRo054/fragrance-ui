import React from "react";
import { createRoot } from "react-dom/client";
import "./demo.css";
import App from "./App";

// 不用 StrictMode：实验性 Canvas/Three 组件的双挂载会产生孤儿动画循环
createRoot(document.getElementById("root")!).render(<App />);
