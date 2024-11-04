import { test, expect, type Assertion } from "vitest";
import { attest, caller, getTypeAssertionsAtPosition } from "@ark/attest";

//
// via custom vitest snapshot seiralizer
//
expect.addSnapshotSerializer({
  test(val: unknown) {
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

test("snap", (ctx) => {
  if (process.env["ATTEST_skipTypes"]) {
    ctx.skip()
  }

  expect(attest(new Date())).toMatchInlineSnapshot(`Date`);
  expect(attest(1 + 2)).toMatchInlineSnapshot(`number`);
  expect(attest((1 + 2).toString)).toMatchInlineSnapshot(
    `(radix?: number | undefined) => string`,
  );
  expect(attest([1, "2", true] as const)).toMatchInlineSnapshot(
    `readonly [1, "2", true]`,
  );
});

//
// via custom attest assertion
//
function expectType(_actualValue: unknown): Assertion<any> {
  if (process.env["ATTEST_skipTypes"]) {
    // return no-op proxy
    return new Proxy(
      {},
      {
        get: () => () => {},
      },
    ) as any;
  }
  const position = caller();
  const types = getTypeAssertionsAtPosition(position);
  return expect(types[0][1].args[0].type);
}

test("custom", () => {
  expectType((1 + 2).toFixed).toMatchInlineSnapshot(
    `"(fractionDigits?: number | undefined) => string"`,
  );
  expectType((1 + 3).toString).toMatchSnapshot()
});
