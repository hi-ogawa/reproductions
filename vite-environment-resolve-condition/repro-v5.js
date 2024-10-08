import { createServer } from "vite";

async function main() {
  const server = await createServer({
    configFile: false,
    clearScreen: false,
    optimizeDeps: {
      // client pre-bundle seems to hide the issue sometimes
      noDiscovery: true,
      include: [],
    },
    ssr: {
      target: "webworker",
      noExternal: true,
      resolve: {
        conditions: ["worker"],
      },
    },
    plugins: [
      {
        name: "repro",
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            const url = new URL(req.url ?? "", "http://dev.local");
            if (url.pathname === "/ssr") {
              const mod = await server.ssrLoadModule("/src/entry");
              res.end(`ssr: ${mod.default}`);
              return;
            }
            next();
          });
        },
      },
    ],
  });
  await server.listen();
  server.printUrls();
}

main();
