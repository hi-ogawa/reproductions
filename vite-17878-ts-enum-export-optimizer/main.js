import { Status } from "test-dep-ts-enum";

async function main() {
	document.getElementById("root").textContent = "test: " + Status.GREEN;
}

main();
