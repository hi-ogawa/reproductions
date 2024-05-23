import { parentPort } from "node:worker_threads";

console.log("[worker]", import.meta.url);

parentPort?.once("message", (e) => {
	console.log("[worker]", e);
	parentPort?.postMessage(e);
});
