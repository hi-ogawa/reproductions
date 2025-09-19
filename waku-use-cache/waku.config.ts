import { defineConfig } from 'waku/config';
import tailwindcss from '@tailwindcss/vite';
import { useCachePlugin } from 'vite-plugin-react-use-cache';

export default defineConfig({
  middleware: [
    'waku/middleware/context',
    "./src/use-cache-middleware",
    'waku/middleware/handler',
  ],
  vite: {
    plugins: [
      tailwindcss(),
      useCachePlugin(),
    ],
  },
});
