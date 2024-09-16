import { defineConfig } from "vite"

export default defineConfig({
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      }
    }
  }
})
