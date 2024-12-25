- https://github.com/vitest-dev/vitest/pull/7101
- https://github.com/vitest-dev/vitest/pull/7096

```sh
$ pnpm test

=== pkg1/setup ===
[
  'Error: TEST_STACK',
  '    at f2 (/xxx/packages/pkg1/global-setup.ts:13:15)',
  '    at f1 (/xxx/packages/pkg1/global-setup.ts:10:3)',
  '    at Object.setup (/xxx/packages/pkg1/global-setup.ts:3:3)'
]
=== pkg2/setup ===
[
  'Error: TEST_STACK',
  '    at f2 (/xxx/packages/pkg2/global-setup.ts:13:15)',
  '    at f1 (/xxx/packages/pkg2/global-setup.ts:10:3)',
  '    at Object.setup (/xxx/packages/pkg2/global-setup.ts:3:3)'
]

...

=== pkg2/teardown ===
[
  'Error: TEST_STACK',
  '    at f2 (/xxx/packages/pkg2/global-setup.ts:13:15)',
  '    at f1 (/xxx/packages/pkg2/global-setup.ts:10:3)',
  '    at Object.teardown (/xxx/packages/pkg2/global-setup.ts:6:5)'
]
=== pkg1/teardown ===
[
  'Error: TEST_STACK',
  '    at f2 (/xxx/packages/pkg1/global-setup.ts:13:15)',
  '    at f1 (/xxx/packages/pkg1/global-setup.ts:10:3)',
  '    at Object.teardown (/xxx/packages/pkg1/global-setup.ts:6:5)'
]
```
