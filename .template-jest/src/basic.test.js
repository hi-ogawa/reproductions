const { test, expect } = require("@jest/globals");

test("repro", () => {
  expect(1 + 1).toBe(2);
});
