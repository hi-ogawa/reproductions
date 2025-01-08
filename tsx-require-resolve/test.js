import { createRequire } from "node:module"

const require = createRequire(import.meta.url);

console.log(`[require.resolve("test-dep1")]`, require.resolve("test-dep1"));
console.log(`[require.resolve("test-dep2")]`, require.resolve("test-dep2"));

console.log("[test-mod.cjs]", await import("./test-mod.cjs"));
