import { createServerModuleRunner, defineConfig } from "vite";
import { ModuleRunner } from "vite/module-runner";

export default defineConfig((_env) => ({
  clearScreen: false,
  environments: {
    client: {
      resolve: {}
    },
    worker: {
      webCompatible: true,
      resolve: {
        conditions: ["worker"],
        noExternal: true,
      },
    },
    custom1: {
      webCompatible: true,
      resolve: {
        conditions: ["custom1"],
        noExternal: true,
      },
    },
    custom2: {
      resolve: {
        conditions: ["custom2"],
        noExternal: true,
      },
    },
  },
  plugins: [
    {
      name: "repro",
      configureServer(server) {
        const runners: Record<string, ModuleRunner> = {};
        server.middlewares.use(async (req, res, next) => {
          const url = new URL(req.url ?? "", "http://dev.local");
          const name = url.pathname.slice(1);
          const devEnv = server.environments[name];
          if (devEnv) {
            const runner = runners[name] ??= createServerModuleRunner(devEnv);
            const mod = await runner.import("/src/entry");
            res.end(`${name}: ${mod.default}`);
            return;
          }
          next();
        })
      }
    }
  ],
}));
