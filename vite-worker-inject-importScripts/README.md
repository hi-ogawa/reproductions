Vite worker transform injects `importScripts` call expression and it can break a worker code.

```sh
pnpm dev
```

```ts
// src/worker.js
(() => {
	console.log("hello iife");
})();

// http://localhost:5173/src/worker.js?worker_file&type=classic
importScripts("/@vite/env")(()=>{
    console.log("hello iife");
}
)();
```

this causes an runtime error

```
TypeError: importScripts(...) is not a function
    at worker.js:1:1
```
