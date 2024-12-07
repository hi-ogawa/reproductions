export function throwError() {
  console.log("=== 'this' inside 'throwError'===")
  console.log(this)

  console.log("=== Error.stack from 'throwError' ===")
  console.log(new Error("DEMO_STACKS").stack);
}
