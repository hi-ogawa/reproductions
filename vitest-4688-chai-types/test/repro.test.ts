import { test, chai, expect } from "vitest"
import chaiAsPromised from "chai-as-promised"

chai.use(chaiAsPromised)

test("repro", async () => {
  await expect(Promise.resolve(5)).to.eventually.equal(5)
})
