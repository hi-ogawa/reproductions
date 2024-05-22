import "@vitest/web-worker";
import { expect, test } from "vitest";

test("basic", async () => {
	const worker = new Worker(new URL("./lib-worker.ts", import.meta.url));
	const promise = new Promise((resolve) => {
		worker.onmessage = (e) => {
			resolve(e.data);
		};
	});
	worker.postMessage({});
	expect(await promise).toMatchInlineSnapshot(`"hello, world!"`);
});
