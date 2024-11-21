import { writeFileSync } from "fs";
import { join } from "path";
import * as rolldown from "rolldown";

process.setSourceMapsEnabled(true);

async function main() {
  const build = await rolldown.rolldown({
    input: 'src/entry.js',
    external: ['test-external'],
    plugins: [
      {
        name: 'patch-runtime',
        renderChunk() {
        }
      }
    ]
  });
  const result = await build.write({
    format: 'app',
    sourcemap: "inline",
    dir: 'dist',
  });

  const runner = new RolldownModuleRunner();
  const output = result.output[0];
  const outputFile = join(import.meta.dirname, 'dist', output.fileName);
  runner.evaluate(output.code, outputFile);

  const mod = runner.context.rolldown_runtime.moduleCache['src/entry.js'].exports;
  mod.main();
}

// cf. https://github.com/rolldown/vite/pull/66
class RolldownModuleRunner {
  context = {
    rolldown_runtime: {},
    WebSocket: class NoopWebSocket {}
  }

  evaluate(code, sourceURL) {
    const context = {
      self: this.context,
      ...this.context,
    }
    // extract sourcemap and append to last
    const sourcemap = code.match(/^\/\/# sourceMappingURL=.*/m)?.[0] ?? ''
    if (sourcemap) {
      code = code.replace(sourcemap, '')
    }
    code = `\
'use strict';(${Object.keys(context).join(',')})=>{{${code}}}
//# sourceURL=${sourceURL}
//# sourceMappingSource=rolldown-module-runner
${sourcemap}
`;
    const fn = (0, eval)(code)
    fn(...Object.values(context))
  }
}

main()
