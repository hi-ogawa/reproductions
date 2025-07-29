import * as vite from "vite";
import inspect from "vite-plugin-inspect";

async function main() {
  const server = await vite.createServer({
    configFile: false,
    plugins: [inspect()],
    environments: {
      client: {
        optimizeDeps: {
          // silence client optimizer log
          noDiscovery: true,
        },
      },
      ssr: {
        resolve: {
          noExternal: true,
        },
        optimizeDeps: {
          force: true,
          noDiscovery: false,
          entries: ["./src/main.tsx"],
          // [explicitly adding tsconfig is necessary]
          // esbuildOptions: {
          //   tsconfigRaw: {
          //     compilerOptions: {
          //       jsx: "react-jsxdev",
          //     }
          //   }
          // }
        },
      },
    },
  });
  await server.listen();

  // fake delay to finish up initial optimizer
  await new Promise((resolve) => setTimeout(resolve, 500));

  const mod = await server.environments.ssr.runner.import("./src/main.tsx");
  console.log("[runner.import]", mod.default);
}

main();
