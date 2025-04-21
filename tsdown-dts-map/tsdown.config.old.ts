import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/index.ts'],
  clean: true,
  dts: {
    sourceMap: true
  },
  bundleDts: false,
  sourcemap: true,
}) as any
