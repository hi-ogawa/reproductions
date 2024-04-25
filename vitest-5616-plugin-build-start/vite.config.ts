import { defineConfig } from "vitest/config"

export default defineConfig({
  plugins: [
    {
      name: "repro1",
      buildStart() {
        console.log("@buildStart(normal)")
      },
      resolveId(source, importer, options) {
        console.log("@resolveId(normal)", { source })
      },
      transform(code, id, options) {
        console.log("@transform(normal)", { id })
      },
    },
    {
      name: "repro2",
      enforce: "pre",
      buildStart() {
        console.log("@buildStart(pre)")
      },
      resolveId(source, importer, options) {
        console.log("@resolveId(pre)", { source })
      },
      transform(code, id, options) {
        console.log("@transform(pre)", { id })
      },
    }
  ]
})
