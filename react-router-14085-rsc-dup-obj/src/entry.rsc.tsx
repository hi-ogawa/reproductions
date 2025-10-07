import { renderToReadableStream, createFromReadableStream } from "@vitejs/plugin-rsc/rsc"

async function handler(request: Request): Promise<Response> {
  const url = new URL(request.url);

  if (url.pathname === '/test1') {
    await test1();
  }
  if (url.pathname === '/test2') {
    await test2();
  }

  return new Response("ok");
}

async function test1() {
  // serialize same `obj` reference as top-level object and as prop
  const obj = {};
  function Test(_props: { obj: {} }) {
    return "test";
  }
  const original = {
    obj: obj,
    node: <Test obj={obj} />,
  }
  console.log("[original]", original);
  const stream = renderToReadableStream(original);
  console.log("[stream]", stream);
  const restored = await createFromReadableStream(stream); // this gets stuck
  console.log("[restored]", restored);
}

// flipping the order of prperties works
async function test2() {
  const obj = {};
  function Test(_props: { obj: {} }) {
    return "test";
  }
  const original = {
    node: <Test obj={obj} />,
    obj: obj,
  }
  console.log("[original]", original);
  const stream = renderToReadableStream(original);
  console.log("[stream]", stream);
  const restored = await createFromReadableStream(stream);
  console.log("[restored]", restored);
}

export default {
  fetch: handler
}
