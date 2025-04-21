import { defineConfig } from 'rollup'
import isolatedDecl from 'unplugin-isolated-decl/rollup'
import oxc from 'unplugin-oxc/rollup'

export default defineConfig({
  input: 'src/index.ts',
  output: {
    dir: 'dist'
  },
  plugins: [isolatedDecl(), oxc()],
})
