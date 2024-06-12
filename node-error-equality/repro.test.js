import { test } from "node:test";
import assert from "node:assert";

test("message", () => {
	assert.deepStrictEqual(new Error("a"), new Error("b"));
});

test("cause 1", () => {
	assert.deepStrictEqual(new Error("a"), new Error("a", { cause: "x" }));
});

test("cause 2", () => {
	assert.deepStrictEqual(new Error("a", { cause: "x" }), new Error("a"));
});

test("cause 3", () => {
	assert.deepStrictEqual(
		new Error("a", { cause: "x" }),
		new Error("a", { cause: "y" }),
	);
});
