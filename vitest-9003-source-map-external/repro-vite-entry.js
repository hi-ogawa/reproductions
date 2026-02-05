import { outer } from "test-esm-external";

function userFn() {
  throw new Error("boom");
}

outer(userFn);
