import fs from "node:fs";
import path from "node:path";

async function main() {
  const count = Number(process.argv[2] ?? 100);

  const baseDir = path.join(import.meta.dirname, "generated");
  fs.rmSync(baseDir, { force: true, recursive: true });
  fs.mkdirSync(baseDir);

  const code = `
import { bench } from 'vitest';
bench('x', () => {}, { iterations: 1_000_000, time: 0 });
bench('y', () => {}, { iterations: 1_000_000, time: 0 });
`;

  for (let i = 0; i < count; i++) {
    const name = String(i + 1).padStart(3, "0") + ".bench.js";
    fs.writeFileSync(path.join(baseDir, name), code);
  }
}

main();
