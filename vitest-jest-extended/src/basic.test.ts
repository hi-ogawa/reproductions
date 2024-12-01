import { test, expect } from "vitest";

test("basic", async () => {
  expect(2).toEqual(expect.toBeOneOf([1, 2, 3]))
});
