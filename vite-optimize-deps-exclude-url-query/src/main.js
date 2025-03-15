import testDep from "@vitejs/test-dep";

document.querySelector("#app").innerHTML = `
  <div>
    <h3>Test Dep</h3>
    <pre>${JSON.stringify(testDep, null, 2)}</pre>
  </div>
`;
