import { assetUrl } from "./lib";

document.querySelector("#app").innerHTML = `
  <div>
    <h3>Test asset</h3>
    <img src="${assetUrl}" />
  </div>
`;
