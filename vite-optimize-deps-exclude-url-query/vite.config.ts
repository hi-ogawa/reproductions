import { defineConfig } from "vite";

export default defineConfig({
  optimizeDeps: {
    exclude: ["@vitejs/test-dep"],
  },
});
