export function errorFn() {
  errorFn2()
}

function errorFn2() {
  throw new Error("boom");
}
