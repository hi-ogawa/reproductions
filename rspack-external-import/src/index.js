import x from "react";
const y = () => import("react-dom");
console.log(x.version)
y().then(mod => console.log(mod.version))
