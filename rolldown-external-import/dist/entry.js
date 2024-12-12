import "@rolldown/test-dep-external";

//#region rolldown:runtime
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) =>
	function () {
		return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])((fn = 0))), res;
	};

//#endregion
//#region src/dep.js
var init_dep = __esm({
	"src/dep.js"() {
		console.log("[importing dep.js]");
	},
});

//#endregion
//#region src/entry.js
var init_entry = __esm({
	"src/entry.js"() {
		init_dep();
	},
});

//#endregion
init_entry();
