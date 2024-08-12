import testDepBrowserOrWorker from "test-dep-browser-or-worker";

self.onmessage = () => {
	self.postMessage({
		href: self.location.href,
		testDepBrowserOrWorker,
	});
};

// test self reference similar to gkjohnson/three-mesh-bvh
// https://github.com/gkjohnson/three-mesh-bvh/blob/9718501eee2619f1015fa332d7bddafaf6cf562a/src/workers/parallelMeshBVH.worker.js#L12
// setTimeout(() => {
// 	new Worker(new URL("./test-worker.js", import.meta.url), {
// 		type: "module",
// 	});
// }, 2000);
