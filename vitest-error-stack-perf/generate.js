import fs from "node:fs";

fs.rmSync("./test/generated", { recursive: true, force: true });
fs.mkdirSync("./test/generated", { recursive: true });

for (const count of [
  10, 20, 30, 40, 50,
  100, 200, 300, 400, 500,
  1000, 2000, 3000, 4000, 5000,
]) {
  const n = String(count).padStart(4, "0");
  fs.writeFileSync(
    `./test/generated/${n}.test.ts`,
    `import { test } from 'vitest'` + [...Array(count)].map((_, i) => `
test('${i}', () => {});
`).join(""),
  );
}
