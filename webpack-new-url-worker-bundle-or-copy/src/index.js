function main() {
	render("image.svg = " + new URL("./deps/image.svg", import.meta.url).href);
	render("test.js = " + new URL("./deps/test.js", import.meta.url).href);

	// referencing non existing file fails?
	// /* webpackIgnore: true */ new URL( /* webpackIgnore: true */ "./deps/not-found.txt", /* webpackIgnore: true */ import.meta.url).href;

	const testWorkerJs = new Worker(
		new URL("./deps/test-worker.js", import.meta.url),
	);
	testWorkerJs.onmessage = (e) => {
		render("test-worker.js (self.location.href) = " + e.data.href);
	};
	testWorkerJs.postMessage("ping");
}

function render(textContent) {
	const pre = document.createElement("pre");
	pre.textContent = textContent;
	document.body.appendChild(pre);
}

main();
