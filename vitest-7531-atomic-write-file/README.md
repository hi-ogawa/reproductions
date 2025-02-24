## context

https://github.com/vitest-dev/vitest/pull/7531

## reproduction

```sh
$ while node repro.js; do sleep 0.5; done
[ 'ok', 'ok' ]
[ 'ok', 'ok' ]
[ 'ok', 'ok' ]
[ 'ok', 'ok' ]
[ '', 'ok' ]
[ 'ok', 'ok' ]
[ 'ok', 'ok' ]
[ 'ok', 'ok' ]
[ 'ok', 'ok' ]
[ 'ok', 'ok' ]
[ 'ok', 'ok' ]
[ '', 'ok' ]
[ 'ok', 'ok' ]
[ 'ok', 'ok' ]
```
