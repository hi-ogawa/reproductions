import { startWorkerRecursive } from "test-dep-new-url-worker";

function main() {
	startWorkerRecursive((e) => {
		document.querySelector(".test").textContent = e.data.ok;
	});

	// it seems to work in user code
	new Worker(new URL("./worker-recursive.js", import.meta.url), {
		type: "module",
	});
}

main();
