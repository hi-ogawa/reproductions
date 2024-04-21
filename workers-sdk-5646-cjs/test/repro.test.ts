import { test } from "vitest"
import * as lib from "test-optimized";
import semver from "semver";

test("repro", () => {
  console.log(semver.parse("v1.2.3"));
  console.log(lib.importMetaUrl)
});
