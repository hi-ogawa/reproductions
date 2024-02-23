https://github.com/vitest-dev/vitest/issues/5263

```sh
$ pnpm test -- run -u

> @ test /home/hiroshi/code/personal/reproductions/vitest-5263-browser-snapshot
> vitest "run" "-u"


 RUN  v1.3.1 /home/hiroshi/code/personal/reproductions/vitest-5263-browser-snapshot
      Browser runner started at http://localhost:5173/

 ✓ foo.test.js (1)
   ✓ foo

  Snapshots  1 updated
 Test Files  1 passed (1)
      Tests  1 passed (1)
   Start at  13:13:21
   Duration  2.60s (transform 0ms, setup 0ms, collect 9ms, tests 3ms, environment 0ms, prepare 0ms)
```
