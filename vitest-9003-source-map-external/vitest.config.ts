import { defineConfig } from 'vitest/config';
import preact from '@preact/preset-vite';
import { playwright } from '@vitest/browser-playwright'

export default defineConfig({
  plugins: [preact()],
  test: {
    environment: 'happy-dom',
    // browser: {
    //   provider: playwright(),
    //   enabled: true,
    //   instances: [
    //     { browser: 'chromium' },
    //   ],
    // }
  },
});
