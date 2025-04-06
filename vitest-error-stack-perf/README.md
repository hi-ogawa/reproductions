https://github.com/vitest-dev/vitest/issues/7801

Generated three variants of tests;

```sh
$ node generate.js
```

- baseline

```ts
import { test } from 'vitest';

test('0', () => {});
new Error('TEST')

test('1', () => {});
new Error('TEST')

// ...
```

- error-only

```ts
import { test } from 'vitest';

test('0', () => {});
new Error('TEST')

test('1', () => {});
new Error('TEST')

// ...
```

- error-message

```ts
import { test } from 'vitest';

test('0', () => {});
new Error('TEST').message

test('1', () => {});
new Error('TEST').message

// ...
```

- error-stack

```ts
import { test } from 'vitest';

test('0', () => {});
new Error('TEST').stack

test('1', () => {});
new Error('TEST').stack

// ...
```

Showing `file.collectDuration`:

```sh
$ pnpm test
test/generated/baseline-0010.test.ts 6.1244020000000035
test/generated/baseline-0020.test.ts 6.67575699999999
test/generated/baseline-0030.test.ts 6.067223999999996
test/generated/baseline-0040.test.ts 6.00682900000001
test/generated/baseline-0100.test.ts 10.624855999999994
test/generated/baseline-0200.test.ts 10.258910999999998
test/generated/baseline-0300.test.ts 11.894171999999998
test/generated/baseline-0400.test.ts 14.663640000000001
test/generated/baseline-1000.test.ts 27.836823999999993
test/generated/baseline-2000.test.ts 51.20583700000002
test/generated/baseline-3000.test.ts 79.04229
test/generated/baseline-4000.test.ts 116.55602300000001
test/generated/error-message-0010.test.ts 8.106322999999989
test/generated/error-message-0020.test.ts 6.922419999999988
test/generated/error-message-0030.test.ts 7.608395999999999
test/generated/error-message-0040.test.ts 7.173748000000003
test/generated/error-message-0100.test.ts 7.735946999999996
test/generated/error-message-0200.test.ts 10.61354
test/generated/error-message-0300.test.ts 12.320231000000007
test/generated/error-message-0400.test.ts 15.223209999999995
test/generated/error-message-1000.test.ts 36.533986
test/generated/error-message-2000.test.ts 58.07690799999999
test/generated/error-message-3000.test.ts 101.514151
test/generated/error-message-4000.test.ts 200.373588
test/generated/error-only-0010.test.ts 5.1338989999999995
test/generated/error-only-0020.test.ts 6.4842100000000045
test/generated/error-only-0030.test.ts 5.901604000000006
test/generated/error-only-0040.test.ts 6.302927999999994
test/generated/error-only-0100.test.ts 7.763322000000002
test/generated/error-only-0200.test.ts 8.669325
test/generated/error-only-0300.test.ts 11.78717300000001
test/generated/error-only-0400.test.ts 17.422691999999998
test/generated/error-only-1000.test.ts 29.93486399999999
test/generated/error-only-2000.test.ts 50.73549200000001
test/generated/error-only-3000.test.ts 83.979893
test/generated/error-only-4000.test.ts 123.656328
test/generated/error-stack-0010.test.ts 8.287043999999995
test/generated/error-stack-0020.test.ts 9.506478000000001
test/generated/error-stack-0030.test.ts 11.135154
test/generated/error-stack-0040.test.ts 11.171267
test/generated/error-stack-0100.test.ts 16.972064999999986
test/generated/error-stack-0200.test.ts 28.425806999999992
test/generated/error-stack-0300.test.ts 40.12251500000001
test/generated/error-stack-0400.test.ts 51.43519500000001
test/generated/error-stack-1000.test.ts 102.13560400000001
test/generated/error-stack-2000.test.ts 189.733831
test/generated/error-stack-3000.test.ts 293.442722
test/generated/error-stack-4000.test.ts 453.603736
```

| Test File | file.collectDuration (ms) |
|----------|-----------|
| baseline-0010.test.ts | 6.12 |
| baseline-0020.test.ts | 6.68 |
| baseline-0030.test.ts | 6.07 |
| baseline-0040.test.ts | 6.01 |
| baseline-0100.test.ts | 10.62 |
| baseline-0200.test.ts | 10.26 |
| baseline-0300.test.ts | 11.89 |
| baseline-0400.test.ts | 14.66 |
| baseline-1000.test.ts | 27.84 |
| baseline-2000.test.ts | 51.21 |
| baseline-3000.test.ts | 79.04 |
| baseline-4000.test.ts | 116.56 |
| error-message-0010.test.ts | 8.11 |
| error-message-0020.test.ts | 6.92 |
| error-message-0030.test.ts | 7.61 |
| error-message-0040.test.ts | 7.17 |
| error-message-0100.test.ts | 7.74 |
| error-message-0200.test.ts | 10.61 |
| error-message-0300.test.ts | 12.32 |
| error-message-0400.test.ts | 15.22 |
| error-message-1000.test.ts | 36.53 |
| error-message-2000.test.ts | 58.08 |
| error-message-3000.test.ts | 101.51 |
| error-message-4000.test.ts | 200.37 |
| error-only-0010.test.ts | 5.13 |
| error-only-0020.test.ts | 6.48 |
| error-only-0030.test.ts | 5.90 |
| error-only-0040.test.ts | 6.30 |
| error-only-0100.test.ts | 7.76 |
| error-only-0200.test.ts | 8.67 |
| error-only-0300.test.ts | 11.79 |
| error-only-0400.test.ts | 17.42 |
| error-only-1000.test.ts | 29.93 |
| error-only-2000.test.ts | 50.74 |
| error-only-3000.test.ts | 83.98 |
| error-only-4000.test.ts | 123.66 |
| error-stack-0010.test.ts | 8.29 |
| error-stack-0020.test.ts | 9.51 |
| error-stack-0030.test.ts | 11.14 |
| error-stack-0040.test.ts | 11.17 |
| error-stack-0100.test.ts | 16.97 |
| error-stack-0200.test.ts | 28.43 |
| error-stack-0300.test.ts | 40.12 |
| error-stack-0400.test.ts | 51.44 |
| error-stack-1000.test.ts | 102.14 |
| error-stack-2000.test.ts | 189.73 |
| error-stack-3000.test.ts | 293.44 |
| error-stack-4000.test.ts | 453.60 |
