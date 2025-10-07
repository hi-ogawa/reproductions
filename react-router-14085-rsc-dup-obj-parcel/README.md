# context

- https://github.com/remix-run/react-router/issues/14085#issuecomment-3370157961

# examples

## Vite

See [../react-router-14085-rsc-dup-obj](../react-router-14085-rsc-dup-obj)

## Parcel

```sh
pnpm dev
curl http://localhost:3000/test1 # works
curl http://localhost:3000/test2 # stuck
```

```sh
pnpm build
pnpm start
curl http://localhost:3000/test1 # works
curl http://localhost:3000/test2 # works
```
