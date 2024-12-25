export type RandomSpacesToTestSourceMap = {
  x: number
}
// x
// x
export default function setup() {
  // x
  // x
  console.log("=== pkg2/setup ===")
  f1();
  return () => {
    console.log("=== pkg2/teardown ===")
    f1();
  }
}
// x
// x
function f1() {
  f2();
}
// x
// x
function f2() {
  console.log(new Error("TEST_STACK").stack?.split("\n").slice(0, 4))
}
