// @vitest-environment jsdom
import { expect, test } from "vitest";
import Module from "../dist/lib.js";

test("basic", async () => {
	const lib = await Module();
	expect(lib.hello("world")).toMatchInlineSnapshot(`"hello, world!"`);
});
