export type Noop = {
  (): void;  
}

export function setupCounter(element: Element) {
  let counter = 0
  const setCounter = (count: number) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }
  element.addEventListener('click', () => {
    setCounter(counter + 1);
    throw1();
  })
  setCounter(0)
}

export type Noop2 = {
  (): void;  
}

function throw1() {
  throw2();
}

function throw2() {
  throw new Error('boom')
}
