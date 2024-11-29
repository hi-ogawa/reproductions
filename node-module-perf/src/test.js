export const x = 1;

export let y = 1;

export function refX() {
  x;
}

export function refY() {
  y;
}

export function assignY(change) {
  y += change;
}

globalThis.__hack = () => {
  y += 1;
}
