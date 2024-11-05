import { test, expect, type Assertion } from "vitest";
import { attest, caller, getTypeAssertionsAtPosition } from "@ark/attest";

//
// via custom vitest snapshot seiralizer
// Q. easier way to detect ChainableAssertions and proxy etc..?

// for attest().type.toString and type.errors
expect.addSnapshotSerializer({
  test(val: unknown) {
    return (
      !!val &&
      typeof val === "function" &&
      typeof (val as any).snap === "function"
    );
  },
  serialize(val, _config, _indentation, _depth, _refs, _printer) {
    return val.serializedActual;
  },
});

// for attest() to work like attest().type.toString
expect.addSnapshotSerializer({
  test(val: unknown) {
    return (
      !!val &&
      typeof val === "object" &&
      "snap" in val &&
      typeof val.snap === "function"
    );
  },
  serialize(val, _config, _indentation, _depth, _refs, _printer) {
    return val.type.toString.serializedActual;
  },
});

test("snap", (ctx) => {
  if (process.env["ATTEST_skipTypes"]) {
    ctx.skip();
  }

  expect(attest(1 + 2).type.toString).toMatchInlineSnapshot(`number`);
  expect(attest("1" + 2).type.toString).toMatchInlineSnapshot(`string`);
  expect(
    attest(
      () =>
        // prettier-ignore
        // @ts-expect-error
        "1" / 2,
    ).type.errors,
  ).toMatchInlineSnapshot(
    `The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.`,
  );

  // make it work like .type.toString by default
  expect(attest(1 + 2)).toMatchInlineSnapshot(`number`);
  expect(attest("1" + 2)).toMatchInlineSnapshot(`string`);

  // Q. easier to get `completions`?
  function getCompletions(t: any) {
    t.completions; // getter side effect seems to do magic
    return t.serializedActual;
  }
  expect(
    getCompletions(
      attest(
        () =>
          // prettier-ignore
          // @ts-expect-error
          (1 + 2)["to"],
      ),
    ),
  ).toMatchInlineSnapshot(`
    {
      "to": [
        "toExponential",
        "toFixed",
        "toLocaleString",
        "toPrecision",
        "toString",
      ],
    }
  `);
});

//
// via custom attest alias
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

test("custom attest alias", () => {
  expectType((1 + 2).toFixed).toMatchInlineSnapshot(
    `"(fractionDigits?: number | undefined) => string"`,
  );
  expectType((1 + 3).toPrecision).toMatchSnapshot();
});
