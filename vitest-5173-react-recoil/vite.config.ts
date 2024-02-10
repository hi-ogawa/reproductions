/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    // server: {
    //   deps: {
    //     inline: ["recoil-sync", "recoil"]
    //   }
    // }
  },
});
