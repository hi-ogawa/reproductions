import { cp, rm } from "node:fs/promises";
import * as esbuild from "esbuild";

async function main() {
  await rm("dist/client/index.html");
  await rm("api", { recursive: true, force: true })
  await cp("dist/server", "api", { recursive: true });
  // TODO
  esbuild;
}

main();
