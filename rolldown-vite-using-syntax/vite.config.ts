import { defineConfig } from "vite"

export default defineConfig({
  oxc: {
    target: "es2022",
  },
  esbuild: {
    target: "es2022",
  },
})
