import depCondition from "test-dep-conditions";

export default depCondition;

if (typeof document !== 'undefined') {
  document.getElementById("root")!.innerHTML = `
    <h2>Test conditions</h2>
    <pre>client: ${depCondition}</pre>
    <ul>
      <li><a href="/ssr">/ssr</a></li>
      <li><a href="/worker">/worker</a></li>
      <li><a href="/custom1">/custom1</a></li>
      <li><a href="/custom2">/custom2</a></li>
    </ul>

  `
}
