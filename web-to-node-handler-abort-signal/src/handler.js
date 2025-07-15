/**
 *
 * @param {Request} request
 * @returns {Promise<Response>}
 */
export async function handler(request) {
  let aborted = false;
  request.signal.addEventListener("abort", () => {
    console.log("abort!");
    aborted = true;
  });

  const url = new URL(request.url);
  console.log("[pathname]", url.pathname);
  if (url.pathname === "/api/simple") {
    return new Response("simple!\n");
  }

  let cancelled = false;

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      for (let i = 0; !aborted && !cancelled; i++) {
        console.log(`sending i = ${i}`);
        controller.enqueue(encoder.encode(`i = ${i}\n`));
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      controller.close();
    },
    cancel() {
      console.log("cancel!");
      cancelled = true;
    },
  });

  return new Response(stream);
}
