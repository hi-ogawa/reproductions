import { test, expect } from "vitest";

test("ten times 2", async () => {
  new Promise((resolve) => setTimeout(resolve, 50));
  expect(10 * 2).toBe(20);
});
