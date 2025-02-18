import { transform } from "rolldown/experimental"
import fs from "node:fs"

async function main() {
  const code = fs.readFileSync('repro.ts', 'utf-8')
  const result = transform("repro.ts", code, {
    target: 'es2020',
    assumptions: {
      // neither true or false works
      setPublicClassFields: true,
    }
  })
  console.log("==== output ====")
  console.log(result.code)
}

main()
