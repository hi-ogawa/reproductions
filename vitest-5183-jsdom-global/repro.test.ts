// @vitest-environment jsdom

import { expect, test } from "vitest";
import { Readable } from "node:stream";
import fs from "node:fs";

test("ok", async () => {
	const array = new Uint8Array([1, 2, 3]);
	expect(array instanceof Uint8Array).toMatchInlineSnapshot(`true`)
	expect(array).toMatchInlineSnapshot(`
		Uint8Array [
		  1,
		  2,
		  3,
		]
	`);
})

test("not ok", async () => {
	const nodeReadable = fs.createReadStream("./hello.txt");
	const webReadable = Readable.toWeb(nodeReadable);
	const reader = webReadable.getReader();
	const result = await reader.read();
	expect(result.value instanceof Uint8Array).toMatchInlineSnapshot(`false`);
	expect(result.value).toMatchInlineSnapshot(`
		Uint8Array [
		  104,
		  101,
		  108,
		  108,
		  111,
		  10,
		]
	`)
})
