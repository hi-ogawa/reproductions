import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    root: "./",
    include: ["src/**/*.spec.ts"],
    // "jsdom" still fails with HTMLCanvasElement?
    environment: "happy-dom",
  },
});
