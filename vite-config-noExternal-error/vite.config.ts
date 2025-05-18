import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    {
      name: "repro1",
      config() {
        return {
          environments: {
            ssr: {
              resolve: {
                noExternal: ["my-package"],
              },
              build: {
                rollupOptions: {
                  input: "/src/entry.js",
                },
              },
            },
          },
        };
      },
    },
    {
      name: "repro2",
      // [not ok]
      config() {
        return {
          environments: {
            ssr: {
              resolve: {
                noExternal: true,
              },
            },
          },
        };
      },
      // [ok]
      // configEnvironment(name, config, env) {
      //   if (name === "ssr") {
      //     return {
      //       resolve: {
      //         noExternal: true,
      //       },
      //     }
      //   }
      // },
    },
  ],
  builder: {
    async buildApp(builder) {
      console.log(
        "[debug] noExternal:",
        builder.environments.ssr.config.resolve.noExternal,
      );
      await builder.build(builder.environments.ssr);
    },
  },
});
