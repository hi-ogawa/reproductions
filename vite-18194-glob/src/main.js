const key = String("a");
console.log(import(`./data/${key}.js`))
console.log(import(`./data/subdir/${key}.js`))
console.log(new URL(`./data/${key}.js`, import.meta.url));
console.log(new URL(`./data/subdir/${key}.js`, import.meta.url));

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Hello Vite!</h1>
  </div>
`
