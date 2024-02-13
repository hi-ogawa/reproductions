import { omit, range } from "lodash-es"

console.log(range)

// does svelte run dead code elimination before rollup sees `omit` usage?
// let showSettingsModal = false
// if (showSettingsModal) {
//   console.log(omit)
// }
