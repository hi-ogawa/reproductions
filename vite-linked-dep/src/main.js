import testDep from "@vitejs/test-dep";

document.querySelector("#app").innerHTML = `
  <div>
    <h1>Hello Vite!</h1>
    <pre>${JSON.stringify({ testDep })}</pre>
  </div>
`;
