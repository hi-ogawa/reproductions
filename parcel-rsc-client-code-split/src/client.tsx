"use client-entry";

import { fetchRSC, hydrate } from "@parcel/rsc/client";

let updateRoot = hydrate();

// A very simple router. When we navigate, we'll fetch a new RSC payload from the server,
// and in a React transition, stream in the new page. Once complete, we'll pushState to
// update the URL in the browser.
async function navigate(pathname: string, push = false) {
  let root = fetchRSC<any>(pathname);
  updateRoot(root, () => {
    if (push) {
      history.pushState(null, "", pathname);
    }
  });
}

// Intercept link clicks to perform RSC navigation.
document.addEventListener("click", (e) => {
  let link = (e.target as Element).closest("a");
  if (
    link &&
    link instanceof HTMLAnchorElement &&
    link.href &&
    (!link.target || link.target === "_self") &&
    link.origin === location.origin &&
    !link.hasAttribute("download") &&
    e.button === 0 && // left clicks only
    !e.metaKey && // open in new tab (mac)
    !e.ctrlKey && // open in new tab (windows)
    !e.altKey && // download
    !e.shiftKey &&
    !e.defaultPrevented
  ) {
    e.preventDefault();
    navigate(link.href, true);
  }
});

// When the user clicks the back button, navigate with RSC.
window.addEventListener("popstate", (e) => {
  navigate(location.href);
});
