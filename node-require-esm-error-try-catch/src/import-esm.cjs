async function main() {
  process.on('uncaughtException', (e) => {
    console.log("[uncaughtException]", e)
  });

  process.on('unhandledRejection', (e) => {
    console.log("[unhandledRejection]", e)
  });

  try {
    await import("./error.mjs")
  } catch (e) {
    console.log("[try/catch import(esm)]", e)
  }
}

main();
