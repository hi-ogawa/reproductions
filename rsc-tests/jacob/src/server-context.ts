import { AsyncLocalStorage } from "node:async_hooks";

export type RequestContext = {
	context: Map<unknown, unknown>;
	headers: Headers;
	url: string;
};

export const RequestContext = new AsyncLocalStorage<RequestContext>();

function getRequestContext() {
	const store = RequestContext.getStore();
	if (!store) {
		throw new Error("No request context available");
	}
	return store;
}

export function url(): URL {
	return new URL(getRequestContext().url);
}
