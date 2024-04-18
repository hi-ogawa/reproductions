import { test, expect } from "vitest";

test("repro", () => {
  // v1.4.0
  [
    false,
    true,
    true,
    "",
    "1",
    "1"
  ];

  // v1.5.0
  [
    true,
    true,
    true,
    "false",
    "true",
    "1"
  ];

  console.log([
    import.meta.env.PROD,
    import.meta.env.DEV,
    import.meta.env.SSR,
    process.env.PROD,
    process.env.DEV,
    process.env.SSR,
  ]);
});
