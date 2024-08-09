self.addEventListener("message", (e) => {
	if (e.data === "parent") {
		const child = new Worker(
			// TODO: use self.location.href for workaround?
			new URL("./worker-recursive.js", import.meta.url),
			{
				type: "module",
			},
		);
		child.postMessage("child");
		// parent proxy child message to main process
		child.addEventListener("message", (e) => {
			self.postMessage(e.data);
		});
	}
	if (e.data === "child") {
		// child send back to parent
		self.postMessage({ ok: true });
	}
});
