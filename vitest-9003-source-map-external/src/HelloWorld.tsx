export default function HelloWorld({ name }: { name: string }) {
  throw new Error("boom");
  return (
    <div>
      <h1>Hello {name}!</h1>
    </div>
  );
}
