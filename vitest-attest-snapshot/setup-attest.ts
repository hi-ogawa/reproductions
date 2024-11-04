import type { GlobalSetupContext } from "vitest/node";
import { execFileSync } from "child_process";
import { mkdirSync } from "fs";

// TODO: for now we use cli since running `setup` repeatedly doesn't work
// (probably ts server fs in memory is stale and we can invalidate on re-run via vfs.updateFile?)
// import { setup } from "@ark/attest";

async function setup2() {
  mkdirSync(".attest/assertions", { recursive: true });
  execFileSync("attest", ["precache", ".attest/assertions/typescript.json"], {
    stdio: "inherit",
  });
}

export default async (ctx: GlobalSetupContext) => {
  if (process.env["ATTEST_skipTypes"] === "1") {
    return;
  }

  await setup2();
  ctx.onWatcherRerun(async () => {
    await setup2();
  });
};
