import testDepBrowserOrWorker from "test-dep-browser-or-worker";

self.onmessage = () => {
	self.postMessage({
		href: self.location.href,
		testDepBrowserOrWorker,
	});
};
