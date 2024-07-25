import * as rolldown from "rolldown";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

async function main() {
  const bundle = await rolldown.rolldown({
    cwd: import.meta.dirname,
    // works if single entry
    input: ["vue", "foo"],
    resolve: {
      alias: {
        "foo": "vue",
        // works if removed
        "@vue/shared": require.resolve("@vue/shared/dist/shared.cjs.prod.js"),
      },
    }
  });
  await bundle.write({
    format: "esm",
  });
  process.exit(0);
}

main();
