import { runnerImport } from "vite"

async function main() {
  console.log("=========== runnerImport =============")
  console.log(await runnerImport("@vitejs/test-dep/vendor/node_modules/test.js"))

  console.log("=========== node import =============")
  console.log(await import("@vitejs/test-dep/vendor/node_modules/test.js"))
}

main();
