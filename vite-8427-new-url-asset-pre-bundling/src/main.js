import * as testDepImage from "test-dep-image";

function main() {
	document.getElementById("test").textContent = JSON.stringify(
		[testDepImage.image1, testDepImage.image2],
		null,
		2,
	);
	document.body.appendChild(testDepImage.createImageElement());
}

main();
