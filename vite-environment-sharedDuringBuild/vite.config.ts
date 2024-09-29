import { defineConfig } from "vite";

const sharedValue = Math.random().toString(36).slice(2);
console.log("[in config loading]", { sharedValue });

export default defineConfig((_env) => ({
  clearScreen: false,
  environments: {
    client: {
      build: {
        outDir: "dist/client",
        rollupOptions: {
          input: {
            "main": "data:text/javascript,console.log(`client`)",
          }
        }
      }
    },
    worker: {
      build: {
        outDir: "dist/worker",
        // ==== this
        modulePreload: false,
        rollupOptions: {
          input: {
            "main": "data:text/javascript,console.log(`worker`)",
          },
          // ==== or this
          // plugins: [
          //   {
          //     name: "xxx",
          //   },
          // ],
        }
      }
    },
  },
  plugins: [
    {
      name: "repro",
      sharedDuringBuild: true,
      writeBundle() {
        console.log("[in plugin.writeBundle]", { sharedValue });
      }
    },
  ],

  builder: {
    async buildApp(builder) {
      await builder.build(builder.environments["client"]!);
      await builder.build(builder.environments["worker"]!);
    },
  },
}));
