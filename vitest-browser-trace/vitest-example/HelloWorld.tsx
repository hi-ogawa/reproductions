import { useState } from "react";

export default function HelloWorld({ name }: { name: string }) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Hello {name}!</h1>
      <button data-testid="counter" onClick={() => setCount((c) => c + 1)}>
        Count: {count}
      </button>
    </div>
  );
}
