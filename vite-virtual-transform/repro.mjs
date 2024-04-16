import { createServer, transformWithEsbuild, createFilter } from "vite";

async function main() {
  const server = await createServer({
    clearScreen: false,
    configFile: false,
    plugins: [
      createVirtualPlugin("test.tsx", () => {
        return `export default 0 as any;`;
      }),
    ],
  });

  {
    // virtual module doesn't go through esbuild
    const result = await server.transformRequest("virtual:test.tsx");
    console.log("[transformRequest]", result);
  }

  {
    // manually transform
    const result = await transformWithEsbuild(
      `export default 0 as any;`,
      "virtual:test.tsx"
    );
    console.log("[transformWithEsbuild]", result);
  }

  {
    // this is because of createFilter always skipping "\0"
    // https://github.com/rollup/plugins/blob/9e7f576f33e26d65e9f2221d248a2e000923e03f/packages/pluginutils/src/createFilter.ts#L48
    const filter = createFilter();
    console.log("[createFilter]");
    console.log(filter("virtual:text.tsx"));
    console.log(filter("\0virtual:text.tsx"));
  }

  await server.close();
}

function createVirtualPlugin(name, load) {
  name = "virtual:" + name;
  return {
    name: `virtual-${name}`,
    resolveId(source, _importer, _options) {
      return source === name ? "\0" + name : undefined;
    },
    load(id, options) {
      if (id === "\0" + name) {
        return load.apply(this, [id, options]);
      }
    },
  };
}

main();
