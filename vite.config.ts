import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsConfigPaths()],
  server: {
    open: true,
    port: 3000,
  },
  test: {
    setupFiles: "./src/setupTests.ts",
    environment: "jsdom",
    globals: true,
    coverage: {
      clean: false,
      include: ["src"],
      exclude: ["src/main.tsx", "src/App.tsx", "src/**/*.spec.tsx", "src/**/*.spec.ts"],
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
});
