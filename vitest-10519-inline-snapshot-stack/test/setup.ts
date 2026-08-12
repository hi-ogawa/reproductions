declare const __BENCH_EAGER_STACK__: boolean

Object.assign(globalThis, {
  __VITEST_BENCH_EAGER_STACK__: __BENCH_EAGER_STACK__,
})
