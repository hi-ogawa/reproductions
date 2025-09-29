import { fontless } from "fontless"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  ui: {
    fonts: false,
  },

  vite: {
    plugins: [
      {
        // TODO: fixed by https://github.com/unjs/fontaine/pull/665
        name: 'cache-dev-font',
        configureServer(server) {
          server.middlewares.use("/_nuxt/_fonts", (_req, res, next) => {
            res.setHeader("cache-control", "public, max-age=31536000, immutable");
            next();
          })
        },
      },
      fontless({
        provider: 'google',
        defaults: {
          preload: true,
        },
        assets: {
          // TODO: fixed by https://github.com/unjs/fontaine/pull/666
          prefix: '/_nuxt/_fonts',
        }
      }),
    ],
  },
})
