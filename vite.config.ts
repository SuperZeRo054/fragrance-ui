import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/musee-ui/",
  build: {
    outDir: "docs",
    emptyOutDir: true,
  },
});
