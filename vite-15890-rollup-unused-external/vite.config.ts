import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig((env) => ({
  clearScreen: false,
  build: {
    outDir: env.isSsrBuild ? "dist/vite/server" : "dist/vite/client",
    rollupOptions: {
      input: [
        "./src/svelte/app.svelte",
      ]
    },
  },
  plugins: [
    svelte()
  ]
}))
