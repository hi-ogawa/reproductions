
//#region rolldown:runtime
var __defProp = Object.defineProperty;
var __export = (target, all) => {
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
};

//#endregion
//#region src/a.js
console.log("[a.js]");
const a = "a";

//#endregion
//#region src/b.js
console.log("[b.js]");
const b = "b";

//#endregion
//#region src/c.js
console.log("[c.js]");
const c = "c";

//#endregion
//#region src/index.js
var src_exports = {};
__export(src_exports, {
	a: () => a,
	c: () => c
});
console.log("[index.js]", { b });

//#endregion
//#region src/entry.js
console.log("[entry.js]", src_exports);

//#endregion