import { defineConfig } from "rollup"
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default defineConfig({
  input: {
    virtual: "virtual.js",
    actual: "./src/actual.js",
  },
  output: {
    dir: "./dist/rollup"
  },
  plugins: [
    {
      name: "repro",
      resolveId(source) {
        if (source === "virtual.js") {
          return "\0" + source;
        }
      },
      load(id) {
        if (id === "\0virtual.js") {
          return `
            import slash from "slash";
            console.log(slash);
          `;
        }
      }
    },
    nodeResolve(),
  ],
});
