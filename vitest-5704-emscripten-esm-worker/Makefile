SRC_FILES = $(wildcard src/*.cpp)
OUT_FILES = $(patsubst src/%.cpp,dist/%.js,$(SRC_FILES))

all: $(OUT_FILES)

clean:
	rm -rf dist

dist/%.js: src/%.cpp
	mkdir -p dist
	emcc $< -o $@ -sEXPORT_ES6 --bind

.PHONY: all clean
