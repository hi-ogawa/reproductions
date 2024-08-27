- https://github.com/vitejs/vite/issues/17954

```ts
$ node src/repro.js
// input
export const test = <div>{
  "Lorem"
} ispum </div>;

// output
export const test = <div>{
  "Lorem"}
   ispum </div>;
```
