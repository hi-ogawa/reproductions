import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/index.ts'],
  clean: true,
  dts: true,
  sourcemap: true,
}) as any
