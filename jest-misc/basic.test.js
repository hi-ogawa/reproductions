const { expect, test } = require("@jest/globals");

class Foo {
  constructor(value) {
    this.value = value;
  }
}

class Bar {
  constructor(value) {
    this.value = value;
  }
}

test("foo ok", () => {
  expect(new Bar(2)).toMatchObject(new Foo(2));
});

test("foo fail", () => {
  expect(new Bar(2)).toMatchObject(new Foo(1));
  // - Foo {
  // -   "value": 1,
  // + Object {
  // +   "value": 2,
  //   }
});

test("plain ok ", () => {
  expect(new Bar(2)).toMatchObject({ value: 2 });
});

test("plain fail", () => {
  expect(new Bar(2)).toMatchObject({ value: 1 });
  // Object {
  // -   "value": 1,
  // +   "value": 2,
  //   }
});
