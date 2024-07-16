import { rm, writeFile } from "fs/promises";
import path from "node:path";
import { test } from "vitest";

test("relative error", async () => {
	await writeFile("src/generated.js", "export default 'hello'");

	// @ts-ignore
	const mod = await import("./generated.js");
	console.log(mod);
});

test("absolute ok", async () => {
	await writeFile("src/generated.js", "export default 'hello'");

	// @ts-ignore
	const mod = await import(path.join(import.meta.dirname, "./generated.js"));
	console.log(mod);
});
