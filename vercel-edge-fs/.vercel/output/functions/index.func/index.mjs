// import fs from "node:fs";

export default function index(request, event) {
	// console.log(fs);
	return new Response(`Hello, from the Edge!`);
}
