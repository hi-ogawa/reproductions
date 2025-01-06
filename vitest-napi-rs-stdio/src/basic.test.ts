import { test } from "vitest";
import testDepNapi from "test-dep-napi";

test("basic", async () => {
  let i = 0;
  setInterval(() => {
    testDepNapi.testLog("basic hello! " + i++)
  }, 200);
  await new Promise(r => setTimeout(r, 2000));
});
