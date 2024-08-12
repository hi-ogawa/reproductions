import testDepBrowserOrWorker from "test-dep-browser-or-worker";

function main() {
	for (const id of [
		"asset-svg",
		"asset-js",
		"asset-in-dep",
		"test-dep-browser-or-worker",
		"worker-js",
	]) {
		document.body.appendChild(
			Object.assign(document.createElement("div"), { id }),
		);
	}

	const assetSvg = new URL("./test.svg", import.meta.url).href;
	render(
		"asset-svg",
		`
<h4>new URL("./test.svg", import.meta.url)</h4>
<a href="${assetSvg}">${assetSvg}</a><br/>
<img width="40" src="${assetSvg}" />
`,
	);

	const assetJs = new URL("./test.js", import.meta.url).href;
	render(
		"asset-js",
		`
<h4>new URL("./test.js", import.meta.url)</h4>
<a href="${assetJs}">${assetJs}</a>
`,
	);

	const assetInDep = new URL("test-dep-asset/test.txt", import.meta.url).href;
	render(
		"asset-in-dep",
		`
<h4>new URL("test-dep-asset/test.txt", import.meta.url)</h4>
<a href="${assetInDep}">${assetInDep}</a>
`,
	);

	// referencing non existing file breaks build (also cannot use magic comment webpackIgnore?)
	// new URL("./deps/not-found.txt", import.meta.url).href;

	render(
		"test-dep-browser-or-worker",
		`
<h4>test-dep-browser-or-worker (main)</h4>
<pre>${testDepBrowserOrWorker}</pre>
`,
	);

	render(
		"worker-js",
		`
<h4>new Worker(new URL("./test-worker.js", import.meta.url))</h4>
<div>...</div>
`,
	);
	const testWorker = new Worker(new URL("./test-worker.js", import.meta.url), {
		type: "module",
	});
	testWorker.onmessage = (e) => {
		render(
			"worker-js",
			`
<h4>new Worker(new URL("./test-worker.js", import.meta.url))</h4>
<div>self.location.href = <a href="${e.data.href}">${e.data.href}</a></div>
<pre>test-dep-browser-or-worker: ${e.data.testDepBrowserOrWorker}</pre>
`,
		);
	};
	testWorker.postMessage("ping");
}

function render(id, innerHTML) {
	document.getElementById(id).innerHTML = innerHTML;
}

main();
