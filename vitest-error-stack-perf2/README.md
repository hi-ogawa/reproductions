https://github.com/vitest-dev/vitest/issues/7801

Generate test files

```sh
# test/generated/100/001.test.ts .. 100.test.ts
# test/generated/200/001.test.ts .. 200.test.ts
# ...
node generate.js
```

```sh
for i in 100 200 300; do
  pnpm test run generated/$i/ --reporter dot
  pnpm test run generated/$i/ --reporter dot --includeTaskLocation
done

> vitest run generated/100/ --reporter dot
   Duration  1.68s (transform 880ms, setup 0ms, collect 2.10s, tests 309ms, environment 21ms, prepare 8.08s)

> vitest run generated/100/ --reporter dot --includeTaskLocation
   Duration  1.72s (transform 820ms, setup 0ms, collect 2.84s, tests 325ms, environment 21ms, prepare 8.05s)

> vitest run generated/200/ --reporter dot
   Duration  3.25s (transform 1.47s, setup 0ms, collect 3.93s, tests 661ms, environment 43ms, prepare 15.90s)

> vitest run generated/200/ --reporter dot --includeTaskLocation
   Duration  3.50s (transform 1.56s, setup 0ms, collect 6.19s, tests 656ms, environment 49ms, prepare 16.71s)

> vitest run generated/300/ --reporter dot
   Duration  5.05s (transform 2.28s, setup 0ms, collect 6.04s, tests 1.10s, environment 67ms, prepare 25.00s)

> vitest run generated/300/ --reporter dot --includeTaskLocation
   Duration  5.48s (transform 2.19s, setup 0ms, collect 9.29s, tests 1.11s, environment 60ms, prepare 26.28s)
```

| Number of test files | Duration | Duration with includeTaskLocation | collect | collect with includeTaskLocation |
|---------------------|----------|----------------------------------|---------|----------------------------------|
| 100                 | 1.68s    | 1.72s                            | 2.10s   | 2.84s                            |
| 200                 | 3.25s    | 3.50s                            | 3.93s   | 6.19s                            |
| 300                 | 5.05s    | 5.48s                            | 6.04s   | 9.29s                            |
