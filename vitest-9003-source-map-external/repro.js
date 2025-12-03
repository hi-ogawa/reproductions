import { Window } from 'happy-dom';
import { render, h } from 'preact';

const window = new Window({ url: 'https://localhost:8080' });
Object.assign(globalThis, {
  window,
  document: window.document,
});

function HelloWorld({ name }) {
  throw new Error("boom");
}

const root = h(HelloWorld, { name: "Vitest" });
render(root, document.body)
