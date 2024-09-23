import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/lib.js",
      fileName: "index",
      formats: ["es"],
    },
    minify: false,
  },
});
