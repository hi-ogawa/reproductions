import * as testDepImage from "test-dep-image";
import * as testDepWorker from "test-dep-worker";

function main() {
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
		const div = document.createElement("pre");
		div.textContent = "worker = " + e.data;
		document.body.appendChild(div);
	});
}

main();
