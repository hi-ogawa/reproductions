import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    fileParallelism: false,
    reporters: [
      "default",
      {
        onFinished(files, errors, coverage) {
          for (const file of files) {
            console.log(file.name, file.collectDuration)
          }
        },
      }
    ]
  }
})
