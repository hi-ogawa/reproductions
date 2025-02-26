// @ts-nocheck

////
//// input
////
type InnerType = {};

export type SomeType = {
	inner: InnerType;
};

export type UnusedType = {};


////
//// dts + pre-process
////
type InnerType = {};
type SomeType = {
    inner: InnerType;
};
type UnusedType = {};
export {};

export { SomeType, UnusedType };


////
//// proxy ast
////
function InnerType() {
	return [];
}

function SomeType(4 = InnerType) {
	return [4];
}

function UnusedType() {
	return [];
}

export {};
export { SomeType, UnusedType };
