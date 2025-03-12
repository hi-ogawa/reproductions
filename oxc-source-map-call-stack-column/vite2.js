import { createServerModuleRunner } from "vite";
import { createServer } from "vite";

async function main() {
  const server = await createServer({ configFile: false})
  const runner = createServerModuleRunner(server.environments.ssr, {
    // same issues for any interceptor
    sourcemapInterceptor: "prepareStackTrace"
  });
  await runner.import(process.argv[2]);
}

main()
