import { createServer, transformWithEsbuild } from "vite";

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
    // virtual module doesn't go through esbuild?
    const result = await server.transformRequest("virtual:test.tsx");
    console.log("[transformRequest]", result);
  }

  {
    const result = await transformWithEsbuild(
      `export default 0 as any;`,
      "virtual:test.tsx"
    );
    console.log("[transformWithEsbuild]", result);
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
