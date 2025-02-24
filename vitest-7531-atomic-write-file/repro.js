/// <reference types="node" />
import fs from "node:fs";
import path from "node:path";

/** @type {Set<string>} */
const created = new Set();
/** @type {Map<string, Promise<void>>} */
const promises = new Map();

const dir = ".tmp/deep1/deep2/deep3";
const name = "name";
const code = "ok";

async function reproWriteAndRead() {
  const { id } = await reproWrite();
  return fs.readFileSync(id, "utf-8");
}

async function reproWrite() {
  const tmp = path.join(dir, name);
  if (promises.has(tmp)) {
    await promises.get(tmp);
    return { id: tmp };
  }
  if (!created.has(dir)) {
    await fs.promises.mkdir(dir, { recursive: true });
    created.add(dir);
  }
  promises.set(
    tmp,
    fs.promises.writeFile(tmp, code).finally(() => promises.delete(tmp)),
  );
  await promises.get(tmp);
  return { id: tmp };
}

async function main() {
  await fs.promises.rm(".tmp", { recursive: true, force: true });
  const results = await Promise.all([reproWriteAndRead(), reproWriteAndRead()]);
  console.log(results);
}

main();
