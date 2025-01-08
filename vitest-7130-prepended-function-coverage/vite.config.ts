import { defineConfig } from 'vitest/config'
import MagicString from "magic-string"

export default defineConfig({
  test: {
    coverage: {
      // provider: "istanbul",
      reporter: ['text', 'text-summary', 'html', 'clover', 'json'],
    },
  },
  plugins: [
    {
      name: 'repro',
      transform(code, id, options) {
        if (id.endsWith("/basic.ts")) {
          console.log(code)
          const output = new MagicString(code);
          output.prepend("function prepended(){};")
          output.append("function appended(){};")
          return {
            code: output.toString(),
            map: output.generateMap({ hires: "boundary" })
          }
        }
      },
    }
  ]
})
