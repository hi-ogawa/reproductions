export function handler() {
  let stream = new ReadableStream({
    async start(controller) {
      console.log("[start:in]");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      try {
        controller.enqueue("test");
        console.log("[enqueue:ok]");
      } catch (e) {
        console.log("[enqueue:error]", e);
      }
      controller.close();
      console.log("[start:out]");
    },
    cancel() {
      console.log("[cancel!]");
    },
  });
  return new Response(stream);
}
