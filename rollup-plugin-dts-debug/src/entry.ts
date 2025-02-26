import type { SomeType } from "./dep";

export interface SomeInterface {
	foo: SomeType[];
}

export function someFn(): SomeType {
	return {} as any;
}
