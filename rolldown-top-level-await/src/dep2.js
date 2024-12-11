console.log("[dep2] sleep 1sec")
await new Promise(r => setTimeout(r, 1000))
console.log("[dep2] done")
