import { defineConfig } from "vite";

export default defineConfig({
  build: {
    minify: false,
  },
  worker: {
    format: "es",
  }
})
