import { expect, test } from 'vitest';
import { render, h } from 'preact';

function HelloWorld({ name }) {
  throw new Error("boom");
}

test('renders name', () => {
  render(h(HelloWorld, { name: "Vitest" }), document.body);
});
