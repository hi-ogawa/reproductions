import { serve } from "srvx";

serve({
  port: 3000,
  fetch(req) {
    const stream = new ReadableStream({
      async start(controller) {
        await new Promise((r) => setTimeout(r, 100));
        controller.enqueue('hello\n');
        await new Promise((r) => setTimeout(r, 100));
        if (req.url.includes("error")) {
          throw new Error('boom');
        }
        controller.enqueue('world\n');
        controller.close();
      },
    }).pipeThrough(new TextEncoderStream());
    return new Response(stream);
  },
});
