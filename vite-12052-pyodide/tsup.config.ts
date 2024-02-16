import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/worker/index.ts"],
  outDir: "src/worker/dist",
  format: ["iife"],
  platform: "neutral",
  noExternal: [/.*/],
});
