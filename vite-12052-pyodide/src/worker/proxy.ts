import {
  proxyTinyRpc,
  TinyRpcProxy,
  messagePortClientAdapter,
} from "@hiogawa/tiny-rpc";
import type { PyodideInterface } from "pyodide";
import WORKER_URL from "./dist/index.global.js?url";

export let pyodide: TinyRpcProxy<PyodideInterface>;

export async function initializePyodideWorker() {
  const worker = new Worker(WORKER_URL);

  // wait for pyodide is ready
  await new Promise<void>(resolve => {
    function handler(e: MessageEvent) {
      if (e.data === "__PYODIDE_WORKER_READY__") {
        resolve();
      }
      worker.removeEventListener("message", handler);
    }
    worker.addEventListener("message", handler);
  })

  pyodide = proxyTinyRpc<PyodideInterface>({
    adapter: messagePortClientAdapter({
      port: worker,
    }),
  });
}
