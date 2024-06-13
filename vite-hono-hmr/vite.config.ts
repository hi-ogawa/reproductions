import { defineConfig } from 'vite'
import { vitePluginTinyRefresh } from "@hiogawa/tiny-refresh/vite"

export default defineConfig({
  clearScreen: false,
  plugins: [vitePluginTinyRefresh()],
})
