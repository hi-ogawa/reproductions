import { defineConfig } from 'vite';
import analog from '@analogjs/platform';
import { fontless } from "fontless"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
  },
  plugins: [
    fontless({
      provider: 'google',
      defaults: {
        preload: true,
      }
    }),
    analog({
      // ssr: false,
      // static: true,
      // prerender: {
      //   routes: [],
      // },
    }),
  ],
}));
