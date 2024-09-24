import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@vitejs/test-dep": path.resolve(
        import.meta.dirname,
        "linked-dep/src/index.tsx",
      ),
    },
  },
});
