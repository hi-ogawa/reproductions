https://github.com/vitest-dev/vitest/issues/5697
https://github.com/vitest-dev/vitest/issues/5244

Repro to verify Node v22's new equality checking behavior related to `Error`.

https://nodejs.org/docs/latest-v22.x/api/assert.html#assertdeepstrictequalactual-expected-message

> Error names, messages, causes, and errors are always compared, even if these are not enumerable properties. errors is also compared.

```sh
$ node --version
v22.3.0

$ node --test
```

<details><summary>output</summary>

```sh
✖ message (1.852771ms)
  AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:
  + actual - expected

  + [Error: a]
  - [Error: b]
            ^
      at TestContext.<anonymous> (file:///home/hiroshi/code/personal/reproductions/node-error-equality/repro.test.js:5:9)
      at Test.runInAsyncScope (node:async_hooks:206:9)
      at Test.run (node:internal/test_runner/test:856:25)
      at Test.processPendingSubtests (node:internal/test_runner/test:565:18)
      at node:internal/test_runner/harness:248:12
      at node:internal/process/task_queues:140:7
      at AsyncResource.runInAsyncScope (node:async_hooks:206:9)
      at AsyncResource.runMicrotask (node:internal/process/task_queues:137:8) {
    generatedMessage: true,
    code: 'ERR_ASSERTION',
    actual: {},
    expected: {},
    operator: 'deepStrictEqual'
  }

✖ cause 1 (0.205535ms)
  AssertionError [ERR_ASSERTION]: Values have same structure but are not reference-equal:

  [Error: a]

      at TestContext.<anonymous> (file:///home/hiroshi/code/personal/reproductions/node-error-equality/repro.test.js:9:9)
      at Test.runInAsyncScope (node:async_hooks:206:9)
      at Test.run (node:internal/test_runner/test:856:25)
      at Test.processPendingSubtests (node:internal/test_runner/test:565:18)
      at Test.postRun (node:internal/test_runner/test:955:19)
      at Test.run (node:internal/test_runner/test:898:12)
      at async Test.processPendingSubtests (node:internal/test_runner/test:565:7) {
    generatedMessage: true,
    code: 'ERR_ASSERTION',
    actual: {},
    expected: {},
    operator: 'deepStrictEqual'
  }

✖ cause 2 (0.126102ms)
  AssertionError [ERR_ASSERTION]: Values have same structure but are not reference-equal:

  [Error: a]

      at TestContext.<anonymous> (file:///home/hiroshi/code/personal/reproductions/node-error-equality/repro.test.js:13:9)
      at Test.runInAsyncScope (node:async_hooks:206:9)
      at Test.run (node:internal/test_runner/test:856:25)
      at Test.processPendingSubtests (node:internal/test_runner/test:565:18)
      at Test.postRun (node:internal/test_runner/test:955:19)
      at Test.run (node:internal/test_runner/test:898:12)
      at async Test.processPendingSubtests (node:internal/test_runner/test:565:7) {
    generatedMessage: true,
    code: 'ERR_ASSERTION',
    actual: {},
    expected: {},
    operator: 'deepStrictEqual'
  }

✖ cause 3 (0.140494ms)
  AssertionError [ERR_ASSERTION]: Values have same structure but are not reference-equal:

  [Error: a]

      at TestContext.<anonymous> (file:///home/hiroshi/code/personal/reproductions/node-error-equality/repro.test.js:17:9)
      at Test.runInAsyncScope (node:async_hooks:206:9)
      at Test.run (node:internal/test_runner/test:856:25)
      at Test.processPendingSubtests (node:internal/test_runner/test:565:18)
      at Test.postRun (node:internal/test_runner/test:955:19)
      at Test.run (node:internal/test_runner/test:898:12)
      at async Test.processPendingSubtests (node:internal/test_runner/test:565:7) {
    generatedMessage: true,
    code: 'ERR_ASSERTION',
    actual: {},
    expected: {},
    operator: 'deepStrictEqual'
  }

✖ custom 1 (0.616629ms)
  AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:
  + actual - expected

  + [Error: a]
  - [Error: a] {
  -   k: 'x'
  - }
      at TestContext.<anonymous> (file:///home/hiroshi/code/personal/reproductions/node-error-equality/repro.test.js:24:9)
      at Test.runInAsyncScope (node:async_hooks:206:9)
      at Test.run (node:internal/test_runner/test:856:25)
      at Test.processPendingSubtests (node:internal/test_runner/test:565:18)
      at Test.postRun (node:internal/test_runner/test:955:19)
      at Test.run (node:internal/test_runner/test:898:12)
      at async Test.processPendingSubtests (node:internal/test_runner/test:565:7) {
    generatedMessage: true,
    code: 'ERR_ASSERTION',
    actual: {},
    expected: { k: 'x' },
    operator: 'deepStrictEqual'
  }

✖ custom 2 (0.776834ms)
  AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:
  + actual - expected

    [Error: a] {
  +   k: 'x'
  -   k: 'y'
    }
      at TestContext.<anonymous> (file:///home/hiroshi/code/personal/reproductions/node-error-equality/repro.test.js:31:9)
      at Test.runInAsyncScope (node:async_hooks:206:9)
      at Test.run (node:internal/test_runner/test:856:25)
      at Test.processPendingSubtests (node:internal/test_runner/test:565:18)
      at Test.postRun (node:internal/test_runner/test:955:19)
      at Test.run (node:internal/test_runner/test:898:12)
      at async Test.processPendingSubtests (node:internal/test_runner/test:565:7) {
    generatedMessage: true,
    code: 'ERR_ASSERTION',
    actual: { k: 'x' },
    expected: { k: 'y' },
    operator: 'deepStrictEqual'
  }
```

</details>
