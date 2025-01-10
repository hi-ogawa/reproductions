import { defineConfig } from "vite"

export default defineConfig({
  environments: {
    client: {
      build: {
        minify: false,
        outDir: './dist/client',
        rollupOptions: {
          input: {
            test1: './src/test1/index.js',
            test2: './src/test2/index.js',
            test3: './src/test3/index.js',
            test4: './src/test4/index.js',
            test5: './src/test5/index.js',
            test6: './src/test6/index.js',
          },
          preserveEntrySignatures: "allow-extension",
          output: {
            entryFileNames: '[name].js'
          }
        }
      }
    },
    ssr: {
      build: {
        outDir: './dist/server',
        rollupOptions: {
          input: {
            test1: './src/test1/index.js',
            test2: './src/test2/index.js',
            test3: './src/test3/index.js',
            test4: './src/test4/index.js',
            test5: './src/test5/index.js',
            test6: './src/test6/index.js',
          }
        }
      }
    }
  }
})
