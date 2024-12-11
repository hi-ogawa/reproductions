https://github.com/users/hi-ogawa/projects/4/views/1?pane=issue&itemId=90149631

```sh
# node
$ node src/entry.js
[dep1] sleep 1sec
[dep2] sleep 1sec
[dep1] done
[dep2] done

# rolldown/rollup/esbuild are same
$ pnpm build
$ pnpm build-rollup
$ pnpm build-esbuild
$ node dist/entry.js
[dep1] sleep 1sec
[dep1] done
[dep2] sleep 1sec
[dep2] done

# vite module runner too
$ node vite-ssr.js
[dep1] sleep 1sec
[dep1] done
[dep2] sleep 1sec
[dep2] done
```
