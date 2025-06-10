// @ts-ignore
import testDep from "@vitejs/test-dep";

export default {
	async fetch() {
		return Response.json({ testDep });
	},
};
