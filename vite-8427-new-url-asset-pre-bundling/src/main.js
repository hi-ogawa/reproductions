import * as testDepImage from "test-dep-image";

function main() {
	document.getElementById("test").textContent = JSON.stringify(
		[testDepImage.imageUrl],
		null,
		2,
	);
	document.body.appendChild(testDepImage.createImageElement());
}

main();
