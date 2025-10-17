import { defineConfig } from "vite"
import preact from "@preact/preset-vite";

export default defineConfig({
  clearScreen: false,
  plugins: [
    preact(),
    {
      name: 'ssr-middleware',
      configureServer(server) {
        return () => {
          server.middlewares.use((_req, res, _next) => {
            res.end(`\
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
    <script type="module" src="/src/entry.client.tsx"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`);
          })
        }
      }
    }
  ]
})
