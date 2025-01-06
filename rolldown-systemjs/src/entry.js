import dep2 from "./dep2.js";

async function main() {
	const dep1 = await import("./dep1.js");
	console.log(dep1, dep2);
	console.log("[dep3.txt] ", new URL("./dep3.txt", import.meta.url).href);
}

main();
