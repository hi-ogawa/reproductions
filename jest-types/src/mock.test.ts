// https://jestjs.io/docs/mock-function-api#jestmockt

import { test, jest } from "@jest/globals";

test("example", () => {
  const add = (a: number, b: number) => a + b;
  const mockAdd = jest.fn<typeof add>();
  mockAdd;
});

test("assignability", () => {
  const t = jest.fn(() => true);
  t.mockImplementation;

  const t0 = jest.fn<() => true>(() => true);

  jest.fn<() => true>(() => true) satisfies jest.Mock<() => boolean>;

  jest.fn<() => true>(() => true).mockImplementation satisfies jest.Mock<
    () => boolean
  >["mockImplementation"];

  const t1: jest.Mock<() => boolean> = jest.fn(() => true);
  t1.mockImplementation = t0.mockImplementation;

  // cf. https://typescript-eslint.io/rules/method-signature-style/
  type F<T> = {
    foo(f: T): void;
  };
  type G<T> = {
    foo: (f: T) => void;
  };
  const val = <T>() => 0 as T;

  val<F<boolean>>() satisfies F<true>;
  val<F<true>>() satisfies F<boolean>;
  val<G<boolean>>() satisfies G<true>;

  // @ts-expect-error
  // Type 'G<true>' does not satisfy the expected type 'G<boolean>'.
  //   Type 'boolean' is not assignable to type 'true'.ts(1360)
  val<G<true>>() satisfies G<boolean>;

  // https://www.typescriptlang.org/play?#code/PTAEGMDMDoCgVACwC7IA4GcBcJkE80BTDcAJwEs1kBaYgG3IDtlpyB7YUgVzuOAFtCyRGwAm1DOQDmjAIbIupQhPy9g8MCnTYQU8sK4AjaODb8B5MmwxtIyYABUChAMplK9tDzrAAjAA4ANgBWABZYWFBQAAoAb0io0Eg2NmiANyxQZG5CAEpQWIBfABoEwvyMeXIMSHJiAoSo5NSM0EMU3llGXMy0tnJRAG4y4YS4xqSUzPTM7K480ABeAD4CkrKKqpq6jAbEyZbM9rZO7t7+oZGIqPH95pmsnPyi0qjy0Erkatr6+LupmKtY6nfIrUB9AbDN6jG5-RLNaatOYLMEvDYfLY-XZwpoAh7AwhdUGrCGXaEJIA
  ({
    foo(v: true) {},
  }) satisfies {
    foo(v: boolean): void;
  };

  ({
    foo: (v: true) => {},
  }) satisfies {
    foo(v: boolean): void;
  };

  ({
    // @ts-expect-error
    foo(v: true) {},
  }) satisfies {
    foo: (v: boolean) => void;
  };

  ({
    // @ts-expect-error
    foo: (v: true) => {},
  }) satisfies {
    foo: (v: boolean) => void;
  };
});
