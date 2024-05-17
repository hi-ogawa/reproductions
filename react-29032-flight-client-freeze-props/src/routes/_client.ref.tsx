import ReactServer from "react-server-dom-webpack/server.edge";

export const Counter = registerClientReference("id", "Counter");

function registerClientReference(id: string, name: string) {
	return Object.defineProperties(
		{},
		{
			...Object.getOwnPropertyDescriptors(
				ReactServer.registerClientReference({}, id, name),
			),
			$$async: { value: true },
		},
	) as any;
}
