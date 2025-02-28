import { defineConfig } from "rollup"

export default defineConfig({
  input: "./src/main.jsx",
  output: {
    dir: "dist",
    entryFileNames: "[name].jsx"
  },
  jsx: {
    mode: "preserve",
  },
})
