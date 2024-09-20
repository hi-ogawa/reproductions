// [ok]
// import { original } from "@vitejs/test-dep1";
// import { reExport } from "@vitejs/test-dep2";

// [not ok]
import { original } from "@vitejs/test-dep1.pdf";
import { reExport } from "@vitejs/test-dep2.pdf";

document.getElementById("app").innerHTML = `
  <div>
    <pre>same? ${original === reExport}</pre>
    <pre>${JSON.stringify({ original, reExport }, null, 2)}</pre>
  </div>
`;
