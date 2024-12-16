function main() {
  process.on('uncaughtException', (e) => {
    console.log("[uncaughtException]", e)
  });

  process.on('unhandledRejection', (e) => {
    console.log("[unhandledRejection]", e)
  });

  try {
    require("./error.mjs")
  } catch (e) {
    console.log("[try/catch require(esm)]", e)
  }
}

main();
