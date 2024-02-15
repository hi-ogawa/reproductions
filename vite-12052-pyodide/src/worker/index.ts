import { exposeTinyRpc, messagePortServerAdapter } from "@hiogawa/tiny-rpc";

// TODO: support interrupt
// https://pyodide.org/en/stable/usage/keyboard-interrupts.html

declare let loadPyodide: typeof import("pyodide").loadPyodide;

async function main() {
  // TODO: prefetch? self-host?
  // @ts-ignore
  importScripts("https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js");
  const pyodide = await loadPyodide();

  exposeTinyRpc({
    routes: pyodide,
    adapter: messagePortServerAdapter({
      port: globalThis,
      onError(e) {
        console.error("[pyodide-worker]", e);
      },
    }),
  });

  // notify main thread pyodide is ready
  globalThis.postMessage("__PYODIDE_WORKER_READY__")
}

main();
