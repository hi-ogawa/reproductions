import * as testDepImage from "test-dep-image";
import * as testDepWorker from "test-dep-worker";
import initSwc, { transformSync } from "@swc/wasm-web";

async function main() {
	document.getElementById("test").textContent = JSON.stringify(
		[testDepImage.image1, testDepImage.image2],
		null,
		2,
	);

	// image
	const img = document.createElement("img");
	img.src = testDepImage.image1;
	img.width = "40";
	document.body.appendChild(img);

	// worker
	testDepWorker.startWorker((e) => {
		const el = document.createElement("pre");
		el.textContent = "worker = " + e.data;
		document.body.appendChild(el);
	});

	await initSwc();
	const elSwc = document.createElement("pre");
	elSwc.textContent = "@swc/wasm-web = " + transformSync("() => 42", {}).code;
	document.body.appendChild(elSwc);
}

main();
