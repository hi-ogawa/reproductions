console.log("[worker] run entry.js");

export default {
  fetch: () => {
    console.log("[worker] run fetch (instantiate Response)")
    return new Response("ok");
  }
}
