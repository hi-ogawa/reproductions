import dep2 from "./dep2.js"

document.querySelector('#app').innerHTML = `
  <div>
    <div>fooTest</div>
    <div>dep2: ${dep2}</div>
  </div>
`
