import { test, expect } from "vitest";
import { f } from "./basic";

test("repro", () => {
	expect(f(1, 2)).toBe(3);
});
