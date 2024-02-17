/// <reference types="vitest" />

import { defineConfig } from 'vite'

export default defineConfig({
  // target ESM version directly only for this package via alias
  test: {
    alias: {
      "diagram-js-grid": "diagram-js-grid/dist/index.esm.js"
    }
  },

  // or explicitly use same default as Vite
  // but this might surface bugs from other bad packages
  // resolve: {
  //   mainFields: ['module'],
  // },
})
