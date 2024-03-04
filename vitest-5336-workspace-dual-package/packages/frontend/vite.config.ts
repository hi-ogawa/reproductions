/// <reference types="vitest" />
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths()],
  define: {
    global: "globalThis"
  },
  test: {
    environment: "happy-dom",
    setupFiles: "./src/setupTests.ts"
  }
});
