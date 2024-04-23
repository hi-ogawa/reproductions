"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// https://jestjs.io/docs/mock-function-api#jestmockt
var globals_1 = require("@jest/globals");
(0, globals_1.test)("example", function () {
  var add = function (a, b) {
    return a + b;
  };
  var mockAdd = globals_1.jest.fn();
  mockAdd;
});
(0, globals_1.test)("const", function () {
  var t1 = globals_1.jest.fn(function () {
    return true;
  });
  t1.mockImplementation;
  var t2 = globals_1.jest.fn(function () {
    return true;
  });
  t2.mockImplementation;
});
