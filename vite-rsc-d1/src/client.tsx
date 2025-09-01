"use client";

import React from "react";

export function ClientCounter() {
  const [count, setCount] = React.useState(0);

  return (
    <>
      <p>Client Counter: {count}</p>
      <div>
        <button onClick={() => setCount((count) => count - 1)}>-1</button>{" "}
        <button onClick={() => setCount((count) => count + 1)}>+1</button>
      </div>
    </>
  );
}
