import fs from "node:fs";
import path from "node:path";
import childProcess from "node:child_process";

const packages = [
  "@vitest/browser",
  "@vitest/coverage-istanbul",
  "@vitest/coverage-v8",
  "@vitest/expect",
  "@vitest/mocker",
  "@vitest/pretty-format",
  "@vitest/runner",
  "@vitest/snapshot",
  "@vitest/spy",
  "@vitest/ui",
  "@vitest/utils",
  "vite-node",
  "vitest",
  "@vitest/web-worker",
  "@vitest/ws-client",
];

async function main() {
  const diffCommand = process.argv[2];

  for (const name of packages) {
    // collect dts
    const baseDir = `node_modules/${name}/dist`;
    const baseDirPr = `node_modules/${name}-pr/dist`;
    const dtsFiles = fs.globSync(`**/*.d.ts`, { cwd: baseDir });
    const dtsFilesPr = fs.globSync(`**/*.d.ts`, { cwd: baseDirPr });
    const dtsFilesSet = new Set(dtsFiles);
    const dtsFilesPrSet = new Set(dtsFilesPr);

    // diff file sets
    const sameSet = dtsFilesSet.intersection(dtsFilesPrSet);
    const diffSet1 = dtsFilesSet.difference(dtsFilesPrSet);
    const diffSet2 = dtsFilesPrSet.difference(dtsFilesSet);
    console.log({ name, sameSet, diffSet1, diffSet2 });

    if (diffCommand) {
      for (const file of sameSet) {
        const file1 = path.join(baseDir, file);
        const file2 = path.join(baseDirPr, file);
        console.log(`:: diff ${file1} ${file2}`);
        childProcess.execSync(`${diffCommand} ${file1} ${file2}`);
      }
    }
  }
}

main();
