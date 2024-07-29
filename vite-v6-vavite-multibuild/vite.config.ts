import { defineConfig, Plugin} from "vite"
import type {} from "@vavite/multibuild";

export default defineConfig({
  buildSteps: [
    {
      name: "client",
      config: {
        build: {
          outDir: "dist/client",
          rollupOptions: {
            input: "/src/entry-client",
          },
        },
      },
    },
    {
      name: "server",
      config: {
        build: {
          ssr: true,
          outDir: "dist/server",
          rollupOptions: {
            input: "/src/entry-server",
          },
        },
      },
    },
  ],
  plugins: [testPlugin()],
})

function testPlugin(): Plugin {
  const who = Math.random().toString(36).slice(2)
  console.log("[testPlugin]", who)
  return {
    name: "test",
    buildStepStart(_info, forwarded) {
      console.log("[buildStepStart]", { who, forwarded });
    },
    buildStepEnd() {
      console.log("[buildStepEnd]", { who });
      return who;
    },
  }
}
