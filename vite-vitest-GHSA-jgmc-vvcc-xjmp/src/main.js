import repro from "./x.js?foo=/../y.js"

console.log({ repro })

if (typeof document !== 'undefined') {
  document.querySelector('#app').innerHTML = `
    <h4>Test</h4>
    <pre>${repro}</pre>
  `
}
