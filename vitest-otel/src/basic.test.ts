import { test, expect } from "vitest";
import { sleep } from "./basic";

test("basic", async () => {
  await sleep(100);
  expect(1 + 1).toBe(2);
});
