import * as testDepImage from "test-dep-image";
import * as testDepWorker from "test-dep-worker";

function main() {
	document.getElementById("test").textContent = JSON.stringify(
		[testDepImage.image1, testDepImage.image2, testDepWorker.workerUrl],
		null,
		2,
	);

	// image
	const img = document.createElement("img");
	img.src = testDepImage.image1;
	document.body.appendChild(img);

	// worker
	testDepWorker.startWorker();
}

main();
