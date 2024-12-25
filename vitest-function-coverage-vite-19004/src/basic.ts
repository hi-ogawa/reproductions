export function f(a: number, b: number) {
	return a + b;
}

// this is hoisted before `export function f` without new line,
// which seems to somehow break coverage of `f`
import "node:path"
