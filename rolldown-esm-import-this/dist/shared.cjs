"use strict";

//#region src/shared.js
function throwError() {
	console.log("== 'this' inside 'throwError'===");
	console.log(this);
	console.log("=== Error.stack from 'throwError' ===");
	console.log(new Error("DEMO_STACKS").stack);
}

//#endregion
Object.defineProperty(exports, 'throwError', {
  enumerable: true,
  get: function () {
    return throwError;
  }
});