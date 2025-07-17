import React from "react";
import ReactDOMServer from "react-dom/server.edge";

const promise1 = Promise.resolve("value1");
const promise2 = Promise.resolve("value2");

function Component1() {
  const data = React.use(promise1);
  console.log("[Component1] React.use(promise1) =", data);
  return React.createElement(
    "div",
    null,
    `Component1: ${data}`,
    React.createElement(Component2Lazy),
  );
}

function Component2() {
  const data = React.use(promise2);
  console.log("[Component2] React.use(promise2) =", data);
  return React.createElement("div", null, `Component2: ${data}`);
}

const Component2Lazy = React.lazy(async () => ({ default: Component2 }));

function App() {
  return React.createElement("div", null, React.createElement(Component1));
}

async function main() {
  console.log("react", React.version);
  console.log("react-dom", ReactDOMServer.version);
  try {
    const stream = await ReactDOMServer.renderToReadableStream(React.createElement(App));
    let html = "";
    await stream.pipeThrough(new TextDecoderStream()).pipeTo(
      new WritableStream({
        write(chunk) {
          html += chunk;
        },
      }),
    );
    console.log("HTML output:", html);
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
