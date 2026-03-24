Exploring fake project duplication ideas for https://github.com/vitest-dev/vitest/issues/9954

See `vitest.config.ts` for how `TEST_NAME` and `MERGE_TEST_NAMES` affects test projects config.

```sh
# fake full run on linux
TEST_NAME=linux pnpm vitest --reporter=blob --outputFile=.vitest-reports/blob-1.bin --run
blob report written to /home/hiroshi/code/personal/reproductions/vitest-9954-merge-report-non-shard-runs/.vitest-reports/blob-1.bin

# fake full test run on macos
TEST_NAME=macos pnpm vitest --reporter=blob --outputFile=.vitest-reports/blob-2.bin --run
blob report written to /home/hiroshi/code/personal/reproductions/vitest-9954-merge-report-non-shard-runs/.vitest-reports/blob-2.bin

# merge two full test runs
MERGE_TEST_NAMES='["linux", "macos"]' pnpm vitest --merge-reports --reporter=verbose --run

 RUN  v4.1.1 /home/hiroshi/code/personal/reproductions/vitest-9954-merge-report-non-shard-runs

 ✓  linux  src/basic.test.ts > add 1ms
 ✓  linux  src/basic.test.ts > multiply 0ms
 ✓  macos  src/basic.test.ts > add 1ms
 ✓  macos  src/basic.test.ts > multiply 0ms

 Test Files  2 passed (2)
      Tests  4 passed (4)
   Start at  17:06:34
   Duration  196ms (transform 0ms, setup 0ms, import 41ms, tests 3ms, environment 0ms)
   Per blob  99ms 97ms
```
