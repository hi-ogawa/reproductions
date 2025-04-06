https://github.com/vitest-dev/vitest/issues/7801

Generated three variants of tests;

```sh
$ node generate.js
```

```ts
import { test } from 'vitest';

test('0', () => {});

test('1', () => {});

// ... count
```

Showing `file.collectDuration` with and without `includeTaskLocation`:

```sh
$ pnpm test
test/generated/0010.test.ts 5.8909400000000005
test/generated/0020.test.ts 7.456136000000001
test/generated/0030.test.ts 5.403683000000001
test/generated/0040.test.ts 5.194703000000004
test/generated/0050.test.ts 6.859522999999996
test/generated/0100.test.ts 7.059010999999998
test/generated/0200.test.ts 9.14372999999999
test/generated/0300.test.ts 10.144931999999997
test/generated/0400.test.ts 12.600465999999997
test/generated/0500.test.ts 14.279580999999993
test/generated/1000.test.ts 27.102069999999998
test/generated/2000.test.ts 41.4679
test/generated/3000.test.ts 64.939323
test/generated/4000.test.ts 91.33187500000001
test/generated/5000.test.ts 157.705037

$ pnpm test --includeTaskLocation
test/generated/0010.test.ts 11.273754999999994
test/generated/0020.test.ts 11.572699999999998
test/generated/0030.test.ts 13.686404999999993
test/generated/0040.test.ts 15.050187999999991
test/generated/0050.test.ts 16.966440000000006
test/generated/0100.test.ts 25.87043399999999
test/generated/0200.test.ts 43.551255999999995
test/generated/0300.test.ts 56.971091
test/generated/0400.test.ts 70.060507
test/generated/0500.test.ts 76.585958
test/generated/1000.test.ts 122.62741600000001
test/generated/2000.test.ts 224.45824400000004
test/generated/3000.test.ts 335.658496
test/generated/4000.test.ts 451.14513199999993
test/generated/5000.test.ts 639.015433
```

| Number of tests | Time (ms) - Default | Time (ms) - With Task Location |
|------------|-------------------|----------------------------|
| 0010 | 5.89 | 11.27 |
| 0020 | 7.46 | 11.57 |
| 0030 | 5.40 | 13.69 |
| 0040 | 5.19 | 15.05 |
| 0050 | 6.86 | 16.97 |
| 0100 | 7.06 | 25.87 |
| 0200 | 9.14 | 43.55 |
| 0300 | 10.14 | 56.97 |
| 0400 | 12.60 | 70.06 |
| 0500 | 14.28 | 76.59 |
| 1000 | 27.10 | 122.63 |
| 2000 | 41.47 | 224.46 |
| 3000 | 64.94 | 335.66 |
| 4000 | 91.33 | 451.15 |
| 5000 | 157.71 | 639.02 |
