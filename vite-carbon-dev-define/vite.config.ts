import { defineConfig } from "vite"

export default defineConfig({
  define: {
    __DEV__: false
  },
  esbuild: {
    include: /\.[jt]sx?$/,
    exclude: [],
    loader: 'tsx',
    define: {
      // __DEV__: 'false',
      __DEV__: 'false',
    },
  }
})
