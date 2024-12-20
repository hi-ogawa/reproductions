import { defineConfig } from "vite"

export default defineConfig({
  environments: {
    client: {
      build: {
        outDir: "dist/client",
        rollupOptions: {
          input: './src/entry.client.js'
        }
      }
    },
    ssr: {
      build: {
        outDir: "dist/server",
        rollupOptions: {
          input: './src/entry.server.js'
        }
      }
    }
  },
  builder: {
    sharedPlugins: true,
    async buildApp(builder) {
      await builder.build(builder.environments.client)
      await builder.build(builder.environments.ssr)
    },
  }
})
