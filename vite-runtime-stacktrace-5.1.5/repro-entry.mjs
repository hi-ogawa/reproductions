function crash(message) {
  throw new Error(message);
}

function main() {
  crash("crash ssr");
}

main();
