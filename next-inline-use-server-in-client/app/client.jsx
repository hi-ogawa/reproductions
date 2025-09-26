"use client";

export function TestClient() {
  return (
    <form
      action={async () => {
        "use server";
        console.log("boom");
      }}
    >
      Test
    </form>
  );
}
