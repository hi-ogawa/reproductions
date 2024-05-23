import { parentPort } from "node:worker_threads";

parentPort?.addListener("message", (message: unknown) =>
	parentPort?.postMessage(message),
);
