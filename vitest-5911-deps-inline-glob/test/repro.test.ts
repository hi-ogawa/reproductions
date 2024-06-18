import { test } from "vitest";
// @ts-ignore
import pkg from "@test-pkg/pkg";

test("repro", () => {
	console.log({ pkg });
});
