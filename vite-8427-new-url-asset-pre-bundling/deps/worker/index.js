export const workerUrl = new URL("./worker.js", import.meta.url);

export function startWorker(handler) {
	const worker = new Worker(workerUrl);
	worker.addEventListener("message", (e) => {
		handler(e);
	});
	worker.postMessage({ msg: "pong: worker" });
}
