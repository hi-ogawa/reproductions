import { initializePyodideWorker, pyodide } from "./worker/proxy";

async function main() {
  document.getElementById("root")!.textContent = "loading...";

  await initializePyodideWorker();

  const code = "1 + 1";
  await pyodide.loadPackagesFromImports(code);
  const result = await pyodide.runPythonAsync(code);

  document.getElementById("root")!.textContent = JSON.stringify({ code, result });
}

main();
