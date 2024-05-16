import { loadConfig } from "@unocss/config";

console.time("[loadConfig]");
console.log(await loadConfig());
console.timeEnd("[loadConfig]");
