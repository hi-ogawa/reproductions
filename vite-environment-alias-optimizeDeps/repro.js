import { createServerModuleRunner } from "vite";
import { createServer } from "vite";

async function main() {
  const server = await createServer({
    configFile: false,
    clearScreen: false,
    optimizeDeps: {
      noDiscovery: true,
      include: [],
    },
    environments: {
      ssr: {
        resolve: {
          noExternal: true,
        },
        dev: {
          optimizeDeps: {
            force: process.argv.includes("--force"),
            include: ["test-dep"],
          },
        },
      },
      custom: {
        resolve: {
          noExternal: true,
        },
        dev: {
          optimizeDeps: {
            force: process.argv.includes("--force"),
            include: ["test-dep"],
            esbuildOptions: {
              // NOTE: esbuild alias doesn't work since vite's `onResolve` steals first?
              // alias: {
              //   "test-dep": "test-dep/custom.cjs"
              // },
              plugins: [
                {
                  name: "repro",
                  setup(build) {
                    build.onResolve({ filter: /^[\w@][^:]/ }, (args) => {
                      if (args.path === "test-dep") {
                        return build.resolve("test-dep/custom.cjs", {
                          kind: args.kind,
                        });
                      }
                    });
                  },
                },
              ],
            },
          },
        },
      },
    },
  });
  await server.listen();

  {
    const mod = await server.environments.ssr.runner.import("/src/entry.js");
    console.log(">>> ssr", mod);
  }

  {
    const runner = createServerModuleRunner(server.environments.custom);
    const mod = await runner.import("/src/entry.js");
    console.log(">>> custom", mod);
  }

  await server.close();
}

main();
