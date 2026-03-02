import jsdom from "jsdom";

const { JSDOM } = jsdom;

const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>", {
  url: "http://localhost",
  pretendToBeVisual: true,
});

const { window } = dom;
console.log(window.URL.name);
