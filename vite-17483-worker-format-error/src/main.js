document.querySelector("#app").innerHTML = `
  <div>
    <h1>Hello Vite!</h1>
    <div id="worker">???</div>
  </div>
`;

const worker = new Worker(new URL("./worker.js", import.meta.url), {
	type: "module",
});
worker.onmessage = (e) => {
	document.querySelector("#worker").textContent = e.data;
};
worker.postMessage("hi");