import { defineConfig } from "vite"

export default defineConfig({
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        // [ok]
        // additionalData: '$primary: blue;'
        // [not ok]
        additionalData: '@import "/variables.scss";'
      }
    }
  }
})
