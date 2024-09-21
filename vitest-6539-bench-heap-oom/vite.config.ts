import { defineConfig } from "vitest/config";
import fs from "node:fs";
import v8 from "node:v8";

export default defineConfig({
  test: {
    benchmark: {
      reporters: [
        "default",
        {
          onInit() {
            // log heap stats
            (async () => {
              while (true) {
                await new Promise((r) => setTimeout(r, 1000));
                const stats = v8.getHeapStatistics();
                fs.appendFileSync("./heap.csv", `${stats.used_heap_size}\n`);
              }
            })();
          },
        },
      ],
    },
  },
});
