import * as testDepImage from "test-dep-image";

function main() {
	const el = document.getElementById("test");
	el.textContent = JSON.stringify([testDepImage.imageUrl], null, 2);
}

main();
