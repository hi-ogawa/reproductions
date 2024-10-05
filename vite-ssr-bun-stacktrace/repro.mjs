import { createServer, createServerModuleRunner } from "vite";

/*
[ok]
node repro.mjs

[not ok]
bun run repro.mjs
*/

const server = await createServer({
  configFile: false,
});

const runner = createServerModuleRunner(server.environments.ssr, {
  sourcemapInterceptor: "prepareStackTrace",
  hmr: false,
});
await runner.import("/repro-entry");

await server.close();
