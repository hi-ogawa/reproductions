import { defineConfig } from 'vite'

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [
    {
      name: 'repro',
      config() {
        return {
          builder: {
            async buildApp(builder) {
              await builder.build(builder.environments.ssr!);
              await builder.build(builder.environments.ssr!);
            }
          }
        }
      },
    },
    cloudflare({
      viteEnvironment: {
        name: 'ssr',
      }
    }),
  ],
})
