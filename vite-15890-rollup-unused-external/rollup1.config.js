import { defineConfig } from 'rollup'

export default defineConfig({
  input: ['./src/rollup1/app1.js', './src/rollup1/app2.js'],
  output: {
    dir: 'dist/rollup1',
  },
  external: ["lodash-es"],
})
