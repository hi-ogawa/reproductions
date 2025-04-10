import { createServer } from "vite"

async function main() {
  const server = await createServer({
    configFile: false,
  });

  const code = `\
import 'a'
import b from 'b'
import { c } from 'c'
import * as d from 'd'
export default {}
export { b, c }
export { d as e }
`

  const count = parseInt(process.env["BENCH_COUNT"] || 10000);
  for (let i = 0; i < count; i++) {
    await server.ssrTransform(code, { mappings: '' }, '/test.js');
  }

  await server.close();
}

main();
