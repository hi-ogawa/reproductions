import { SourceMap } from "node:module";
import { readFile, writeFile } from "node:fs/promises";
import MagicString from "magic-string";

async function main() {
  const root = import.meta.dirname;

  let failed = false;
  const visualizations = [];
  for (const inputFile of ["input.js", "input.ts"]) {
    const input = await readFile(new URL(inputFile, import.meta.url), "utf8");
    for (const packageName of ["vite7", "vite8"]) {
      const result = await runVite(packageName, root, inputFile, input);
      visualizations.push(
        `- [Vite ${result.version}, ${inputFile}](<${result.visualizationUrl}>)`,
      );
      if (!result.expected) {
        failed = true;
      }
    }
  }
  await updateVisualizations(visualizations);
  if (failed) {
    process.exitCode = 1;
  }
}

async function runVite(packageName, root, inputFile, input) {
  const { createServer, version } = await import(packageName);
  const server = await createServer({
    root,
    appType: "custom",
    logLevel: "silent",
    server: { middlewareMode: true },
    plugins: [inlineHoistPlugin(inputFile)],
  });

  try {
    const result = await server.transformRequest(`/${inputFile}`);
    if (!result?.map) {throw new Error("missing transform result map");}
    const sourceMap = new SourceMap(result.map);

    console.log(`Vite ${version}, ${inputFile}`);
    const needle = "register($$hoist_action)";
    const generated = getLineColumn(result.code, result.code.indexOf(needle));
    const original = sourceMap.findEntry(generated.line, generated.column);
    const sourceLine = original.originalLine ?? -1;
    const expectedLine = getLineColumn(input, input.indexOf("async function action()")).line;
    const pass = sourceLine === expectedLine;
    console.log(
      `${pass ? "PASS" : "FAIL"}: output ${generated.line + 1}:${generated.column + 1} -> ${inputFile}:${sourceLine + 1}:${(original.originalColumn ?? -1) + 1}, expected ${inputFile}:${expectedLine + 1}`,
    );
    const visualizationUrl = getVisualizationUrl(result.code, result.map);
    console.log(`Visualization: ${visualizationUrl}`);
    console.log();

    const expectedPass = version.startsWith("7.") || inputFile.endsWith(".js");
    return {
      expected: pass === expectedPass,
      version,
      visualizationUrl,
    };
  } finally {
    await server.close();
  }
}

async function updateVisualizations(visualizations) {
  const noteUrl = new URL("README.md", import.meta.url);
  const note = await readFile(noteUrl, "utf8");
  const section = [
    "<!-- visualizations:start -->",
    "## Visualizations",
    "",
    ...visualizations,
    "<!-- visualizations:end -->",
  ].join("\n");
  await writeFile(
    noteUrl,
    note.replace(
      /<!-- visualizations:start -->[\s\S]*<!-- visualizations:end -->/,
      section,
    ),
  );
}

function inlineHoistPlugin(inputFile) {
  return {
    name: "inline-hoist-repro",
    transform(code, id) {
      if (!id.endsWith(`/${inputFile}`)) return;
      if (!code.endsWith("\n")) code += "\n";
      const output = new MagicString(code);

      const match = /async function action\(\)\s*{/.exec(code);
      const start = match?.index ?? -1;
      const bodyStart = code.indexOf("{", start);
      const end = findClosingBrace(code, bodyStart) + 1;
      if (start < 0 || bodyStart < 0 || end === 0) {
        throw new Error("failed to locate action");
      }

      output.update(start, bodyStart, "\n;export async function $$hoist_action() ");
      output.appendLeft(end, ";");
      output.move(start, end, code.length);
      output.appendLeft(start, "const action = register($$hoist_action);");

      return {
        code: output.toString(),
        map: output.generateMap({
          source: id,
          includeContent: true,
          hires: "boundary",
        }),
      };
    },
  };
}

function getLineColumn(code, index) {
  const prefix = code.slice(0, index);
  const lines = prefix.split("\n");
  return { line: lines.length - 1, column: lines.at(-1).length };
}

function findClosingBrace(code, open) {
  let depth = 0;
  for (let index = open; index < code.length; index++) {
    if (code[index] === "{") depth++;
    if (code[index] === "}" && --depth === 0) return index;
  }
  return -1;
}

function getVisualizationUrl(code, map) {
  const codeBuffer = Buffer.from(code);
  const mapBuffer = Buffer.from(JSON.stringify(map));
  const hash = Buffer.concat([
    Buffer.from(String(codeBuffer.length)),
    Buffer.from([0]),
    codeBuffer,
    Buffer.from(String(mapBuffer.length)),
    Buffer.from([0]),
    mapBuffer,
  ]);
  return `https://evanw.github.io/source-map-visualization/#${hash.toString("base64")}`;
}

await main();
