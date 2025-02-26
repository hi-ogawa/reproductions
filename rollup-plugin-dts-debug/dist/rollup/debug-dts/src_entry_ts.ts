// @ts-nocheck

////
//// input
////
import type { SomeType } from "./dep";

export interface SomeInterface {
	foo: SomeType[];
}

export function someFn(): SomeType {
	return {} as any;
}


////
//// dts + pre-process
////
import type { SomeType } from "./dep";
interface SomeInterface {
    foo: SomeType[];
}
declare function someFn(): SomeType;

export { SomeInterface, someFn };


////
//// proxy ast
////
import { SomeType } from './dep';

function SomeInterface(1 = SomeType) {
	return [1];
}

function someFn(2 = someFn, 3 = SomeType) {
	return [2, 3];
}

export { SomeInterface, someFn };
