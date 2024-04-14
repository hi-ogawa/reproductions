const { expect, test } = require("@jest/globals");

test("object, set, map", () => {
  function gen() {
    const obj = {
      a: new Set(),
      b: new Map(),
    };
    obj.a.add(obj);
    obj.b.set("k", obj);
    return obj;
  }
  expect(gen()).toEqual(gen());
});

test("object, set, set", () => {
  function gen() {
    const obj = {
      a: new Set(),
      b: new Set(),
    };
    obj.a.add(obj);
    obj.b.add(obj);
    return obj;
  }
  expect(gen()).toEqual(gen());
});

test("array, set, set", () => {
  function gen() {
    const obj = [new Set(), new Set()];
    obj[0].add(obj);
    obj[1].add(obj);
    return obj;
  }
  expect(gen()).toEqual(gen());
});
