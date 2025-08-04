# context

- https://github.com/vitejs/vite-plugin-react/pull/668

# example

- `pnpm dev`
- open http://localhost:3000/
- click `test-cache-in-action`
- see terminal

```sh
### inside server component
[cacheFn:args] [ 'test1' ]
[cacheFn:args] [ 'test2' ]
 GET / 200 in 1306ms

### inside server action
[cacheFn:args] [ 'test3' ]
[cacheFn:args] [ 'test3' ]
[cacheFn:args] [ 'test4' ]
 POST / 200 in 18ms```
