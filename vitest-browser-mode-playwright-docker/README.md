# Vitest Browser Mode + Playwright WebKit via Docker

Workaround for platforms where Playwright WebKit isn't supported (e.g. Arch Linux).

## Idea

Run Playwright as a remote server in Docker, connect from host via `connectOptions`.

- https://playwright.dev/docs/docker#remote-connection
- https://vitest.dev/config/browser/playwright#connectoptions
- https://github.com/vitest-dev/vitest/discussions/9306

## Usage

```sh
# test with local playwright
pnpm test --browser=chromium

# test with remote playwright
docker compose up -d
REMOTE_PW=ws://127.0.0.1:6677/ pnpm test --browser=webkit
```
