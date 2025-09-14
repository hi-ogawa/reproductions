import "./dep1.js"
import virtual from "virtual:test"

document.querySelector('#app').innerHTML += `
  <div>virtual: ${virtual}</div>
`
