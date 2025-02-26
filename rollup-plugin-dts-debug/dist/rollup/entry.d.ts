type InnerType = {};
type SomeType = {
    inner: InnerType;
};

interface SomeInterface {
    foo: SomeType[];
}
declare function someFn(): SomeType;

export { type SomeInterface, someFn };
