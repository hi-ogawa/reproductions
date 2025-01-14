import { test } from 'vitest'
import testDep from "@vitejs/test-dep"

test('repro', () => {
  console.log("@vitejs/test-dep =>", testDep);
})
