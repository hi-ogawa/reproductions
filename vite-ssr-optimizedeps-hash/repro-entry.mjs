import cookie from "cookie"; // optimized/inline cjs
import semver from "semver"; // external cjs
import * as esm from "@hiogawa/utils"; // inlined esm

export function main() {
  console.log(cookie);
  console.log(semver.parse("1.2.3"));
  console.log(esm.sleep);
}
