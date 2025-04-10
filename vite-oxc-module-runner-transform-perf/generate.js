import fs from "node:fs";

fs.rmSync("./test/generated", { recursive: true, force: true });
fs.mkdirSync("./test/generated", { recursive: true });

for (const numFiles of [100, 200, 300, 400, 500]) {
  const numTests = 1;
  fs.mkdirSync(`./test/generated/${numFiles}-js`, { recursive: true });
  fs.mkdirSync(`./test/generated/${numFiles}-ts`, { recursive: true });
  for (let i = 0; i < numFiles; i++) {
    const iPad = String(i).padStart(3, "0");
    const code = `import { test } from 'vitest'` +
        [...Array(numTests)]
          .map(
            (_, i) => `
test('${i}', () => {});
`,
          )
          .join("");
    fs.writeFileSync(`./test/generated/${numFiles}-ts/${iPad}.test.ts`,code);
    fs.writeFileSync(`./test/generated/${numFiles}-js/${iPad}.test.js`,code);
  }
}
