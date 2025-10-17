// having Vite client here will ensure later discover to cause full-reload.
// import "@vite/client"; 

import { render } from "preact";

async function main() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const { Root } = await import("./root");
  render(<Root />, document.getElementById("root")!);
}

main();
