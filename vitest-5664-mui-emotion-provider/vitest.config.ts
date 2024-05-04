import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "jsdom",
    alias: {
      "@emotion/react": path.resolve(
        "node_modules/@emotion/react/dist/emotion-react.cjs.mjs",
      ),
    },
  },
});
