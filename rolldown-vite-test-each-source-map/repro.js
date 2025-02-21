const test = {
  each: () => {
    return (name, fn) => {
      fn();
    };
  },
};

test.each([1, 2])('custom %s', () => {
  console.trace('__DEBUG__');
});
