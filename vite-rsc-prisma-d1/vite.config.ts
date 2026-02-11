import rsc from '@vitejs/plugin-rsc'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { cloudflare } from "@cloudflare/vite-plugin"

export default defineConfig({
  plugins: [
    {
      name: 'wip',
      enforce: 'pre',
      resolveId: {
        order: 'pre',
        handler(source) {
          if (source === 'node:os') {
            return this.resolve('/polyfill-node-os.js')
          }
        }
      },
    },
    cloudflare({
      viteEnvironment: {
        name: 'rsc'
      }
    }),
    rsc({
      entries: {
        ssr: './src/framework/entry.ssr.tsx',
        client: './src/framework/entry.browser.tsx',
      },
      serverHandler: false,
      loadModuleDevProxy: true,
    }),
    react(),
  ],
  environments: {
    rsc: {
      optimizeDeps: {
        exclude: ["@prisma/client"]
      },
    }
  }
})
