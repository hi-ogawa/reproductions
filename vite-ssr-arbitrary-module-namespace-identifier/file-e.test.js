import { expect } from "vitest";
import { getValue } from "./file-1.js";
import { test } from "vitest";

test("works", () => {
	const value = getValue();
	expect(value).toBe("Something");
});
