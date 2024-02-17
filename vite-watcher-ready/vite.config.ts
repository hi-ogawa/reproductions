import { defineConfig } from 'vite';

export default defineConfig({
  clearScreen: false,
  plugins: [
    {
      name: 'repro',
      configureServer(server) {
        let i = 0;
        server.watcher.on('ready', () => {
          console.log('[watcher:ready]', i++);
        });
      },
    },
  ],
});
