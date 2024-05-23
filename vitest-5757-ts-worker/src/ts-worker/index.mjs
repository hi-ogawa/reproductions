import { Worker } from "node:worker_threads";

export class TsWorker extends Worker {
	/**
	 * @param {string | URL} filename
	 * @param {WorkerOptions | undefined} options
	 */
	constructor(filename, options = {}) {
		options.workerData ??= {};
		options.workerData.__ts_worker_filename = filename.toString();
		super(new URL("./worker.mjs", import.meta.url), options);
	}
}
