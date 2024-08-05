self.onmessage = () => {
	self.postMessage(self.location.href);
};
