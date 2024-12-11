console.log("[dep1] sleep 1sec")
await new Promise(r => setTimeout(r, 1000))
console.log("[dep1] done")
