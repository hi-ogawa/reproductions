import React from "react";

export default async function Page() {
  await cacheFn("test1")
  await cacheFn("test1")
  await cacheFn("test2")
  return (
    <div style={{ border: "1px solid blue", padding: "20px" }}>
      <h4>Page</h4>
      <form action={async () => {
        "use server";
        await cacheFn("test3")
        await cacheFn("test3")
        await cacheFn("test4")
      }}>
        <button>test-cache-in-action</button>
      </form>
    </div>
  );
}

const cacheFn = React.cache(async (...args: unknown[]) => {
  console.log("[cacheFn:args]", args);
});
