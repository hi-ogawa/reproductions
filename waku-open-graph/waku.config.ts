import { defineConfig } from "waku/config"
import nitro from "@hiogawa/vite-plugin-nitro";

export default defineConfig({
  vite: {
    // plugins: [
    //   nitro({
    //     server: {
    //       environmentName: "rsc",
    //     },
    //     config: {
    //       esbuild: {
    //         options: {
    //           // Waku uses top level await 
    //           // ERROR: Top-level await is not available in the configured target environment ("es2019")
    //           target: 'esnext',
    //         }
    //       }
    //     }
    //   }),
    // ],
    environments: {
      rsc: {
        resolve: {
          external: ['@vercel/og'],
        }
      }
    }
  }
})
