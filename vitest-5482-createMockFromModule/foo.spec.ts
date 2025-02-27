import { vi, test, expect } from "vitest";
import { addOne, minusOne } from "./foo";

vi.mock(import("./foo"), async (importOriginal) => {
  const original = await importOriginal();
  // use automocking utility provided by @vitest/mocker
  const { vi } = await import("vitest");
  const { mockObject } = await import("@vitest/mocker");
  const mocked = mockObject(
    {
      type: "automock",
      spyOn: vi.spyOn,
      globalConstructors: {
        Object,
        Function,
        RegExp,
        Array,
        Map,
      },
    },
    original,
  );
  return {
    ...mocked,               // mock all exports
    addOne: original.addOne, // expect this one
  };
});

test("foo", () => {
  expect(vi.isMockFunction(addOne)).toBe(false)
  expect(addOne(1)).toBe(2);
});

test("bar", () => {
  expect(vi.isMockFunction(minusOne)).toBe(true)
  expect(minusOne(1)).toBe(undefined);
});
