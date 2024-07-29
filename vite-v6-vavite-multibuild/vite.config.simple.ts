import { defineConfig, Plugin} from "vite"

export default defineConfig((env) => ({
  build: env.isSsrBuild ? {
    ssr: true,
    outDir: "dist/server",
    rollupOptions: {
      input: "/src/entry-server",
    },
  } : {
    outDir: "dist/client",
    rollupOptions: {
      input: "/src/entry-client",
    },
  },
  plugins: [testPlugin()],
}))

function testPlugin(): Plugin {
  const who = Math.random().toString(36).slice(2)
  console.log("[testPlugin]", who)
  return {
    name: "test",
    config(config, env) {
      console.log("[config]", { who })
    },
    configResolved(config) {
      console.log("[configResolved]", { who })
    },
  }
}
