async function main() {
  const dep = await import("./dep");
  document.getElementById("root").textContent = dep.default;
}

main();
