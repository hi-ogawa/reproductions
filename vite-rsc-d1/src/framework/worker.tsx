import { setupDb } from "../db";
import handler from "./entry.rsc";

export default {
  fetch: async (request: Request) => {
    await setupDb();
    return handler(request);
  },
};

if (import.meta.hot) {
  import.meta.hot.accept();
}
