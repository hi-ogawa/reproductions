export const workerUrl = new URL("./worker.js", import.meta.url);

export function startWorker(el) {
	const worker = new Worker(workerUrl);
	worker.addEventListener("message", (e) => {
		console.log("message", e.data);
	});
	worker.postMessage({ msg: "pong: worker" });
}
