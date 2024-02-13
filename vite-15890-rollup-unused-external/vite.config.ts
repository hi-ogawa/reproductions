import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  clearScreen: false,
  build: {
    outDir: "dist/vite",
    rollupOptions: {
      input: [
        "./src/svelte/app1.svelte", "./src/svelte/app2.svelte",
      ]
    }
  },
  plugins: [
    svelte()
  ]
})
