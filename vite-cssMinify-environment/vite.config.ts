import { defineConfig } from "vite"

export default defineConfig({
  // [works]
  // build: {
  //   cssMinify: false,
  //   emitAssets: true,
  // },
  plugins: [
    {
      name: 'config-plugin',
      // config() {
      //   return {
      //     environments: {
      //       ssr: {
      //         build: {
      //           outDir: "dist/ssr",
      //           // cssMinify: false,
      //           emitAssets: true,
      //           rollupOptions: {
      //             input: "./src/ssr.ts",
      //           },
      //         }
      //       }
      //     }
      //   }
      // },
      // configResolved(config) {
      //   console.log("[client/emitAssets]", config.environments.client.build.emitAssets);
      //   console.log("[ssr/emitAssets]", config.environments.ssr.build.emitAssets);
      //   // console.log('Resolved config:', JSON.stringify(config, null, 2));
      // }
    }
  ],
  environments: {
    client: {
      build: {
        outDir: "dist/client",
        // cssMinify: false,
        rollupOptions: {
          input: "./src/client.ts",
        },
      }
    },
    ssr: {
      build: {
        outDir: "dist/ssr",
        // cssMinify: false,
        emitAssets: true,
        rollupOptions: {
          input: "./src/ssr.ts",
        },
      }
    }
  },
  builder: {
    sharedPlugins: true,
    sharedConfigBuild: true,
    async buildApp(builder) {
      console.log("[client/emitAssets]", builder.environments.client.config.build.emitAssets)
      await builder.build(builder.environments.client)
      console.log("[ssr/emitAssets]", builder.environments.ssr.config.build.emitAssets)
      await builder.build(builder.environments.ssr)
    },
  }
})
