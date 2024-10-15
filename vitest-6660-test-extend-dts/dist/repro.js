import { test } from "vitest";
export const myTest = test.extend({
    now: async ({}, use) => {
        await use(Date.now());
    },
});
//# sourceMappingURL=repro.js.map