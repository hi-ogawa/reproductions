// @vitest-environment happy-dom
import { test } from "vitest";
import Module from "../dist/lib.js";

// TypeError: The URL must be of scheme file
//  ❯ Module.default dist/lib.js:142:37
//     140|    // since there's no way getting the current absolute path of the module when
//     141|    // support for that is not available.
//     142|    scriptDirectory = require("url").fileURLToPath(
//        |                                     ^
//     143|     new URL("./", import.meta.url),
//     144|    ); // includes trailing slash

test.fails("basic", async () => {
	await Module();
});
