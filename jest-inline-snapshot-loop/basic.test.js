const { test, expect } = require("@jest/globals");

test("snap", () => {
	for (const str of ["foo", "bar"]) {
		expect(str).toMatchInlineSnapshot();
	}
});
