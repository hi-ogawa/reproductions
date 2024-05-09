const { describe, test } = require("@jest/globals");
const im = require("immutable");

test("repro", () => {
	const x = im.List([{ x: 1 }]);
	const y = im.List([1]).map((i) => ({ x: i }));
	console.log("[x._tail]", x._tail);
	console.log("[y._tail]", y._tail);
	expect(x).toEqual(y);
});
