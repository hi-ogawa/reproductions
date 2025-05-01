import { createServer } from "vite"

async function main() {
  const server = await createServer({
    configFile: false,
    environments: {
      ssr: {
        resolve: {
          // not necessary since `runner.import` entry is always inlined
          // noExternal: ["test-dep"],
        }
      }
    }
  });
  await server.environments.ssr.runner.import("test-dep");
  await new Promise(r => setTimeout(r, 100));
  server.environments.ssr.hot.send({ type: "full-reload" })
}

main();
