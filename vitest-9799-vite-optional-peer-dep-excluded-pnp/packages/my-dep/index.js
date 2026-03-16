export function hello() {
  return "ok";
}

export async function callPeerDep() {
  return await import("foobar");
}
