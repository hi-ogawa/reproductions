"use client"

import { testShared } from "./test-shared"

export function TestClient({ testSharedFromServer }: { testSharedFromServer: string}) {
  if (testShared !== testSharedFromServer) {
    throw new Error(`mismatch: ${JSON.stringify({ testShared, testSharedFromServer })}`);
  }
  return "ok"
}
