globalThis.__testGlobal ??= 0;
globalThis.__testGlobal++;

export function testServerState() {
  console.log("[testServerState]", globalThis.__testGlobal);
}
