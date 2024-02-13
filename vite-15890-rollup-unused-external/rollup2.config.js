import { defineConfig } from 'rollup'

export default defineConfig({
  input: ['./src/rollup2/app1.js', './src/rollup2/app2.js'],
  output: {
    dir: 'dist/rollup2',
  },
  external: ["lodash-es"],
})
