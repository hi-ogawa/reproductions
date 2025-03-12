import { runnerImport } from "vite";

async function main() {
  await runnerImport(process.argv[2]);
}

main();
