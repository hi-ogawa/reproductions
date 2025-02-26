import type { SomeType } from "./dep.ts";

export interface SomeInterface {
	foo: SomeType[];
}

export function someFn(): SomeType {
	return {};
}
