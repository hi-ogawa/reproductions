import dep2 from "./dep2.js";

async function main() {
	const dep1 = await import("./dep1.js");
	console.log(dep1, dep2);
}

main();
