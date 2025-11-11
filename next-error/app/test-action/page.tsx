export default async function Page() {
  return (
    <div>
      <h4>Test Action Page</h4>
      <form action={async () => {
        "use server";
        throw new Error("Action Error");
      }}>
        <button type="submit">Test error</button>
      </form>
    </div>
  );
}
