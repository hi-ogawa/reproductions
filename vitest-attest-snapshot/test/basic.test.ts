import { test, expect } from "vitest";
import { attest } from "@ark/attest";

expect.addSnapshotSerializer({
  test(val: unknown) {
    // TODO: val instanceof ChainableAssertions
    return (
      !!val &&
      typeof val === "object" &&
      "constructor" in val &&
      typeof val.constructor === "function" &&
      val.constructor.name === "ChainableAssertions"
    );
  },
  serialize(val, _config, _indentation, _depth, _refs, _printer) {
    return val.type.toString.serializedActual;
  },
});

test("snap", () => {
  expect(attest(new Date())).toMatchInlineSnapshot(`Date`);
  expect(attest(1 + 2)).toMatchInlineSnapshot(`number`);
  expect(attest((1 + 2).toString)).toMatchInlineSnapshot(
    `(radix?: number | undefined) => string`,
  );
  expect(attest([1, "2", true] as const)).toMatchInlineSnapshot(
    `readonly [1, "2", true]`,
  );
});
