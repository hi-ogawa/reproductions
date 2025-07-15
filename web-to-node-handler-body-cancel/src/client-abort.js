import http from "node:http";

async function main() {
  const url = new URL(process.argv[2] ?? "http://localhost:3000");

  // const res = await fetch(url);
  // res.body.cancel();

  const req = http.request(
    {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      method: "GET",
    },
    (res) => {
      res.destroy();
    },
  );

  req.on("error", (err) => {
    console.log("Request error:", err.message);
  });

  req.end();
}

main();
