import { recordTrace } from "./otel-utils";

export function setupCounter(element: HTMLButtonElement) {
  let counter = 0;
  const setCounter = (count: number) => {
    counter = count;
    element.innerHTML = `count is ${counter}`;
  };
  element.addEventListener("click", () => {
    recordTrace({
      name: "button_click",
      attributes: { button_id: "counter", value: counter },
      fn: () => setCounter(counter + 1),
    });
  });
  setCounter(0);
}
