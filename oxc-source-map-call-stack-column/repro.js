const xxx = {
  yyy() {
    Error.stackTraceLimit = 2;
    console.trace("__TEST__");
  },
};

xxx.yyy();

(0, xxx.yyy)();

const yyy = xxx.yyy;
yyy();

(0, yyy)();
