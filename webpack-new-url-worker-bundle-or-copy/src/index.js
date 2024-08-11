function main() {
	for (const id of ["asset-svg", "asset-js", "worker-js"]) {
		document.body.appendChild(
			Object.assign(document.createElement("div"), { id }),
		);
	}

	const assetSvg = new URL("./deps/image.svg", import.meta.url).href;
	render(
		"asset-svg",
		`
<h4>new URL("./deps/image.svg", import.meta.url)</h4>
<a href="${assetSvg}">${assetSvg}</a><br/>
<img width="40" src="${assetSvg}" />
`,
	);

	const assetJs = new URL("./deps/test.js", import.meta.url).href;
	render(
		"asset-js",
		`
<h4>new URL("./deps/test.js", import.meta.url)</h4>
<a href="${assetJs}">${assetJs}</a>
`,
	);

	// referencing non existing file breaks build (also cannot use magic comment webpackIgnore?)
	// new URL("./deps/not-found.txt", import.meta.url).href;

	const testWorker = new Worker(
		new URL("./deps/test-worker.js", import.meta.url),
	);
	testWorker.onmessage = (e) => {
		render(
			"worker-js",
			`
<h4>new Worker(new URL("./deps/test-worker.js", import.meta.url))</h4>
<div>self.location.href = <a href="${e.data.href}">${e.data.href}</a></div>
`,
		);
	};
	testWorker.postMessage("ping");
}

function render(id, innerHTML) {
	document.getElementById(id).innerHTML = innerHTML;
}

main();
