import { createServer, createServerModuleRunner, DevEnvironment } from "vite";
import deno from "@deno/vite-plugin";

const server = await createServer({
  configFile: false,
  optimizeDeps: {
    noDiscovery: true,
  },
  plugins: [
    deno(),
    // {
    //   name: 'repro',
    //   resolveId(source, importer, options) {
    //     if (source === '@std/assert') {
    //       return { id: source, external: true  }
    //     }
    //   }
    // }
  ],
  // ssr: {
  //   external: ['@std/assert']
  // },
  environments: {
    custom: {
      dev: {
        createEnvironment: (name, config, context) => {
          class MyEnvironment extends DevEnvironment {
            async fetchModule(id, importer, options) {
              console.log({ id, importer });
              // TODO: deno info to resolve external?
              // https://github.com/denoland/deno-vite-plugin/blob/895724634320eb5946c8c606f2e6f342976b4c0c/src/resolver.ts#L80
              // if (id === "@std/assert") {
              //   return { externalize: id, type: "builtin" };
              // }
              return super.fetchModule(id, importer, options);
            }
          }
          return new MyEnvironment(name, config, context);
        },
      },
    },
  },
});
await server.listen();
// await server.ssrLoadModule("/src/entry");

const runner = createServerModuleRunner(server.environments.custom, {
  sourcemapInterceptor: "prepareStackTrace",
  hmr: false,
});
await runner.import("/src/entry");

await server.close();
