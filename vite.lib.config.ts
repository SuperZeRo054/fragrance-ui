import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/* 库构建：产出 ESM + CJS + 单一 CSS，类型由 tsconfig.build.json 生成。
   运行 npm run build:lib → dist/ */
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    target: "es2020",
    lib: {
      entry: "src/index.ts",
      name: "FragranceUI",
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es" ? "fragrance-ui.js" : "fragrance-ui.cjs"),
    },
    rollupOptions: {
      // 宿主依赖不进包：React / three / 图标库由使用方提供
      external: ["react", "react-dom", "react/jsx-runtime", "three", "@phosphor-icons/react", "xstate"],
      output: {
        assetFileNames: (info) =>
          info.name && info.name.endsWith(".css") ? "fragrance-ui.css" : "assets/[name][extname]",
      },
    },
  },
});
