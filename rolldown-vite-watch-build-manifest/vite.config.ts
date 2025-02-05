import { defineConfig } from "vite"

export default defineConfig({
  // environments: {
  //   ssr: {
  //     build: {
  //       rollupOptions: {
  //         input: './src/main.js',
  //       }
  //     }
  //   }
  // },
  build: {
    minify: false,
    manifest: true,
  },
})
