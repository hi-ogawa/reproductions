import { defineConfig } from "vite"

export default defineConfig({
  ssr: {
    resolve: {
      conditions: ['test1']
    },
  },
  plugins: [
    {
      name: 'repro',
      config() {
        return {
          environments: {
            ssr: {
              resolve: {
                conditions: ['test2']
              }
            }
          }
        }
      },
      configResolved(config) {
        console.log(config.ssr.resolve?.conditions) // => ['test2']
        console.log(config.environments.ssr.resolve.conditions) // => ['test2']
      },
    }
  ]
})
