import { describe } from "vitest"
import { bench } from "vitest"
import { createServer } from "vite"

describe('ssrTransform', async () => {
  const server = await createServer({
    configFile: false,
  });

  const code = `\
import 'a'
import b from 'b'
import { c } from 'c'
import * as d from 'd'
export default {};
export { b, c }
export { d as e };
`

  bench("old", async () => {
    await server.ssrTransform(code, { mappings: '' }, '/test.js');
  }, {
    setup() {
      process.env["ROLLDOWN_VITE_OLD_MODULE_RUNNER_TRANSFORM"] = "true"
    }
  })

  bench("oxc", async () => {
    await server.ssrTransform(code, { mappings: '' }, '/test.js');
  }, {
    setup() {
      delete process.env["ROLLDOWN_VITE_OLD_MODULE_RUNNER_TRANSFORM"];
    }
  })
})
