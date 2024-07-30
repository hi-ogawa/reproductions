import { defineConfig } from 'vite'
import { sassPlugin } from "esbuild-sass-plugin";

export default defineConfig({
  clearScreen: false,
  optimizeDeps: {
    extensions: [".scss", ".sass"],
    esbuildOptions: {
      plugins: [
        sassPlugin({
          // not working with the default `type: "css"` which emits separate css files
          // as it removes `import "...css"` from js files.
          type: "style",
        }),
      ]
    }
  }
})
