"use client";

import { useState } from "react";

export function TestClient() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount((c) => c + 1)}>
      Client counter: {count}
    </button>
  );
}
