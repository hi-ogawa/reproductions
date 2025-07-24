"use server"

import React from "react";

// export const testFn = () => {
//   return "foo";
// }

// export const testFn = React.cache(async () => {
//   return "foo";
// })

// export const testFn = notReactCache(async () => {
//   return "foo";
// })

function testHO(f: any): any {
  return () => {};
}

// [ok]
export const testFn = testHO(async () => {
  return "foo";
})

// [not ok]
// export const testFn = testHO(() => {
//   return "foo";
// })

// // [ok]
// export const testFn = testHO("anything")
