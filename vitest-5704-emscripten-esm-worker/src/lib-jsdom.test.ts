// @vitest-environment jsdom
import { test } from "vitest";
import Module from "../dist/lib.js";

test.fails("basic", async () => {
	await Module();
});
