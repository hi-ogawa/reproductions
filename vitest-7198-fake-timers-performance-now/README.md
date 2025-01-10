## context

- https://github.com/vitest-dev/vitest/issues/7198

## reproductions

```sh
$ node repro.js
tmpDate.now === Date.now false
tmpDate.now() 1736489527072
Date.now() 0
tmpPerformance.now === performance.now false
tmpPerformance.now() 32.995514
performance.now() 0
```
