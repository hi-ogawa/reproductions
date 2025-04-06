import fs from "node:fs";

fs.rmSync("./test/generated", { recursive: true, force: true });
fs.mkdirSync("./test/generated", { recursive: true });

for (const count of [
  10, 20, 30, 40,
  100, 200, 300, 400,
  1000, 2000, 3000, 4000,
]) {
  const n = String(count).padStart(4, "0");

  fs.writeFileSync(
    `./test/generated/baseline-${n}.test.ts`,
    `import { test } from 'vitest'` + [...Array(count)].map((_, i) => `
test('${i}', () => {});
new Error('TEST');
`).join(""),
  );

  fs.writeFileSync(
    `./test/generated/error-only-${n}.test.ts`,
    `import { test } from 'vitest'` + [...Array(count)].map((_, i) => `
test('${i}', () => {});
new Error('TEST');
`).join(""),
  );

  fs.writeFileSync(
    `./test/generated/error-message-${n}.test.ts`,
    `import { test } from 'vitest'` + [...Array(count)].map((_, i) => `
test('${i}', () => {});
new Error('TEST').message;
`).join(""),
  );

  fs.writeFileSync(
    `./test/generated/error-stack-${n}.test.ts`,
    `import { test } from 'vitest'` + [...Array(count)].map((_, i) => `
test('${i}', () => {});
new Error('TEST').stack;
`).join(""),
  );
}
