import { createServerModuleRunner } from "vite";
import { createServer } from "vite";

async function main() {
  const server = await createServer({
    configFile: false,
  });
  await server.listen();
  const runner = createServerModuleRunner(server.environments.ssr, {
    hmr: false,
    sourcemapInterceptor: "prepareStackTrace",
  });
  await runner.import("./repro-vite-entry.js");
  await server.close();
}

main();
