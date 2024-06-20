import React from "react";
import { expect, test } from "vitest";

test("repro", () => {
	let count = 0;
	const fn = React.cache(() => {
		console.log("hello!!");
		count++;
	});
	fn();
	fn();
	expect(count).toMatchInlineSnapshot(`2`);
});
