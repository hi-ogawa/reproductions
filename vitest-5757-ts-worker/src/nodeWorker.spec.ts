import type { Worker } from "node:worker_threads";
import { describe, expect, it } from "vitest";
import { TsWorker } from "./ts-worker";

const bounce = async (worker: Worker, value: boolean) => {
	let currentResolve: (value: boolean) => void;
	let currentReject: (reason?: unknown) => void;

	const onMessage = (message: boolean) => {
		remove();
		currentResolve(message);
	};

	const onError = (err: Error) => {
		remove();
		currentReject(err);
	};

	const remove = () => {
		worker.removeListener("message", onMessage);
		worker.removeListener("error", onError);
	};

	return await new Promise<boolean>((resolve, reject) => {
		currentResolve = resolve;
		currentReject = reject;
		worker.addListener("message", onMessage);
		worker.addListener("error", onError);
		worker.postMessage(value);
	});
};

describe("Worker", () => {
	it("should bounce back", async () => {
		const worker = new TsWorker(new URL("./nodeWorker.ts", import.meta.url));
		expect(await bounce(worker, true)).toBe(true);
		expect(await bounce(worker, false)).toBe(false);
	});
});
