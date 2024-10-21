import testDep from "virtual:test-dep";

export default testDep;

if (typeof document !== "undefined") {
  document.getElementById("root").innerHTML = `<pre>${testDep}</pre>`;
}
