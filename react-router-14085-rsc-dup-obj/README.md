# context

- https://github.com/remix-run/react-router/issues/14085#issuecomment-3370157961

# examples

## Vite

```sh
pnpm dev
curl http://localhost:5173/test1 # works
curl http://localhost:5173/test2 # stuck
```

```sh
pnpm build
pnpm preview
curl http://localhost:4173/test1 # works
curl http://localhost:4173/test2 # works
```

## Parcel

See [../react-router-14085-rsc-dup-obj-parcel](../react-router-14085-rsc-dup-obj-parcel)
