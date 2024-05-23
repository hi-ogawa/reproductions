import { Worker } from "node:worker_threads";

const worker = new Worker(new URL("./demo-worker.ts", import.meta.url));

worker.on("error", (e) => {
	console.log("[main:worker.error]", e);
});

worker.on("message", (e) => {
	console.log("[main:worker.message]", e);
});

worker.postMessage("hello worker");
