# context

- https://github.com/vitejs/vite-plugin-react/issues/666

# example

- test-shared.tsx

```ts
export const testShared = "test-shared";
```

- test-server.tsx

```ts
import { TestClient } from "./test-client";
import { testShared } from "./test-shared";

export function TestServer() {
  return <TestClient testSharedFromServer={testShared} />;
}
```

- test-client.tsx

```ts
"use client"

import { testShared } from "./test-shared"

export function TestClient({ testSharedFromServer }: { testSharedFromServer: string}) {
  if (testShared !== testSharedFromServer) {
    throw new Error(`mismatch: ${JSON.stringify({ testShared, testSharedFromServer })}`);
  }
  return "ok"
}
```

# how to test

- run `pnpm dev`
- open http://localhost:3000
- it shows "ok"
- modify `test-shared.tsx` from `"test-shared"` to `"test-shared-edit"`
- it shows a following error

```sh
mismatch: {"testShared":"test-shared-edit","testSharedFromServer":"test-shared"}
```
