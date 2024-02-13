import { defineConfig } from 'rollup'

export default defineConfig({
  input: ['./src/rollup/app1.js', './src/rollup/app2.js'],
  output: {
    dir: 'dist/rollup',
  },
  external: ["lodash-es"],
})
