import { serve } from "srvx";
import { handler } from "./handler.js";

serve({
  port: 3000,
  fetch(request) {
    return handler(request);
  },
});
