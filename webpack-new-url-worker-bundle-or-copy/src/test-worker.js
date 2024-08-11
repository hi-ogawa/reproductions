self.onmessage = () => {
	self.postMessage({ href: self.location.href });
};
