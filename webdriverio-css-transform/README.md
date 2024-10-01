- https://github.com/webdriverio/webdriverio/issues/13724

htmlpreview: https://htmlpreview.github.io/?https://github.com/hi-ogawa/reproductions/blob/main/webdriverio-css-transform/app/index.html

```sh
# start html app
npx sirv app -D

# run webdriverio
# here there's no log for
#   [log.entryAdded] click inner! (scaled)
node repro.mjs
[log.entryAdded] click inner! (normal)
[log.entryAdded] click outer! (normal)
[log.entryAdded] click outer! (scaled)
```

# related

- https://github.com/vitest-dev/vitest/pull/6512
- https://github.com/vitest-dev/vitest/issues/6449
