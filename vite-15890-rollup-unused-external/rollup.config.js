import { defineConfig } from 'rollup'

export default defineConfig({
  input: ['./src/app1.js', './src/app2.js'],
  output: {
    dir: 'dist/rollup',
  },
  external: ["lodash-es"],
})
