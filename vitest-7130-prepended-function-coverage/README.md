## context

- https://github.com/vitest-dev/vitest/issues/7130

## reproduction

```sh
$ VITE_NODE_DEBUG_DUMP=1 pnpm test -- --coverage
=============================== Coverage summary ===============================
Statements   : 100% ( 1/1 )
Branches     : 100% ( 0/0 )
Functions    : 0% ( 0/1 )
Lines        : 100% ( 1/1 )
================================================================================
```

- [source map vis](https://evanw.github.io/source-map-visualization/#Mzg0AGZ1bmN0aW9uIHByZXBlbmRlZCgpe307Y29uc29sZS5sb2coIngiKTsKZnVuY3Rpb24gYXBwZW5kZWQoKXt9OwoKLy8jIHNvdXJjZU1hcHBpbmdTb3VyY2U9dml0ZS1ub2RlCi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKdFlYQndhVzVuY3lJNkluVkNRVUZCTEZGQlFWRXNTVUZCU1N4SFFVRkhJaXdpYm1GdFpYTWlPbHRkTENKcFoyNXZjbVZNYVhOMElqcGJYU3dpYzI5MWNtTmxjeUk2V3lKaVlYTnBZeTUwY3lKZExDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SmpiMjV6YjJ4bExteHZaeWhjSW5oY0lpazdYRzRpWFN3aVptbHNaU0k2SWk5emNtTXZZbUZ6YVdNdWRITWlmUT09CjE2MwB7InZlcnNpb24iOjMsIm1hcHBpbmdzIjoidUJBQUEsUUFBUSxJQUFJLEdBQUciLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbImJhc2ljLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnNvbGUubG9nKFwieFwiKTtcbiJdLCJmaWxlIjoiL3NyYy9iYXNpYy50cyJ9)

For the following generated code, `appended` is removed from the function coverage but `prepended` is not.

```js
function prepended(){};console.log("x");
function appended(){};
```

- `coverage/coverage-final.json`

```json
    "fnMap": {
      "0": {
        "name": "prepended",
        "decl": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 8
          }
        },
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 8
          }
        },
        "line": 1
      }
    },
    "f": {
      "0": 0
    }
```
