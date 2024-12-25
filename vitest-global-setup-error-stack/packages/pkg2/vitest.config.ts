import { defineProject } from 'vitest/config'

export default defineProject({
  test: {
    globalSetup: ['./global-setup.ts']
  },
})
