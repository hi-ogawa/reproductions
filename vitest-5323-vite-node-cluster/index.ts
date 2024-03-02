import cluster from "cluster";

if (cluster.isPrimary) {
  // show "settings" https://nodejs.org/api/cluster.html#clustersettings
  cluster.setupPrimary({});
  console.log("[isPrimary]", cluster.settings);
  cluster.fork().send(0);
} else if (cluster.isWorker) {
  console.log("[isWorker]");
  process.on("message", (msg) => {
    console.log("[isWorker.msg]", msg);
  });
}
