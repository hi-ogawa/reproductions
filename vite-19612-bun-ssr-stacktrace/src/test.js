export function test() {
  (function () {
    throw new Error("__TEST_ERROR__")
  })()
}
