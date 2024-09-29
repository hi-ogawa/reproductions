export default async function main() {
  const mod = import("./dep-dynamic");
  console.log(mod);
}
