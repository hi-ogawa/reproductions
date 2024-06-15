declare module "react-dom/server.edge" {
	export * from "react-dom/server";
}

declare module "react-server-dom-webpack/server.edge" {
	export function renderToReadableStream<T>(
		data: T,
		bundlerConfig: object,
		opitons?: import("react-dom/server").RenderToReadableStreamOptions,
	): ReadableStream<Uint8Array>;

	export function registerClientReference<T>(
		proxy: T,
		id: string,
		name: string,
	): T;

	export function registerServerReference<T>(
		ref: T,
		id: string,
		name: string,
	): T;

	export function decodeReply(body: string | FormData): Promise<unknown[]>;

	export function decodeAction(
		body: FormData,
		bundlerConfig: object,
	): Promise<() => Promise<unknown>>;

	export function decodeFormState(
		actionResult: unknown,
		body: FormData,
		serverManifest?: unknown,
	): Promise<unknown>;
}
