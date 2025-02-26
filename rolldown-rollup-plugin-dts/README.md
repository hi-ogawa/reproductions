# rollup-plugin-dts inspector

## context

https://github.com/users/hi-ogawa/projects/4/views/1?pane=issue&itemId=98975827

## examples

```sh
$ pnpm build-rollup
```

### /home/hiroshi/code/personal/reproductions/rolldown-rollup-plugin-dts/src/entry.ts

- input

```ts
import type { SomeType } from "./dep.ts"

export function someFn(): SomeType {
  return {}
}

```

- dts emit + pre-process

```ts
import type { SomeType } from "./dep.ts";
declare function someFn(): SomeType;

export { someFn };

```

- proxy ast

```ts
import { SomeType } from './dep.ts';

function someFn(1 = someFn, 2 = SomeType) {
        return [1, 2];
}

export { someFn };
```

### /home/hiroshi/code/personal/reproductions/rolldown-rollup-plugin-dts/src/dep.ts

- input

```ts
export type SomeType = {};
export type UnusedType = {};

```

- dts emit + pre-process

```ts
type SomeType = {};
type UnusedType = {};

export { SomeType, UnusedType };

```

- proxy ast

```ts
function SomeType() {
        return [];
}

function UnusedType() {
        return [];
}

export { SomeType, UnusedType };
```
