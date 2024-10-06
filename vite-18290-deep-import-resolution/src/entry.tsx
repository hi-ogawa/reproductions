// [ok] should fail
import testDep from "test-dep/deep/foo";

// // [ok]
// import testDep from "test-dep/deep/foo.js";

// [not ok] expected
//   Missing "./deep/foo" specifier in "test-dep-2" package
// import testDep from "test-dep-2/deep/foo";

// [ok]
// import testDep from "test-dep-2/deep/foo.js";

document.getElementById("root")!.innerHTML = `
<pre>${testDep}</pre>
`;
