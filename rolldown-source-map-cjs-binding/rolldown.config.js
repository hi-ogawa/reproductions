import { defineConfig } from "rolldown"

export default defineConfig({
  input: ['./src/main1.js', './src/main2.js'],
  output: {
    format: 'cjs',
    sourcemap: 'inline',
  },
})
