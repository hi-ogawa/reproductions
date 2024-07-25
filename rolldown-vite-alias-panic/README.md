- https://github.com/rolldown/vite/pull/28#issuecomment-2234949149

Reproducting `playground/alias` panic with Rolldown

```sh
$ node index.js
thread 'tokio-runtime-worker' panicked at crates/rolldown/src/utils/chunk/render_chunk_exports.rs:30:53:
no entry found for key
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
node:internal/process/promises:289
            triggerUncaughtException(err, true /* fromPromise */);
            ^

[Error: Panic in async function] { code: 'GenericFailure' }

Node.js v20.14.0
```
