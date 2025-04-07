import fs from "node:fs";

fs.rmSync("./test/generated", { recursive: true, force: true });
fs.mkdirSync("./test/generated", { recursive: true });

for (const numFiles of [100, 200, 300, 400, 500]) {
  const numTests = 10;
  fs.mkdirSync(`./test/generated/${numFiles}`, { recursive: true });
  for (let i = 0; i < numFiles; i++) {
    const iPad = String(i).padStart(3, "0");
    fs.writeFileSync(
      `./test/generated/${numFiles}/${iPad}.test.ts`,
      `import { test } from 'vitest'` +
        [...Array(numTests)]
          .map(
            (_, i) => `
test('${i}', () => {});
`,
          )
          .join(""),
    );
  }
}
