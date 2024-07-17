import { writeFile } from "node:fs/promises";

async function main() {
	await writeFile("src/generated.js", "export default 'hello'");
	const mod = await import("./generated.js");
	console.log(mod);
}

main();
