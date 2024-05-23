import { TsWorker } from "./index.mjs";

const worker = new TsWorker(new URL("./demo-worker.ts", import.meta.url));

worker.on("error", (e) => {
	console.log("[main:worker.error]", e);
});

worker.on("message", (e) => {
	console.log("[main:worker.message]", e);
});

worker.postMessage("hello worker");
