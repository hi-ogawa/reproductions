var Module = (() => {
	var _scriptName = import.meta.url;

	return async function (moduleArg = {}) {
		var moduleRtn;

		// include: shell.js
		// The Module object: Our interface to the outside world. We import
		// and export values on it. There are various ways Module can be used:
		// 1. Not defined. We create it here
		// 2. A function parameter, function(moduleArg) => Promise<Module>
		// 3. pre-run appended it, var Module = {}; ..generated code..
		// 4. External script tag defines var Module.
		// We need to check if Module already exists (e.g. case 3 above).
		// Substitution will be replaced with actual code on later stage of the build,
		// this way Closure Compiler will not mangle it (e.g. case 4. above).
		// Note that if you want to run closure, and also to use Module
		// after the generated code, you will need to define   var Module = {};
		// before the code. Then that object will be used in the code, and you
		// can continue to use Module afterwards as well.
		var Module = Object.assign({}, moduleArg);

		// Set up the promise that indicates the Module is initialized
		var readyPromiseResolve, readyPromiseReject;
		var readyPromise = new Promise((resolve, reject) => {
			readyPromiseResolve = resolve;
			readyPromiseReject = reject;
		});
		[
			"_memory",
			"___indirect_function_table",
			"_main",
			"onRuntimeInitialized",
		].forEach((prop) => {
			if (!Object.getOwnPropertyDescriptor(readyPromise, prop)) {
				Object.defineProperty(readyPromise, prop, {
					get: () =>
						abort(
							"You are getting " +
								prop +
								" on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js",
						),
					set: () =>
						abort(
							"You are setting " +
								prop +
								" on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js",
						),
				});
			}
		});

		// Determine the runtime environment we are in. You can customize this by
		// setting the ENVIRONMENT setting at compile time (see settings.js).

		// Attempt to auto-detect the environment
		var ENVIRONMENT_IS_WEB = typeof window == "object";
		var ENVIRONMENT_IS_WORKER = typeof importScripts == "function";
		// N.b. Electron.js environment is simultaneously a NODE-environment, but
		// also a web environment.
		var ENVIRONMENT_IS_NODE =
			typeof process == "object" &&
			typeof process.versions == "object" &&
			typeof process.versions.node == "string";
		var ENVIRONMENT_IS_SHELL =
			!ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

		if (Module["ENVIRONMENT"]) {
			throw new Error(
				"Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)",
			);
		}

		if (ENVIRONMENT_IS_NODE) {
			// `require()` is no-op in an ESM module, use `createRequire()` to construct
			// the require()` function.  This is only necessary for multi-environment
			// builds, `-sENVIRONMENT=node` emits a static import declaration instead.
			// TODO: Swap all `require()`'s with `import()`'s?
			const { createRequire } = await import("module");
			/** @suppress{duplicate} */
			var require = createRequire(import.meta.url);
		}

		// --pre-jses are emitted after the Module integration code, so that they can
		// refer to Module (if they choose; they can also define Module)

		// Sometimes an existing Module object exists with properties
		// meant to overwrite the default module functionality. Here
		// we collect those properties and reapply _after_ we configure
		// the current environment's defaults to avoid having to be so
		// defensive during initialization.
		var moduleOverrides = Object.assign({}, Module);

		var arguments_ = [];
		var thisProgram = "./this.program";
		var quit_ = (status, toThrow) => {
			throw toThrow;
		};

		// `/` should be present at the end if `scriptDirectory` is not empty
		var scriptDirectory = "";
		function locateFile(path) {
			if (Module["locateFile"]) {
				return Module["locateFile"](path, scriptDirectory);
			}
			return scriptDirectory + path;
		}

		// Hooks that are implemented differently in different runtime environments.
		var read_, readAsync, readBinary;

		if (ENVIRONMENT_IS_NODE) {
			if (
				typeof process == "undefined" ||
				!process.release ||
				process.release.name !== "node"
			)
				throw new Error(
					"not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)",
				);

			var nodeVersion = process.versions.node;
			var numericVersion = nodeVersion.split(".").slice(0, 3);
			numericVersion =
				numericVersion[0] * 10000 +
				numericVersion[1] * 100 +
				numericVersion[2].split("-")[0] * 1;
			var minVersion = 160000;
			if (numericVersion < 160000) {
				throw new Error(
					"This emscripten-generated code requires node v16.0.0 (detected v" +
						nodeVersion +
						")",
				);
			}

			// These modules will usually be used on Node.js. Load them eagerly to avoid
			// the complexity of lazy-loading.
			var fs = require("fs");
			var nodePath = require("path");

			// EXPORT_ES6 + ENVIRONMENT_IS_NODE always requires use of import.meta.url,
			// since there's no way getting the current absolute path of the module when
			// support for that is not available.
			scriptDirectory = require("url").fileURLToPath(
				new URL("./", import.meta.url),
			); // includes trailing slash

			// include: node_shell_read.js
			read_ = (filename, binary) => {
				// We need to re-wrap `file://` strings to URLs. Normalizing isn't
				// necessary in that case, the path should already be absolute.
				filename = isFileURI(filename)
					? new URL(filename)
					: nodePath.normalize(filename);
				return fs.readFileSync(filename, binary ? undefined : "utf8");
			};

			readBinary = (filename) => {
				var ret = read_(filename, true);
				if (!ret.buffer) {
					ret = new Uint8Array(ret);
				}
				assert(ret.buffer);
				return ret;
			};

			readAsync = (filename, onload, onerror, binary = true) => {
				// See the comment in the `read_` function.
				filename = isFileURI(filename)
					? new URL(filename)
					: nodePath.normalize(filename);
				fs.readFile(filename, binary ? undefined : "utf8", (err, data) => {
					if (err) onerror(err);
					else onload(binary ? data.buffer : data);
				});
			};
			// end include: node_shell_read.js
			if (!Module["thisProgram"] && process.argv.length > 1) {
				thisProgram = process.argv[1].replace(/\\/g, "/");
			}

			arguments_ = process.argv.slice(2);

			// MODULARIZE will export the module in the proper place outside, we don't need to export here

			process.on("uncaughtException", (ex) => {
				// suppress ExitStatus exceptions from showing an error
				if (
					ex !== "unwind" &&
					!(ex instanceof ExitStatus) &&
					!(ex.context instanceof ExitStatus)
				) {
					throw ex;
				}
			});

			quit_ = (status, toThrow) => {
				process.exitCode = status;
				throw toThrow;
			};
		} else if (ENVIRONMENT_IS_SHELL) {
			if (
				(typeof process == "object" && typeof require === "function") ||
				typeof window == "object" ||
				typeof importScripts == "function"
			)
				throw new Error(
					"not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)",
				);
		}

		// Note that this includes Node.js workers when relevant (pthreads is enabled).
		// Node.js workers are detected as a combination of ENVIRONMENT_IS_WORKER and
		// ENVIRONMENT_IS_NODE.
		else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
			if (ENVIRONMENT_IS_WORKER) {
				// Check worker, not web, since window could be polyfilled
				scriptDirectory = self.location.href;
			} else if (typeof document != "undefined" && document.currentScript) {
				// web
				scriptDirectory = document.currentScript.src;
			}
			// When MODULARIZE, this JS may be executed later, after document.currentScript
			// is gone, so we saved it, and we use it here instead of any other info.
			if (_scriptName) {
				scriptDirectory = _scriptName;
			}
			// blob urls look like blob:http://site.com/etc/etc and we cannot infer anything from them.
			// otherwise, slice off the final part of the url to find the script directory.
			// if scriptDirectory does not contain a slash, lastIndexOf will return -1,
			// and scriptDirectory will correctly be replaced with an empty string.
			// If scriptDirectory contains a query (starting with ?) or a fragment (starting with #),
			// they are removed because they could contain a slash.
			if (scriptDirectory.startsWith("blob:")) {
				scriptDirectory = "";
			} else {
				scriptDirectory = scriptDirectory.substr(
					0,
					scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1,
				);
			}

			if (!(typeof window == "object" || typeof importScripts == "function"))
				throw new Error(
					"not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)",
				);

			{
				// include: web_or_worker_shell_read.js
				read_ = (url) => {
					var xhr = new XMLHttpRequest();
					xhr.open("GET", url, false);
					xhr.send(null);
					return xhr.responseText;
				};

				if (ENVIRONMENT_IS_WORKER) {
					readBinary = (url) => {
						var xhr = new XMLHttpRequest();
						xhr.open("GET", url, false);
						xhr.responseType = "arraybuffer";
						xhr.send(null);
						return new Uint8Array(/** @type{!ArrayBuffer} */ (xhr.response));
					};
				}

				readAsync = (url, onload, onerror) => {
					var xhr = new XMLHttpRequest();
					xhr.open("GET", url, true);
					xhr.responseType = "arraybuffer";
					xhr.onload = () => {
						if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) {
							// file URLs can return 0
							onload(xhr.response);
							return;
						}
						onerror();
					};
					xhr.onerror = onerror;
					xhr.send(null);
				};

				// end include: web_or_worker_shell_read.js
			}
		} else {
			throw new Error("environment detection error");
		}

		var out = Module["print"] || console.log.bind(console);
		var err = Module["printErr"] || console.error.bind(console);

		// Merge back in the overrides
		Object.assign(Module, moduleOverrides);
		// Free the object hierarchy contained in the overrides, this lets the GC
		// reclaim data used.
		moduleOverrides = null;
		checkIncomingModuleAPI();

		// Emit code to handle expected values on the Module object. This applies Module.x
		// to the proper local x. This has two benefits: first, we only emit it if it is
		// expected to arrive, and second, by using a local everywhere else that can be
		// minified.

		if (Module["arguments"]) arguments_ = Module["arguments"];
		legacyModuleProp("arguments", "arguments_");

		if (Module["thisProgram"]) thisProgram = Module["thisProgram"];
		legacyModuleProp("thisProgram", "thisProgram");

		if (Module["quit"]) quit_ = Module["quit"];
		legacyModuleProp("quit", "quit_");

		// perform assertions in shell.js after we set up out() and err(), as otherwise if an assertion fails it cannot print the message
		// Assertions on removed incoming Module JS APIs.
		assert(
			typeof Module["memoryInitializerPrefixURL"] == "undefined",
			"Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead",
		);
		assert(
			typeof Module["pthreadMainPrefixURL"] == "undefined",
			"Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead",
		);
		assert(
			typeof Module["cdInitializerPrefixURL"] == "undefined",
			"Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead",
		);
		assert(
			typeof Module["filePackagePrefixURL"] == "undefined",
			"Module.filePackagePrefixURL option was removed, use Module.locateFile instead",
		);
		assert(
			typeof Module["read"] == "undefined",
			"Module.read option was removed (modify read_ in JS)",
		);
		assert(
			typeof Module["readAsync"] == "undefined",
			"Module.readAsync option was removed (modify readAsync in JS)",
		);
		assert(
			typeof Module["readBinary"] == "undefined",
			"Module.readBinary option was removed (modify readBinary in JS)",
		);
		assert(
			typeof Module["setWindowTitle"] == "undefined",
			"Module.setWindowTitle option was removed (modify emscripten_set_window_title in JS)",
		);
		assert(
			typeof Module["TOTAL_MEMORY"] == "undefined",
			"Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY",
		);
		legacyModuleProp("asm", "wasmExports");
		legacyModuleProp("read", "read_");
		legacyModuleProp("readAsync", "readAsync");
		legacyModuleProp("readBinary", "readBinary");
		legacyModuleProp("setWindowTitle", "setWindowTitle");
		var IDBFS = "IDBFS is no longer included by default; build with -lidbfs.js";
		var PROXYFS =
			"PROXYFS is no longer included by default; build with -lproxyfs.js";
		var WORKERFS =
			"WORKERFS is no longer included by default; build with -lworkerfs.js";
		var FETCHFS =
			"FETCHFS is no longer included by default; build with -lfetchfs.js";
		var ICASEFS =
			"ICASEFS is no longer included by default; build with -licasefs.js";
		var JSFILEFS =
			"JSFILEFS is no longer included by default; build with -ljsfilefs.js";
		var OPFS = "OPFS is no longer included by default; build with -lopfs.js";

		var NODEFS =
			"NODEFS is no longer included by default; build with -lnodefs.js";

		assert(
			!ENVIRONMENT_IS_SHELL,
			"shell environment detected but not enabled at build time.  Add `shell` to `-sENVIRONMENT` to enable.",
		);

		// end include: shell.js

		// include: preamble.js
		// === Preamble library stuff ===

		// Documentation for the public APIs defined in this file must be updated in:
		//    site/source/docs/api_reference/preamble.js.rst
		// A prebuilt local version of the documentation is available at:
		//    site/build/text/docs/api_reference/preamble.js.txt
		// You can also build docs locally as HTML or other formats in site/
		// An online HTML version (which may be of a different version of Emscripten)
		//    is up at http://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html

		var wasmBinary;
		if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];
		legacyModuleProp("wasmBinary", "wasmBinary");

		if (typeof WebAssembly != "object") {
			err("no native wasm support detected");
		}

		// Wasm globals

		var wasmMemory;

		//========================================
		// Runtime essentials
		//========================================

		// whether we are quitting the application. no code should run after this.
		// set in exit() and abort()
		var ABORT = false;

		// set by exit() and abort().  Passed to 'onExit' handler.
		// NOTE: This is also used as the process return code code in shell environments
		// but only when noExitRuntime is false.
		var EXITSTATUS;

		// In STRICT mode, we only define assert() when ASSERTIONS is set.  i.e. we
		// don't define it at all in release modes.  This matches the behaviour of
		// MINIMAL_RUNTIME.
		// TODO(sbc): Make this the default even without STRICT enabled.
		/** @type {function(*, string=)} */
		function assert(condition, text) {
			if (!condition) {
				abort("Assertion failed" + (text ? ": " + text : ""));
			}
		}

		// We used to include malloc/free by default in the past. Show a helpful error in
		// builds with assertions.

		// Memory management

		var HEAP,
			/** @type {!Int8Array} */
			HEAP8,
			/** @type {!Uint8Array} */
			HEAPU8,
			/** @type {!Int16Array} */
			HEAP16,
			/** @type {!Uint16Array} */
			HEAPU16,
			/** @type {!Int32Array} */
			HEAP32,
			/** @type {!Uint32Array} */
			HEAPU32,
			/** @type {!Float32Array} */
			HEAPF32,
			/** @type {!Float64Array} */
			HEAPF64;

		// include: runtime_shared.js
		function updateMemoryViews() {
			var b = wasmMemory.buffer;
			Module["HEAP8"] = HEAP8 = new Int8Array(b);
			Module["HEAP16"] = HEAP16 = new Int16Array(b);
			Module["HEAPU8"] = HEAPU8 = new Uint8Array(b);
			Module["HEAPU16"] = HEAPU16 = new Uint16Array(b);
			Module["HEAP32"] = HEAP32 = new Int32Array(b);
			Module["HEAPU32"] = HEAPU32 = new Uint32Array(b);
			Module["HEAPF32"] = HEAPF32 = new Float32Array(b);
			Module["HEAPF64"] = HEAPF64 = new Float64Array(b);
		}
		// end include: runtime_shared.js
		assert(
			!Module["STACK_SIZE"],
			"STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time",
		);

		assert(
			typeof Int32Array != "undefined" &&
				typeof Float64Array !== "undefined" &&
				Int32Array.prototype.subarray != undefined &&
				Int32Array.prototype.set != undefined,
			"JS engine does not provide full typed array support",
		);

		// If memory is defined in wasm, the user can't provide it, or set INITIAL_MEMORY
		assert(
			!Module["wasmMemory"],
			"Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally",
		);
		assert(
			!Module["INITIAL_MEMORY"],
			"Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically",
		);

		// include: runtime_stack_check.js
		// Initializes the stack cookie. Called at the startup of main and at the startup of each thread in pthreads mode.
		function writeStackCookie() {
			var max = _emscripten_stack_get_end();
			assert((max & 3) == 0);
			// If the stack ends at address zero we write our cookies 4 bytes into the
			// stack.  This prevents interference with SAFE_HEAP and ASAN which also
			// monitor writes to address zero.
			if (max == 0) {
				max += 4;
			}
			// The stack grow downwards towards _emscripten_stack_get_end.
			// We write cookies to the final two words in the stack and detect if they are
			// ever overwritten.
			HEAPU32[max >> 2] = 0x02135467;
			HEAPU32[(max + 4) >> 2] = 0x89bacdfe;
			// Also test the global address 0 for integrity.
			HEAPU32[0 >> 2] = 1668509029;
		}

		function checkStackCookie() {
			if (ABORT) return;
			var max = _emscripten_stack_get_end();
			// See writeStackCookie().
			if (max == 0) {
				max += 4;
			}
			var cookie1 = HEAPU32[max >> 2];
			var cookie2 = HEAPU32[(max + 4) >> 2];
			if (cookie1 != 0x02135467 || cookie2 != 0x89bacdfe) {
				abort(
					`Stack overflow! Stack cookie has been overwritten at ${ptrToString(
						max,
					)}, expected hex dwords 0x89BACDFE and 0x2135467, but received ${ptrToString(
						cookie2,
					)} ${ptrToString(cookie1)}`,
				);
			}
			// Also test the global address 0 for integrity.
			if (HEAPU32[0 >> 2] != 0x63736d65 /* 'emsc' */) {
				abort(
					"Runtime error: The application has corrupted its heap memory area (address zero)!",
				);
			}
		}
		// end include: runtime_stack_check.js
		// include: runtime_assertions.js
		// Endianness check
		(function () {
			var h16 = new Int16Array(1);
			var h8 = new Int8Array(h16.buffer);
			h16[0] = 0x6373;
			if (h8[0] !== 0x73 || h8[1] !== 0x63)
				throw "Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)";
		})();

		// end include: runtime_assertions.js
		var __ATPRERUN__ = []; // functions called before the runtime is initialized
		var __ATINIT__ = []; // functions called during startup
		var __ATMAIN__ = []; // functions called when main() is to be run
		var __ATEXIT__ = []; // functions called during shutdown
		var __ATPOSTRUN__ = []; // functions called after the main() is called

		var runtimeInitialized = false;

		function preRun() {
			if (Module["preRun"]) {
				if (typeof Module["preRun"] == "function")
					Module["preRun"] = [Module["preRun"]];
				while (Module["preRun"].length) {
					addOnPreRun(Module["preRun"].shift());
				}
			}
			callRuntimeCallbacks(__ATPRERUN__);
		}

		function initRuntime() {
			assert(!runtimeInitialized);
			runtimeInitialized = true;

			checkStackCookie();

			callRuntimeCallbacks(__ATINIT__);
		}

		function preMain() {
			checkStackCookie();

			callRuntimeCallbacks(__ATMAIN__);
		}

		function postRun() {
			checkStackCookie();

			if (Module["postRun"]) {
				if (typeof Module["postRun"] == "function")
					Module["postRun"] = [Module["postRun"]];
				while (Module["postRun"].length) {
					addOnPostRun(Module["postRun"].shift());
				}
			}

			callRuntimeCallbacks(__ATPOSTRUN__);
		}

		function addOnPreRun(cb) {
			__ATPRERUN__.unshift(cb);
		}

		function addOnInit(cb) {
			__ATINIT__.unshift(cb);
		}

		function addOnPreMain(cb) {
			__ATMAIN__.unshift(cb);
		}

		function addOnExit(cb) {}

		function addOnPostRun(cb) {
			__ATPOSTRUN__.unshift(cb);
		}

		// include: runtime_math.js
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul

		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/fround

		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32

		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc

		assert(
			Math.imul,
			"This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill",
		);
		assert(
			Math.fround,
			"This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill",
		);
		assert(
			Math.clz32,
			"This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill",
		);
		assert(
			Math.trunc,
			"This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill",
		);
		// end include: runtime_math.js
		// A counter of dependencies for calling run(). If we need to
		// do asynchronous work before running, increment this and
		// decrement it. Incrementing must happen in a place like
		// Module.preRun (used by emcc to add file preloading).
		// Note that you can add dependencies in preRun, even though
		// it happens right before run - run will be postponed until
		// the dependencies are met.
		var runDependencies = 0;
		var runDependencyWatcher = null;
		var dependenciesFulfilled = null; // overridden to take different actions when all run dependencies are fulfilled
		var runDependencyTracking = {};

		function getUniqueRunDependency(id) {
			var orig = id;
			while (1) {
				if (!runDependencyTracking[id]) return id;
				id = orig + Math.random();
			}
		}

		function addRunDependency(id) {
			runDependencies++;

			Module["monitorRunDependencies"]?.(runDependencies);

			if (id) {
				assert(!runDependencyTracking[id]);
				runDependencyTracking[id] = 1;
				if (
					runDependencyWatcher === null &&
					typeof setInterval != "undefined"
				) {
					// Check for missing dependencies every few seconds
					runDependencyWatcher = setInterval(() => {
						if (ABORT) {
							clearInterval(runDependencyWatcher);
							runDependencyWatcher = null;
							return;
						}
						var shown = false;
						for (var dep in runDependencyTracking) {
							if (!shown) {
								shown = true;
								err("still waiting on run dependencies:");
							}
							err(`dependency: ${dep}`);
						}
						if (shown) {
							err("(end of list)");
						}
					}, 10000);
				}
			} else {
				err("warning: run dependency added without ID");
			}
		}

		function removeRunDependency(id) {
			runDependencies--;

			Module["monitorRunDependencies"]?.(runDependencies);

			if (id) {
				assert(runDependencyTracking[id]);
				delete runDependencyTracking[id];
			} else {
				err("warning: run dependency removed without ID");
			}
			if (runDependencies == 0) {
				if (runDependencyWatcher !== null) {
					clearInterval(runDependencyWatcher);
					runDependencyWatcher = null;
				}
				if (dependenciesFulfilled) {
					var callback = dependenciesFulfilled;
					dependenciesFulfilled = null;
					callback(); // can add another dependenciesFulfilled
				}
			}
		}

		/** @param {string|number=} what */
		function abort(what) {
			Module["onAbort"]?.(what);

			what = "Aborted(" + what + ")";
			// TODO(sbc): Should we remove printing and leave it up to whoever
			// catches the exception?
			err(what);

			ABORT = true;
			EXITSTATUS = 1;

			// Use a wasm runtime error, because a JS error might be seen as a foreign
			// exception, which means we'd run destructors on it. We need the error to
			// simply make the program stop.
			// FIXME This approach does not work in Wasm EH because it currently does not assume
			// all RuntimeErrors are from traps; it decides whether a RuntimeError is from
			// a trap or not based on a hidden field within the object. So at the moment
			// we don't have a way of throwing a wasm trap from JS. TODO Make a JS API that
			// allows this in the wasm spec.

			// Suppress closure compiler warning here. Closure compiler's builtin extern
			// definition for WebAssembly.RuntimeError claims it takes no arguments even
			// though it can.
			// TODO(https://github.com/google/closure-compiler/pull/3913): Remove if/when upstream closure gets fixed.
			/** @suppress {checkTypes} */
			var e = new WebAssembly.RuntimeError(what);

			readyPromiseReject(e);
			// Throw the error whether or not MODULARIZE is set because abort is used
			// in code paths apart from instantiation where an exception is expected
			// to be thrown when abort is called.
			throw e;
		}

		// include: memoryprofiler.js
		// end include: memoryprofiler.js
		// show errors on likely calls to FS when it was not included
		var FS = {
			error() {
				abort(
					"Filesystem support (FS) was not included. The problem is that you are using files from JS, but files were not used from C/C++, so filesystem support was not auto-included. You can force-include filesystem support with -sFORCE_FILESYSTEM",
				);
			},
			init() {
				FS.error();
			},
			createDataFile() {
				FS.error();
			},
			createPreloadedFile() {
				FS.error();
			},
			createLazyFile() {
				FS.error();
			},
			open() {
				FS.error();
			},
			mkdev() {
				FS.error();
			},
			registerDevice() {
				FS.error();
			},
			analyzePath() {
				FS.error();
			},

			ErrnoError() {
				FS.error();
			},
		};
		Module["FS_createDataFile"] = FS.createDataFile;
		Module["FS_createPreloadedFile"] = FS.createPreloadedFile;

		// include: URIUtils.js
		// Prefix of data URIs emitted by SINGLE_FILE and related options.
		var dataURIPrefix = "data:application/octet-stream;base64,";

		/**
		 * Indicates whether filename is a base64 data URI.
		 * @noinline
		 */
		var isDataURI = (filename) => filename.startsWith(dataURIPrefix);

		/**
		 * Indicates whether filename is delivered via file protocol (as opposed to http/https)
		 * @noinline
		 */
		var isFileURI = (filename) => filename.startsWith("file://");
		// end include: URIUtils.js
		function createExportWrapper(name, nargs) {
			return (...args) => {
				assert(
					runtimeInitialized,
					`native function \`${name}\` called before runtime initialization`,
				);
				var f = wasmExports[name];
				assert(f, `exported native function \`${name}\` not found`);
				// Only assert for too many arguments. Too few can be valid since the missing arguments will be zero filled.
				assert(
					args.length <= nargs,
					`native function \`${name}\` called with ${args.length} args but expects ${nargs}`,
				);
				return f(...args);
			};
		}

		// include: runtime_exceptions.js
		// end include: runtime_exceptions.js
		function findWasmBinary() {
			if (Module["locateFile"]) {
				var f = "main.wasm";
				if (!isDataURI(f)) {
					return locateFile(f);
				}
				return f;
			}
			// Use bundler-friendly `new URL(..., import.meta.url)` pattern; works in browsers too.
			return new URL("main.wasm", import.meta.url).href;
		}

		var wasmBinaryFile;

		function getBinarySync(file) {
			if (file == wasmBinaryFile && wasmBinary) {
				return new Uint8Array(wasmBinary);
			}
			if (readBinary) {
				return readBinary(file);
			}
			throw "both async and sync fetching of the wasm failed";
		}

		function getBinaryPromise(binaryFile) {
			// If we don't have the binary yet, try to load it asynchronously.
			// Fetch has some additional restrictions over XHR, like it can't be used on a file:// url.
			// See https://github.com/github/fetch/pull/92#issuecomment-140665932
			// Cordova or Electron apps are typically loaded from a file:// url.
			// So use fetch if it is available and the url is not a file, otherwise fall back to XHR.
			if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
				if (typeof fetch == "function" && !isFileURI(binaryFile)) {
					return fetch(binaryFile, { credentials: "same-origin" })
						.then((response) => {
							if (!response["ok"]) {
								throw `failed to load wasm binary file at '${binaryFile}'`;
							}
							return response["arrayBuffer"]();
						})
						.catch(() => getBinarySync(binaryFile));
				} else if (readAsync) {
					// fetch is not available or url is file => try XHR (readAsync uses XHR internally)
					return new Promise((resolve, reject) => {
						readAsync(
							binaryFile,
							(response) =>
								resolve(new Uint8Array(/** @type{!ArrayBuffer} */ (response))),
							reject,
						);
					});
				}
			}

			// Otherwise, getBinarySync should be able to get it synchronously
			return Promise.resolve().then(() => getBinarySync(binaryFile));
		}

		function instantiateArrayBuffer(binaryFile, imports, receiver) {
			return getBinaryPromise(binaryFile)
				.then((binary) => {
					return WebAssembly.instantiate(binary, imports);
				})
				.then(receiver, (reason) => {
					err(`failed to asynchronously prepare wasm: ${reason}`);

					// Warn on some common problems.
					if (isFileURI(wasmBinaryFile)) {
						err(
							`warning: Loading from a file URI (${wasmBinaryFile}) is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing`,
						);
					}
					abort(reason);
				});
		}

		function instantiateAsync(binary, binaryFile, imports, callback) {
			if (
				!binary &&
				typeof WebAssembly.instantiateStreaming == "function" &&
				!isDataURI(binaryFile) &&
				// Don't use streaming for file:// delivered objects in a webview, fetch them synchronously.
				!isFileURI(binaryFile) &&
				// Avoid instantiateStreaming() on Node.js environment for now, as while
				// Node.js v18.1.0 implements it, it does not have a full fetch()
				// implementation yet.
				//
				// Reference:
				//   https://github.com/emscripten-core/emscripten/pull/16917
				!ENVIRONMENT_IS_NODE &&
				typeof fetch == "function"
			) {
				return fetch(binaryFile, { credentials: "same-origin" }).then(
					(response) => {
						// Suppress closure warning here since the upstream definition for
						// instantiateStreaming only allows Promise<Repsponse> rather than
						// an actual Response.
						// TODO(https://github.com/google/closure-compiler/pull/3913): Remove if/when upstream closure is fixed.
						/** @suppress {checkTypes} */
						var result = WebAssembly.instantiateStreaming(response, imports);

						return result.then(callback, function (reason) {
							// We expect the most common failure cause to be a bad MIME type for the binary,
							// in which case falling back to ArrayBuffer instantiation should work.
							err(`wasm streaming compile failed: ${reason}`);
							err("falling back to ArrayBuffer instantiation");
							return instantiateArrayBuffer(binaryFile, imports, callback);
						});
					},
				);
			}
			return instantiateArrayBuffer(binaryFile, imports, callback);
		}

		function getWasmImports() {
			// prepare imports
			return {
				env: wasmImports,
				wasi_snapshot_preview1: wasmImports,
			};
		}

		// Create the wasm instance.
		// Receives the wasm imports, returns the exports.
		function createWasm() {
			var info = getWasmImports();
			// Load the wasm module and create an instance of using native support in the JS engine.
			// handle a generated wasm instance, receiving its exports and
			// performing other necessary setup
			/** @param {WebAssembly.Module=} module*/
			function receiveInstance(instance, module) {
				wasmExports = instance.exports;

				wasmMemory = wasmExports["memory"];

				assert(wasmMemory, "memory not found in wasm exports");
				updateMemoryViews();

				addOnInit(wasmExports["__wasm_call_ctors"]);

				removeRunDependency("wasm-instantiate");
				return wasmExports;
			}
			// wait for the pthread pool (if any)
			addRunDependency("wasm-instantiate");

			// Prefer streaming instantiation if available.
			// Async compilation can be confusing when an error on the page overwrites Module
			// (for example, if the order of elements is wrong, and the one defining Module is
			// later), so we save Module and check it later.
			var trueModule = Module;
			function receiveInstantiationResult(result) {
				// 'result' is a ResultObject object which has both the module and instance.
				// receiveInstance() will swap in the exports (to Module.asm) so they can be called
				assert(
					Module === trueModule,
					"the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?",
				);
				trueModule = null;
				// TODO: Due to Closure regression https://github.com/google/closure-compiler/issues/3193, the above line no longer optimizes out down to the following line.
				// When the regression is fixed, can restore the above PTHREADS-enabled path.
				receiveInstance(result["instance"]);
			}

			// User shell pages can write their own Module.instantiateWasm = function(imports, successCallback) callback
			// to manually instantiate the Wasm module themselves. This allows pages to
			// run the instantiation parallel to any other async startup actions they are
			// performing.
			// Also pthreads and wasm workers initialize the wasm instance through this
			// path.
			if (Module["instantiateWasm"]) {
				try {
					return Module["instantiateWasm"](info, receiveInstance);
				} catch (e) {
					err(`Module.instantiateWasm callback failed with error: ${e}`);
					// If instantiation fails, reject the module ready promise.
					readyPromiseReject(e);
				}
			}

			if (!wasmBinaryFile) wasmBinaryFile = findWasmBinary();

			// If instantiation fails, reject the module ready promise.
			instantiateAsync(
				wasmBinary,
				wasmBinaryFile,
				info,
				receiveInstantiationResult,
			).catch(readyPromiseReject);
			return {}; // no exports yet; we'll fill them in later
		}

		// Globals used by JS i64 conversions (see makeSetValue)
		var tempDouble;
		var tempI64;

		// include: runtime_debug.js
		function legacyModuleProp(prop, newName, incoming = true) {
			if (!Object.getOwnPropertyDescriptor(Module, prop)) {
				Object.defineProperty(Module, prop, {
					configurable: true,
					get() {
						let extra = incoming
							? " (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)"
							: "";
						abort(
							`\`Module.${prop}\` has been replaced by \`${newName}\`` + extra,
						);
					},
				});
			}
		}

		function ignoredModuleProp(prop) {
			if (Object.getOwnPropertyDescriptor(Module, prop)) {
				abort(
					`\`Module.${prop}\` was supplied but \`${prop}\` not included in INCOMING_MODULE_JS_API`,
				);
			}
		}

		// forcing the filesystem exports a few things by default
		function isExportedByForceFilesystem(name) {
			return (
				name === "FS_createPath" ||
				name === "FS_createDataFile" ||
				name === "FS_createPreloadedFile" ||
				name === "FS_unlink" ||
				name === "addRunDependency" ||
				// The old FS has some functionality that WasmFS lacks.
				name === "FS_createLazyFile" ||
				name === "FS_createDevice" ||
				name === "removeRunDependency"
			);
		}

		function missingGlobal(sym, msg) {
			if (typeof globalThis != "undefined") {
				Object.defineProperty(globalThis, sym, {
					configurable: true,
					get() {
						warnOnce(`\`${sym}\` is not longer defined by emscripten. ${msg}`);
						return undefined;
					},
				});
			}
		}

		missingGlobal("buffer", "Please use HEAP8.buffer or wasmMemory.buffer");
		missingGlobal("asm", "Please use wasmExports instead");

		function missingLibrarySymbol(sym) {
			if (
				typeof globalThis != "undefined" &&
				!Object.getOwnPropertyDescriptor(globalThis, sym)
			) {
				Object.defineProperty(globalThis, sym, {
					configurable: true,
					get() {
						// Can't `abort()` here because it would break code that does runtime
						// checks.  e.g. `if (typeof SDL === 'undefined')`.
						var msg = `\`${sym}\` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line`;
						// DEFAULT_LIBRARY_FUNCS_TO_INCLUDE requires the name as it appears in
						// library.js, which means $name for a JS name with no prefix, or name
						// for a JS name like _name.
						var librarySymbol = sym;
						if (!librarySymbol.startsWith("_")) {
							librarySymbol = "$" + sym;
						}
						msg += ` (e.g. -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE='${librarySymbol}')`;
						if (isExportedByForceFilesystem(sym)) {
							msg +=
								". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you";
						}
						warnOnce(msg);
						return undefined;
					},
				});
			}
			// Any symbol that is not included from the JS library is also (by definition)
			// not exported on the Module object.
			unexportedRuntimeSymbol(sym);
		}

		function unexportedRuntimeSymbol(sym) {
			if (!Object.getOwnPropertyDescriptor(Module, sym)) {
				Object.defineProperty(Module, sym, {
					configurable: true,
					get() {
						var msg = `'${sym}' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the Emscripten FAQ)`;
						if (isExportedByForceFilesystem(sym)) {
							msg +=
								". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you";
						}
						abort(msg);
					},
				});
			}
		}

		// Used by XXXXX_DEBUG settings to output debug messages.
		function dbg(...args) {
			// TODO(sbc): Make this configurable somehow.  Its not always convenient for
			// logging to show up as warnings.
			console.warn(...args);
		}
		// end include: runtime_debug.js
		// === Body ===
		// end include: preamble.js

		/** @constructor */
		function ExitStatus(status) {
			this.name = "ExitStatus";
			this.message = `Program terminated with exit(${status})`;
			this.status = status;
		}

		var callRuntimeCallbacks = (callbacks) => {
			while (callbacks.length > 0) {
				// Pass the module as the first argument.
				callbacks.shift()(Module);
			}
		};

		/**
		 * @param {number} ptr
		 * @param {string} type
		 */
		function getValue(ptr, type = "i8") {
			if (type.endsWith("*")) type = "*";
			switch (type) {
				case "i1":
					return HEAP8[ptr];
				case "i8":
					return HEAP8[ptr];
				case "i16":
					return HEAP16[ptr >> 1];
				case "i32":
					return HEAP32[ptr >> 2];
				case "i64":
					abort("to do getValue(i64) use WASM_BIGINT");
				case "float":
					return HEAPF32[ptr >> 2];
				case "double":
					return HEAPF64[ptr >> 3];
				case "*":
					return HEAPU32[ptr >> 2];
				default:
					abort(`invalid type for getValue: ${type}`);
			}
		}

		var noExitRuntime = Module["noExitRuntime"] || true;

		var ptrToString = (ptr) => {
			assert(typeof ptr === "number");
			// With CAN_ADDRESS_2GB or MEMORY64, pointers are already unsigned.
			ptr >>>= 0;
			return "0x" + ptr.toString(16).padStart(8, "0");
		};

		/**
		 * @param {number} ptr
		 * @param {number} value
		 * @param {string} type
		 */
		function setValue(ptr, value, type = "i8") {
			if (type.endsWith("*")) type = "*";
			switch (type) {
				case "i1":
					HEAP8[ptr] = value;
					break;
				case "i8":
					HEAP8[ptr] = value;
					break;
				case "i16":
					HEAP16[ptr >> 1] = value;
					break;
				case "i32":
					HEAP32[ptr >> 2] = value;
					break;
				case "i64":
					abort("to do setValue(i64) use WASM_BIGINT");
				case "float":
					HEAPF32[ptr >> 2] = value;
					break;
				case "double":
					HEAPF64[ptr >> 3] = value;
					break;
				case "*":
					HEAPU32[ptr >> 2] = value;
					break;
				default:
					abort(`invalid type for setValue: ${type}`);
			}
		}

		var stackRestore = (val) => __emscripten_stack_restore(val);

		var stackSave = () => _emscripten_stack_get_current();

		var warnOnce = (text) => {
			warnOnce.shown ||= {};
			if (!warnOnce.shown[text]) {
				warnOnce.shown[text] = 1;
				if (ENVIRONMENT_IS_NODE) text = "warning: " + text;
				err(text);
			}
		};

		var UTF8Decoder =
			typeof TextDecoder != "undefined" ? new TextDecoder("utf8") : undefined;

		/**
		 * Given a pointer 'idx' to a null-terminated UTF8-encoded string in the given
		 * array that contains uint8 values, returns a copy of that string as a
		 * Javascript String object.
		 * heapOrArray is either a regular array, or a JavaScript typed array view.
		 * @param {number} idx
		 * @param {number=} maxBytesToRead
		 * @return {string}
		 */
		var UTF8ArrayToString = (heapOrArray, idx, maxBytesToRead) => {
			var endIdx = idx + maxBytesToRead;
			var endPtr = idx;
			// TextDecoder needs to know the byte length in advance, it doesn't stop on
			// null terminator by itself.  Also, use the length info to avoid running tiny
			// strings through TextDecoder, since .subarray() allocates garbage.
			// (As a tiny code save trick, compare endPtr against endIdx using a negation,
			// so that undefined means Infinity)
			while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr;

			if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
				return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
			}
			var str = "";
			// If building with TextDecoder, we have already computed the string length
			// above, so test loop end condition against that
			while (idx < endPtr) {
				// For UTF8 byte structure, see:
				// http://en.wikipedia.org/wiki/UTF-8#Description
				// https://www.ietf.org/rfc/rfc2279.txt
				// https://tools.ietf.org/html/rfc3629
				var u0 = heapOrArray[idx++];
				if (!(u0 & 0x80)) {
					str += String.fromCharCode(u0);
					continue;
				}
				var u1 = heapOrArray[idx++] & 63;
				if ((u0 & 0xe0) == 0xc0) {
					str += String.fromCharCode(((u0 & 31) << 6) | u1);
					continue;
				}
				var u2 = heapOrArray[idx++] & 63;
				if ((u0 & 0xf0) == 0xe0) {
					u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
				} else {
					if ((u0 & 0xf8) != 0xf0)
						warnOnce(
							"Invalid UTF-8 leading byte " +
								ptrToString(u0) +
								" encountered when deserializing a UTF-8 string in wasm memory to a JS string!",
						);
					u0 =
						((u0 & 7) << 18) |
						(u1 << 12) |
						(u2 << 6) |
						(heapOrArray[idx++] & 63);
				}

				if (u0 < 0x10000) {
					str += String.fromCharCode(u0);
				} else {
					var ch = u0 - 0x10000;
					str += String.fromCharCode(
						0xd800 | (ch >> 10),
						0xdc00 | (ch & 0x3ff),
					);
				}
			}
			return str;
		};

		/**
		 * Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the
		 * emscripten HEAP, returns a copy of that string as a Javascript String object.
		 *
		 * @param {number} ptr
		 * @param {number=} maxBytesToRead - An optional length that specifies the
		 *   maximum number of bytes to read. You can omit this parameter to scan the
		 *   string until the first 0 byte. If maxBytesToRead is passed, and the string
		 *   at [ptr, ptr+maxBytesToReadr[ contains a null byte in the middle, then the
		 *   string will cut short at that byte index (i.e. maxBytesToRead will not
		 *   produce a string of exact length [ptr, ptr+maxBytesToRead[) N.B. mixing
		 *   frequent uses of UTF8ToString() with and without maxBytesToRead may throw
		 *   JS JIT optimizations off, so it is worth to consider consistently using one
		 * @return {string}
		 */
		var UTF8ToString = (ptr, maxBytesToRead) => {
			assert(
				typeof ptr == "number",
				`UTF8ToString expects a number (got ${typeof ptr})`,
			);
			return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
		};
		var ___assert_fail = (condition, filename, line, func) => {
			abort(
				`Assertion failed: ${UTF8ToString(condition)}, at: ` +
					[
						filename ? UTF8ToString(filename) : "unknown filename",
						line,
						func ? UTF8ToString(func) : "unknown function",
					],
			);
		};

		var __embind_register_bigint = (
			primitiveType,
			name,
			size,
			minRange,
			maxRange,
		) => {};

		var embind_init_charCodes = () => {
			var codes = new Array(256);
			for (var i = 0; i < 256; ++i) {
				codes[i] = String.fromCharCode(i);
			}
			embind_charCodes = codes;
		};
		var embind_charCodes;
		var readLatin1String = (ptr) => {
			var ret = "";
			var c = ptr;
			while (HEAPU8[c]) {
				ret += embind_charCodes[HEAPU8[c++]];
			}
			return ret;
		};

		var awaitingDependencies = {};

		var registeredTypes = {};

		var typeDependencies = {};

		var BindingError;
		var throwBindingError = (message) => {
			throw new BindingError(message);
		};

		var InternalError;
		var throwInternalError = (message) => {
			throw new InternalError(message);
		};
		var whenDependentTypesAreResolved = (
			myTypes,
			dependentTypes,
			getTypeConverters,
		) => {
			myTypes.forEach(function (type) {
				typeDependencies[type] = dependentTypes;
			});

			function onComplete(typeConverters) {
				var myTypeConverters = getTypeConverters(typeConverters);
				if (myTypeConverters.length !== myTypes.length) {
					throwInternalError("Mismatched type converter count");
				}
				for (var i = 0; i < myTypes.length; ++i) {
					registerType(myTypes[i], myTypeConverters[i]);
				}
			}

			var typeConverters = new Array(dependentTypes.length);
			var unregisteredTypes = [];
			var registered = 0;
			dependentTypes.forEach((dt, i) => {
				if (registeredTypes.hasOwnProperty(dt)) {
					typeConverters[i] = registeredTypes[dt];
				} else {
					unregisteredTypes.push(dt);
					if (!awaitingDependencies.hasOwnProperty(dt)) {
						awaitingDependencies[dt] = [];
					}
					awaitingDependencies[dt].push(() => {
						typeConverters[i] = registeredTypes[dt];
						++registered;
						if (registered === unregisteredTypes.length) {
							onComplete(typeConverters);
						}
					});
				}
			});
			if (0 === unregisteredTypes.length) {
				onComplete(typeConverters);
			}
		};
		/** @param {Object=} options */
		function sharedRegisterType(rawType, registeredInstance, options = {}) {
			var name = registeredInstance.name;
			if (!rawType) {
				throwBindingError(
					`type "${name}" must have a positive integer typeid pointer`,
				);
			}
			if (registeredTypes.hasOwnProperty(rawType)) {
				if (options.ignoreDuplicateRegistrations) {
					return;
				} else {
					throwBindingError(`Cannot register type '${name}' twice`);
				}
			}

			registeredTypes[rawType] = registeredInstance;
			delete typeDependencies[rawType];

			if (awaitingDependencies.hasOwnProperty(rawType)) {
				var callbacks = awaitingDependencies[rawType];
				delete awaitingDependencies[rawType];
				callbacks.forEach((cb) => cb());
			}
		}
		/** @param {Object=} options */
		function registerType(rawType, registeredInstance, options = {}) {
			if (!("argPackAdvance" in registeredInstance)) {
				throw new TypeError(
					"registerType registeredInstance requires argPackAdvance",
				);
			}
			return sharedRegisterType(rawType, registeredInstance, options);
		}

		var GenericWireTypeSize = 8;
		/** @suppress {globalThis} */
		var __embind_register_bool = (rawType, name, trueValue, falseValue) => {
			name = readLatin1String(name);
			registerType(rawType, {
				name,
				fromWireType: function (wt) {
					// ambiguous emscripten ABI: sometimes return values are
					// true or false, and sometimes integers (0 or 1)
					return !!wt;
				},
				toWireType: function (destructors, o) {
					return o ? trueValue : falseValue;
				},
				argPackAdvance: GenericWireTypeSize,
				readValueFromPointer: function (pointer) {
					return this["fromWireType"](HEAPU8[pointer]);
				},
				destructorFunction: null, // This type does not need a destructor
			});
		};

		var emval_freelist = [];

		var emval_handles = [];
		var __emval_decref = (handle) => {
			if (handle > 9 && 0 === --emval_handles[handle + 1]) {
				assert(
					emval_handles[handle] !== undefined,
					`Decref for unallocated handle.`,
				);
				emval_handles[handle] = undefined;
				emval_freelist.push(handle);
			}
		};

		var count_emval_handles = () => {
			return emval_handles.length / 2 - 5 - emval_freelist.length;
		};

		var init_emval = () => {
			// reserve 0 and some special values. These never get de-allocated.
			emval_handles.push(0, 1, undefined, 1, null, 1, true, 1, false, 1);
			assert(emval_handles.length === 5 * 2);
			Module["count_emval_handles"] = count_emval_handles;
		};
		var Emval = {
			toValue: (handle) => {
				if (!handle) {
					throwBindingError("Cannot use deleted val. handle = " + handle);
				}
				// handle 2 is supposed to be `undefined`.
				assert(
					handle === 2 ||
						(emval_handles[handle] !== undefined && handle % 2 === 0),
					`invalid handle: ${handle}`,
				);
				return emval_handles[handle];
			},
			toHandle: (value) => {
				switch (value) {
					case undefined:
						return 2;
					case null:
						return 4;
					case true:
						return 6;
					case false:
						return 8;
					default: {
						const handle = emval_freelist.pop() || emval_handles.length;
						emval_handles[handle] = value;
						emval_handles[handle + 1] = 1;
						return handle;
					}
				}
			},
		};

		/** @suppress {globalThis} */
		function readPointer(pointer) {
			return this["fromWireType"](HEAPU32[pointer >> 2]);
		}

		var EmValType = {
			name: "emscripten::val",
			fromWireType: (handle) => {
				var rv = Emval.toValue(handle);
				__emval_decref(handle);
				return rv;
			},
			toWireType: (destructors, value) => Emval.toHandle(value),
			argPackAdvance: GenericWireTypeSize,
			readValueFromPointer: readPointer,
			destructorFunction: null, // This type does not need a destructor

			// TODO: do we need a deleteObject here?  write a test where
			// emval is passed into JS via an interface
		};
		var __embind_register_emval = (rawType) => registerType(rawType, EmValType);

		var embindRepr = (v) => {
			if (v === null) {
				return "null";
			}
			var t = typeof v;
			if (t === "object" || t === "array" || t === "function") {
				return v.toString();
			} else {
				return "" + v;
			}
		};

		var floatReadValueFromPointer = (name, width) => {
			switch (width) {
				case 4:
					return function (pointer) {
						return this["fromWireType"](HEAPF32[pointer >> 2]);
					};
				case 8:
					return function (pointer) {
						return this["fromWireType"](HEAPF64[pointer >> 3]);
					};
				default:
					throw new TypeError(`invalid float width (${width}): ${name}`);
			}
		};

		var __embind_register_float = (rawType, name, size) => {
			name = readLatin1String(name);
			registerType(rawType, {
				name,
				fromWireType: (value) => value,
				toWireType: (destructors, value) => {
					if (typeof value != "number" && typeof value != "boolean") {
						throw new TypeError(
							`Cannot convert ${embindRepr(value)} to ${this.name}`,
						);
					}
					// The VM will perform JS to Wasm value conversion, according to the spec:
					// https://www.w3.org/TR/wasm-js-api-1/#towebassemblyvalue
					return value;
				},
				argPackAdvance: GenericWireTypeSize,
				readValueFromPointer: floatReadValueFromPointer(name, size),
				destructorFunction: null, // This type does not need a destructor
			});
		};

		var integerReadValueFromPointer = (name, width, signed) => {
			// integers are quite common, so generate very specialized functions
			switch (width) {
				case 1:
					return signed
						? (pointer) => HEAP8[pointer]
						: (pointer) => HEAPU8[pointer];
				case 2:
					return signed
						? (pointer) => HEAP16[pointer >> 1]
						: (pointer) => HEAPU16[pointer >> 1];
				case 4:
					return signed
						? (pointer) => HEAP32[pointer >> 2]
						: (pointer) => HEAPU32[pointer >> 2];
				default:
					throw new TypeError(`invalid integer width (${width}): ${name}`);
			}
		};

		/** @suppress {globalThis} */
		var __embind_register_integer = (
			primitiveType,
			name,
			size,
			minRange,
			maxRange,
		) => {
			name = readLatin1String(name);
			// LLVM doesn't have signed and unsigned 32-bit types, so u32 literals come
			// out as 'i32 -1'. Always treat those as max u32.
			if (maxRange === -1) {
				maxRange = 4294967295;
			}

			var fromWireType = (value) => value;

			if (minRange === 0) {
				var bitshift = 32 - 8 * size;
				fromWireType = (value) => (value << bitshift) >>> bitshift;
			}

			var isUnsignedType = name.includes("unsigned");
			var checkAssertions = (value, toTypeName) => {
				if (typeof value != "number" && typeof value != "boolean") {
					throw new TypeError(
						`Cannot convert "${embindRepr(value)}" to ${toTypeName}`,
					);
				}
				if (value < minRange || value > maxRange) {
					throw new TypeError(
						`Passing a number "${embindRepr(
							value,
						)}" from JS side to C/C++ side to an argument of type "${name}", which is outside the valid range [${minRange}, ${maxRange}]!`,
					);
				}
			};
			var toWireType;
			if (isUnsignedType) {
				toWireType = function (destructors, value) {
					checkAssertions(value, this.name);
					return value >>> 0;
				};
			} else {
				toWireType = function (destructors, value) {
					checkAssertions(value, this.name);
					// The VM will perform JS to Wasm value conversion, according to the spec:
					// https://www.w3.org/TR/wasm-js-api-1/#towebassemblyvalue
					return value;
				};
			}
			registerType(primitiveType, {
				name,
				fromWireType: fromWireType,
				toWireType: toWireType,
				argPackAdvance: GenericWireTypeSize,
				readValueFromPointer: integerReadValueFromPointer(
					name,
					size,
					minRange !== 0,
				),
				destructorFunction: null, // This type does not need a destructor
			});
		};

		var __embind_register_memory_view = (rawType, dataTypeIndex, name) => {
			var typeMapping = [
				Int8Array,
				Uint8Array,
				Int16Array,
				Uint16Array,
				Int32Array,
				Uint32Array,
				Float32Array,
				Float64Array,
			];

			var TA = typeMapping[dataTypeIndex];

			function decodeMemoryView(handle) {
				var size = HEAPU32[handle >> 2];
				var data = HEAPU32[(handle + 4) >> 2];
				return new TA(HEAP8.buffer, data, size);
			}

			name = readLatin1String(name);
			registerType(
				rawType,
				{
					name,
					fromWireType: decodeMemoryView,
					argPackAdvance: GenericWireTypeSize,
					readValueFromPointer: decodeMemoryView,
				},
				{
					ignoreDuplicateRegistrations: true,
				},
			);
		};

		var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
			assert(
				typeof str === "string",
				`stringToUTF8Array expects a string (got ${typeof str})`,
			);
			// Parameter maxBytesToWrite is not optional. Negative values, 0, null,
			// undefined and false each don't write out any bytes.
			if (!(maxBytesToWrite > 0)) return 0;

			var startIdx = outIdx;
			var endIdx = outIdx + maxBytesToWrite - 1; // -1 for string null terminator.
			for (var i = 0; i < str.length; ++i) {
				// Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code
				// unit, not a Unicode code point of the character! So decode
				// UTF16->UTF32->UTF8.
				// See http://unicode.org/faq/utf_bom.html#utf16-3
				// For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description
				// and https://www.ietf.org/rfc/rfc2279.txt
				// and https://tools.ietf.org/html/rfc3629
				var u = str.charCodeAt(i); // possibly a lead surrogate
				if (u >= 0xd800 && u <= 0xdfff) {
					var u1 = str.charCodeAt(++i);
					u = (0x10000 + ((u & 0x3ff) << 10)) | (u1 & 0x3ff);
				}
				if (u <= 0x7f) {
					if (outIdx >= endIdx) break;
					heap[outIdx++] = u;
				} else if (u <= 0x7ff) {
					if (outIdx + 1 >= endIdx) break;
					heap[outIdx++] = 0xc0 | (u >> 6);
					heap[outIdx++] = 0x80 | (u & 63);
				} else if (u <= 0xffff) {
					if (outIdx + 2 >= endIdx) break;
					heap[outIdx++] = 0xe0 | (u >> 12);
					heap[outIdx++] = 0x80 | ((u >> 6) & 63);
					heap[outIdx++] = 0x80 | (u & 63);
				} else {
					if (outIdx + 3 >= endIdx) break;
					if (u > 0x10ffff)
						warnOnce(
							"Invalid Unicode code point " +
								ptrToString(u) +
								" encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).",
						);
					heap[outIdx++] = 0xf0 | (u >> 18);
					heap[outIdx++] = 0x80 | ((u >> 12) & 63);
					heap[outIdx++] = 0x80 | ((u >> 6) & 63);
					heap[outIdx++] = 0x80 | (u & 63);
				}
			}
			// Null-terminate the pointer to the buffer.
			heap[outIdx] = 0;
			return outIdx - startIdx;
		};
		var stringToUTF8 = (str, outPtr, maxBytesToWrite) => {
			assert(
				typeof maxBytesToWrite == "number",
				"stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!",
			);
			return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
		};

		var lengthBytesUTF8 = (str) => {
			var len = 0;
			for (var i = 0; i < str.length; ++i) {
				// Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code
				// unit, not a Unicode code point of the character! So decode
				// UTF16->UTF32->UTF8.
				// See http://unicode.org/faq/utf_bom.html#utf16-3
				var c = str.charCodeAt(i); // possibly a lead surrogate
				if (c <= 0x7f) {
					len++;
				} else if (c <= 0x7ff) {
					len += 2;
				} else if (c >= 0xd800 && c <= 0xdfff) {
					len += 4;
					++i;
				} else {
					len += 3;
				}
			}
			return len;
		};

		var __embind_register_std_string = (rawType, name) => {
			name = readLatin1String(name);
			var stdStringIsUTF8 =
				//process only std::string bindings with UTF8 support, in contrast to e.g. std::basic_string<unsigned char>
				name === "std::string";

			registerType(rawType, {
				name,
				// For some method names we use string keys here since they are part of
				// the public/external API and/or used by the runtime-generated code.
				fromWireType(value) {
					var length = HEAPU32[value >> 2];
					var payload = value + 4;

					var str;
					if (stdStringIsUTF8) {
						var decodeStartPtr = payload;
						// Looping here to support possible embedded '0' bytes
						for (var i = 0; i <= length; ++i) {
							var currentBytePtr = payload + i;
							if (i == length || HEAPU8[currentBytePtr] == 0) {
								var maxRead = currentBytePtr - decodeStartPtr;
								var stringSegment = UTF8ToString(decodeStartPtr, maxRead);
								if (str === undefined) {
									str = stringSegment;
								} else {
									str += String.fromCharCode(0);
									str += stringSegment;
								}
								decodeStartPtr = currentBytePtr + 1;
							}
						}
					} else {
						var a = new Array(length);
						for (var i = 0; i < length; ++i) {
							a[i] = String.fromCharCode(HEAPU8[payload + i]);
						}
						str = a.join("");
					}

					_free(value);

					return str;
				},
				toWireType(destructors, value) {
					if (value instanceof ArrayBuffer) {
						value = new Uint8Array(value);
					}

					var length;
					var valueIsOfTypeString = typeof value == "string";

					if (
						!(
							valueIsOfTypeString ||
							value instanceof Uint8Array ||
							value instanceof Uint8ClampedArray ||
							value instanceof Int8Array
						)
					) {
						throwBindingError("Cannot pass non-string to std::string");
					}
					if (stdStringIsUTF8 && valueIsOfTypeString) {
						length = lengthBytesUTF8(value);
					} else {
						length = value.length;
					}

					// assumes POINTER_SIZE alignment
					var base = _malloc(4 + length + 1);
					var ptr = base + 4;
					HEAPU32[base >> 2] = length;
					if (stdStringIsUTF8 && valueIsOfTypeString) {
						stringToUTF8(value, ptr, length + 1);
					} else {
						if (valueIsOfTypeString) {
							for (var i = 0; i < length; ++i) {
								var charCode = value.charCodeAt(i);
								if (charCode > 255) {
									_free(ptr);
									throwBindingError(
										"String has UTF-16 code units that do not fit in 8 bits",
									);
								}
								HEAPU8[ptr + i] = charCode;
							}
						} else {
							for (var i = 0; i < length; ++i) {
								HEAPU8[ptr + i] = value[i];
							}
						}
					}

					if (destructors !== null) {
						destructors.push(_free, base);
					}
					return base;
				},
				argPackAdvance: GenericWireTypeSize,
				readValueFromPointer: readPointer,
				destructorFunction(ptr) {
					_free(ptr);
				},
			});
		};

		var UTF16Decoder =
			typeof TextDecoder != "undefined"
				? new TextDecoder("utf-16le")
				: undefined;
		var UTF16ToString = (ptr, maxBytesToRead) => {
			assert(
				ptr % 2 == 0,
				"Pointer passed to UTF16ToString must be aligned to two bytes!",
			);
			var endPtr = ptr;
			// TextDecoder needs to know the byte length in advance, it doesn't stop on
			// null terminator by itself.
			// Also, use the length info to avoid running tiny strings through
			// TextDecoder, since .subarray() allocates garbage.
			var idx = endPtr >> 1;
			var maxIdx = idx + maxBytesToRead / 2;
			// If maxBytesToRead is not passed explicitly, it will be undefined, and this
			// will always evaluate to true. This saves on code size.
			while (!(idx >= maxIdx) && HEAPU16[idx]) ++idx;
			endPtr = idx << 1;

			if (endPtr - ptr > 32 && UTF16Decoder)
				return UTF16Decoder.decode(HEAPU8.subarray(ptr, endPtr));

			// Fallback: decode without UTF16Decoder
			var str = "";

			// If maxBytesToRead is not passed explicitly, it will be undefined, and the
			// for-loop's condition will always evaluate to true. The loop is then
			// terminated on the first null char.
			for (var i = 0; !(i >= maxBytesToRead / 2); ++i) {
				var codeUnit = HEAP16[(ptr + i * 2) >> 1];
				if (codeUnit == 0) break;
				// fromCharCode constructs a character from a UTF-16 code unit, so we can
				// pass the UTF16 string right through.
				str += String.fromCharCode(codeUnit);
			}

			return str;
		};

		var stringToUTF16 = (str, outPtr, maxBytesToWrite) => {
			assert(
				outPtr % 2 == 0,
				"Pointer passed to stringToUTF16 must be aligned to two bytes!",
			);
			assert(
				typeof maxBytesToWrite == "number",
				"stringToUTF16(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!",
			);
			// Backwards compatibility: if max bytes is not specified, assume unsafe unbounded write is allowed.
			maxBytesToWrite ??= 0x7fffffff;
			if (maxBytesToWrite < 2) return 0;
			maxBytesToWrite -= 2; // Null terminator.
			var startPtr = outPtr;
			var numCharsToWrite =
				maxBytesToWrite < str.length * 2 ? maxBytesToWrite / 2 : str.length;
			for (var i = 0; i < numCharsToWrite; ++i) {
				// charCodeAt returns a UTF-16 encoded code unit, so it can be directly written to the HEAP.
				var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
				HEAP16[outPtr >> 1] = codeUnit;
				outPtr += 2;
			}
			// Null-terminate the pointer to the HEAP.
			HEAP16[outPtr >> 1] = 0;
			return outPtr - startPtr;
		};

		var lengthBytesUTF16 = (str) => {
			return str.length * 2;
		};

		var UTF32ToString = (ptr, maxBytesToRead) => {
			assert(
				ptr % 4 == 0,
				"Pointer passed to UTF32ToString must be aligned to four bytes!",
			);
			var i = 0;

			var str = "";
			// If maxBytesToRead is not passed explicitly, it will be undefined, and this
			// will always evaluate to true. This saves on code size.
			while (!(i >= maxBytesToRead / 4)) {
				var utf32 = HEAP32[(ptr + i * 4) >> 2];
				if (utf32 == 0) break;
				++i;
				// Gotcha: fromCharCode constructs a character from a UTF-16 encoded code (pair), not from a Unicode code point! So encode the code point to UTF-16 for constructing.
				// See http://unicode.org/faq/utf_bom.html#utf16-3
				if (utf32 >= 0x10000) {
					var ch = utf32 - 0x10000;
					str += String.fromCharCode(
						0xd800 | (ch >> 10),
						0xdc00 | (ch & 0x3ff),
					);
				} else {
					str += String.fromCharCode(utf32);
				}
			}
			return str;
		};

		var stringToUTF32 = (str, outPtr, maxBytesToWrite) => {
			assert(
				outPtr % 4 == 0,
				"Pointer passed to stringToUTF32 must be aligned to four bytes!",
			);
			assert(
				typeof maxBytesToWrite == "number",
				"stringToUTF32(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!",
			);
			// Backwards compatibility: if max bytes is not specified, assume unsafe unbounded write is allowed.
			maxBytesToWrite ??= 0x7fffffff;
			if (maxBytesToWrite < 4) return 0;
			var startPtr = outPtr;
			var endPtr = startPtr + maxBytesToWrite - 4;
			for (var i = 0; i < str.length; ++i) {
				// Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
				// See http://unicode.org/faq/utf_bom.html#utf16-3
				var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
				if (codeUnit >= 0xd800 && codeUnit <= 0xdfff) {
					var trailSurrogate = str.charCodeAt(++i);
					codeUnit =
						(0x10000 + ((codeUnit & 0x3ff) << 10)) | (trailSurrogate & 0x3ff);
				}
				HEAP32[outPtr >> 2] = codeUnit;
				outPtr += 4;
				if (outPtr + 4 > endPtr) break;
			}
			// Null-terminate the pointer to the HEAP.
			HEAP32[outPtr >> 2] = 0;
			return outPtr - startPtr;
		};

		var lengthBytesUTF32 = (str) => {
			var len = 0;
			for (var i = 0; i < str.length; ++i) {
				// Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
				// See http://unicode.org/faq/utf_bom.html#utf16-3
				var codeUnit = str.charCodeAt(i);
				if (codeUnit >= 0xd800 && codeUnit <= 0xdfff) ++i; // possibly a lead surrogate, so skip over the tail surrogate.
				len += 4;
			}

			return len;
		};
		var __embind_register_std_wstring = (rawType, charSize, name) => {
			name = readLatin1String(name);
			var decodeString, encodeString, readCharAt, lengthBytesUTF;
			if (charSize === 2) {
				decodeString = UTF16ToString;
				encodeString = stringToUTF16;
				lengthBytesUTF = lengthBytesUTF16;
				readCharAt = (pointer) => HEAPU16[pointer >> 1];
			} else if (charSize === 4) {
				decodeString = UTF32ToString;
				encodeString = stringToUTF32;
				lengthBytesUTF = lengthBytesUTF32;
				readCharAt = (pointer) => HEAPU32[pointer >> 2];
			}
			registerType(rawType, {
				name,
				fromWireType: (value) => {
					// Code mostly taken from _embind_register_std_string fromWireType
					var length = HEAPU32[value >> 2];
					var str;

					var decodeStartPtr = value + 4;
					// Looping here to support possible embedded '0' bytes
					for (var i = 0; i <= length; ++i) {
						var currentBytePtr = value + 4 + i * charSize;
						if (i == length || readCharAt(currentBytePtr) == 0) {
							var maxReadBytes = currentBytePtr - decodeStartPtr;
							var stringSegment = decodeString(decodeStartPtr, maxReadBytes);
							if (str === undefined) {
								str = stringSegment;
							} else {
								str += String.fromCharCode(0);
								str += stringSegment;
							}
							decodeStartPtr = currentBytePtr + charSize;
						}
					}

					_free(value);

					return str;
				},
				toWireType: (destructors, value) => {
					if (!(typeof value == "string")) {
						throwBindingError(
							`Cannot pass non-string to C++ string type ${name}`,
						);
					}

					// assumes POINTER_SIZE alignment
					var length = lengthBytesUTF(value);
					var ptr = _malloc(4 + length + charSize);
					HEAPU32[ptr >> 2] = length / charSize;

					encodeString(value, ptr + 4, length + charSize);

					if (destructors !== null) {
						destructors.push(_free, ptr);
					}
					return ptr;
				},
				argPackAdvance: GenericWireTypeSize,
				readValueFromPointer: readPointer,
				destructorFunction(ptr) {
					_free(ptr);
				},
			});
		};

		var __embind_register_void = (rawType, name) => {
			name = readLatin1String(name);
			registerType(rawType, {
				isVoid: true, // void return values can be optimized out sometimes
				name,
				argPackAdvance: 0,
				fromWireType: () => undefined,
				// TODO: assert if anything else is given?
				toWireType: (destructors, o) => undefined,
			});
		};

		var __emscripten_memcpy_js = (dest, src, num) =>
			HEAPU8.copyWithin(dest, src, src + num);

		var getHeapMax = () => HEAPU8.length;

		var abortOnCannotGrowMemory = (requestedSize) => {
			abort(
				`Cannot enlarge memory arrays to size ${requestedSize} bytes (OOM). Either (1) compile with -sINITIAL_MEMORY=X with X higher than the current value ${HEAP8.length}, (2) compile with -sALLOW_MEMORY_GROWTH which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with -sABORTING_MALLOC=0`,
			);
		};
		var _emscripten_resize_heap = (requestedSize) => {
			var oldSize = HEAPU8.length;
			// With CAN_ADDRESS_2GB or MEMORY64, pointers are already unsigned.
			requestedSize >>>= 0;
			abortOnCannotGrowMemory(requestedSize);
		};

		var SYSCALLS = {
			varargs: undefined,
			getStr(ptr) {
				var ret = UTF8ToString(ptr);
				return ret;
			},
		};
		var _fd_close = (fd) => {
			abort("fd_close called without SYSCALLS_REQUIRE_FILESYSTEM");
		};

		var convertI32PairToI53Checked = (lo, hi) => {
			assert(lo == lo >>> 0 || lo == (lo | 0)); // lo should either be a i32 or a u32
			assert(hi === (hi | 0)); // hi should be a i32
			return (hi + 0x200000) >>> 0 < 0x400001 - !!lo
				? (lo >>> 0) + hi * 4294967296
				: NaN;
		};
		function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
			var offset = convertI32PairToI53Checked(offset_low, offset_high);

			return 70;
		}

		var printCharBuffers = [null, [], []];

		var printChar = (stream, curr) => {
			var buffer = printCharBuffers[stream];
			assert(buffer);
			if (curr === 0 || curr === 10) {
				(stream === 1 ? out : err)(UTF8ArrayToString(buffer, 0));
				buffer.length = 0;
			} else {
				buffer.push(curr);
			}
		};

		var flush_NO_FILESYSTEM = () => {
			// flush anything remaining in the buffers during shutdown
			_fflush(0);
			if (printCharBuffers[1].length) printChar(1, 10);
			if (printCharBuffers[2].length) printChar(2, 10);
		};

		var _fd_write = (fd, iov, iovcnt, pnum) => {
			// hack to support printf in SYSCALLS_REQUIRE_FILESYSTEM=0
			var num = 0;
			for (var i = 0; i < iovcnt; i++) {
				var ptr = HEAPU32[iov >> 2];
				var len = HEAPU32[(iov + 4) >> 2];
				iov += 8;
				for (var j = 0; j < len; j++) {
					printChar(fd, HEAPU8[ptr + j]);
				}
				num += len;
			}
			HEAPU32[pnum >> 2] = num;
			return 0;
		};

		var runtimeKeepaliveCounter = 0;
		var keepRuntimeAlive = () => noExitRuntime || runtimeKeepaliveCounter > 0;
		var _proc_exit = (code) => {
			EXITSTATUS = code;
			if (!keepRuntimeAlive()) {
				Module["onExit"]?.(code);
				ABORT = true;
			}
			quit_(code, new ExitStatus(code));
		};

		/** @param {boolean|number=} implicit */
		var exitJS = (status, implicit) => {
			EXITSTATUS = status;

			checkUnflushedContent();

			// if exit() was called explicitly, warn the user if the runtime isn't actually being shut down
			if (keepRuntimeAlive() && !implicit) {
				var msg = `program exited (with status: ${status}), but keepRuntimeAlive() is set (counter=${runtimeKeepaliveCounter}) due to an async operation, so halting execution but not exiting the runtime or preventing further async execution (you can use emscripten_force_exit, if you want to force a true shutdown)`;
				readyPromiseReject(msg);
				err(msg);
			}

			_proc_exit(status);
		};

		var handleException = (e) => {
			// Certain exception types we do not treat as errors since they are used for
			// internal control flow.
			// 1. ExitStatus, which is thrown by exit()
			// 2. "unwind", which is thrown by emscripten_unwind_to_js_event_loop() and others
			//    that wish to return to JS event loop.
			if (e instanceof ExitStatus || e == "unwind") {
				return EXITSTATUS;
			}
			checkStackCookie();
			if (e instanceof WebAssembly.RuntimeError) {
				if (_emscripten_stack_get_current() <= 0) {
					err(
						"Stack overflow detected.  You can try increasing -sSTACK_SIZE (currently set to 65536)",
					);
				}
			}
			quit_(1, e);
		};
		embind_init_charCodes();
		BindingError = Module["BindingError"] = class BindingError extends Error {
			constructor(message) {
				super(message);
				this.name = "BindingError";
			}
		};
		InternalError = Module["InternalError"] = class InternalError extends (
			Error
		) {
			constructor(message) {
				super(message);
				this.name = "InternalError";
			}
		};
		init_emval();
		function checkIncomingModuleAPI() {
			ignoredModuleProp("fetchSettings");
		}
		var wasmImports = {
			/** @export */
			__assert_fail: ___assert_fail,
			/** @export */
			_embind_register_bigint: __embind_register_bigint,
			/** @export */
			_embind_register_bool: __embind_register_bool,
			/** @export */
			_embind_register_emval: __embind_register_emval,
			/** @export */
			_embind_register_float: __embind_register_float,
			/** @export */
			_embind_register_integer: __embind_register_integer,
			/** @export */
			_embind_register_memory_view: __embind_register_memory_view,
			/** @export */
			_embind_register_std_string: __embind_register_std_string,
			/** @export */
			_embind_register_std_wstring: __embind_register_std_wstring,
			/** @export */
			_embind_register_void: __embind_register_void,
			/** @export */
			_emscripten_memcpy_js: __emscripten_memcpy_js,
			/** @export */
			emscripten_resize_heap: _emscripten_resize_heap,
			/** @export */
			fd_close: _fd_close,
			/** @export */
			fd_seek: _fd_seek,
			/** @export */
			fd_write: _fd_write,
		};
		var wasmExports = createWasm();
		var ___wasm_call_ctors = createExportWrapper("__wasm_call_ctors", 0);
		var _main = (Module["_main"] = createExportWrapper("main", 2));
		var ___getTypeName = createExportWrapper("__getTypeName", 1);
		var _fflush = createExportWrapper("fflush", 1);
		var _malloc = createExportWrapper("malloc", 1);
		var _free = createExportWrapper("free", 1);
		var _emscripten_stack_init = () =>
			(_emscripten_stack_init = wasmExports["emscripten_stack_init"])();
		var _emscripten_stack_get_free = () =>
			(_emscripten_stack_get_free = wasmExports["emscripten_stack_get_free"])();
		var _emscripten_stack_get_base = () =>
			(_emscripten_stack_get_base = wasmExports["emscripten_stack_get_base"])();
		var _emscripten_stack_get_end = () =>
			(_emscripten_stack_get_end = wasmExports["emscripten_stack_get_end"])();
		var __emscripten_stack_restore = (a0) =>
			(__emscripten_stack_restore = wasmExports["_emscripten_stack_restore"])(
				a0,
			);
		var __emscripten_stack_alloc = (a0) =>
			(__emscripten_stack_alloc = wasmExports["_emscripten_stack_alloc"])(a0);
		var _emscripten_stack_get_current = () =>
			(_emscripten_stack_get_current =
				wasmExports["emscripten_stack_get_current"])();
		var ___cxa_is_pointer_type = createExportWrapper(
			"__cxa_is_pointer_type",
			1,
		);
		var dynCall_jiji = (Module["dynCall_jiji"] = createExportWrapper(
			"dynCall_jiji",
			5,
		));

		// include: postamble.js
		// === Auto-generated postamble setup entry stuff ===

		var missingLibrarySymbols = [
			"writeI53ToI64",
			"writeI53ToI64Clamped",
			"writeI53ToI64Signaling",
			"writeI53ToU64Clamped",
			"writeI53ToU64Signaling",
			"readI53FromI64",
			"readI53FromU64",
			"convertI32PairToI53",
			"convertU32PairToI53",
			"stackAlloc",
			"getTempRet0",
			"setTempRet0",
			"zeroMemory",
			"growMemory",
			"isLeapYear",
			"ydayFromDate",
			"arraySum",
			"addDays",
			"inetPton4",
			"inetNtop4",
			"inetPton6",
			"inetNtop6",
			"readSockaddr",
			"writeSockaddr",
			"initRandomFill",
			"randomFill",
			"emscriptenLog",
			"readEmAsmArgs",
			"jstoi_q",
			"getExecutableName",
			"listenOnce",
			"autoResumeAudioContext",
			"dynCallLegacy",
			"getDynCaller",
			"dynCall",
			"runtimeKeepalivePush",
			"runtimeKeepalivePop",
			"callUserCallback",
			"maybeExit",
			"asmjsMangle",
			"asyncLoad",
			"alignMemory",
			"mmapAlloc",
			"HandleAllocator",
			"getNativeTypeSize",
			"STACK_SIZE",
			"STACK_ALIGN",
			"POINTER_SIZE",
			"ASSERTIONS",
			"getCFunc",
			"ccall",
			"cwrap",
			"uleb128Encode",
			"sigToWasmTypes",
			"generateFuncType",
			"convertJsFunctionToWasm",
			"getEmptyTableSlot",
			"updateTableMap",
			"getFunctionAddress",
			"addFunction",
			"removeFunction",
			"reallyNegative",
			"unSign",
			"strLen",
			"reSign",
			"formatString",
			"intArrayFromString",
			"intArrayToString",
			"AsciiToString",
			"stringToAscii",
			"stringToNewUTF8",
			"stringToUTF8OnStack",
			"writeArrayToMemory",
			"registerKeyEventCallback",
			"maybeCStringToJsString",
			"findEventTarget",
			"getBoundingClientRect",
			"fillMouseEventData",
			"registerMouseEventCallback",
			"registerWheelEventCallback",
			"registerUiEventCallback",
			"registerFocusEventCallback",
			"fillDeviceOrientationEventData",
			"registerDeviceOrientationEventCallback",
			"fillDeviceMotionEventData",
			"registerDeviceMotionEventCallback",
			"screenOrientation",
			"fillOrientationChangeEventData",
			"registerOrientationChangeEventCallback",
			"fillFullscreenChangeEventData",
			"registerFullscreenChangeEventCallback",
			"JSEvents_requestFullscreen",
			"JSEvents_resizeCanvasForFullscreen",
			"registerRestoreOldStyle",
			"hideEverythingExceptGivenElement",
			"restoreHiddenElements",
			"setLetterbox",
			"softFullscreenResizeWebGLRenderTarget",
			"doRequestFullscreen",
			"fillPointerlockChangeEventData",
			"registerPointerlockChangeEventCallback",
			"registerPointerlockErrorEventCallback",
			"requestPointerLock",
			"fillVisibilityChangeEventData",
			"registerVisibilityChangeEventCallback",
			"registerTouchEventCallback",
			"fillGamepadEventData",
			"registerGamepadEventCallback",
			"registerBeforeUnloadEventCallback",
			"fillBatteryEventData",
			"battery",
			"registerBatteryEventCallback",
			"setCanvasElementSize",
			"getCanvasElementSize",
			"jsStackTrace",
			"getCallstack",
			"convertPCtoSourceLocation",
			"getEnvStrings",
			"checkWasiClock",
			"wasiRightsToMuslOFlags",
			"wasiOFlagsToMuslOFlags",
			"createDyncallWrapper",
			"safeSetTimeout",
			"setImmediateWrapped",
			"clearImmediateWrapped",
			"polyfillSetImmediate",
			"getPromise",
			"makePromise",
			"idsToPromises",
			"makePromiseCallback",
			"ExceptionInfo",
			"findMatchingCatch",
			"Browser_asyncPrepareDataCounter",
			"setMainLoop",
			"getSocketFromFD",
			"getSocketAddress",
			"FS_createPreloadedFile",
			"FS_modeStringToFlags",
			"FS_getMode",
			"FS_stdin_getChar",
			"FS_createDataFile",
			"FS_unlink",
			"FS_mkdirTree",
			"_setNetworkCallback",
			"heapObjectForWebGLType",
			"toTypedArrayIndex",
			"webgl_enable_ANGLE_instanced_arrays",
			"webgl_enable_OES_vertex_array_object",
			"webgl_enable_WEBGL_draw_buffers",
			"webgl_enable_WEBGL_multi_draw",
			"emscriptenWebGLGet",
			"computeUnpackAlignedImageSize",
			"colorChannelsInGlTextureFormat",
			"emscriptenWebGLGetTexPixelData",
			"emscriptenWebGLGetUniform",
			"webglGetUniformLocation",
			"webglPrepareUniformLocationsBeforeFirstUse",
			"webglGetLeftBracePos",
			"emscriptenWebGLGetVertexAttrib",
			"__glGetActiveAttribOrUniform",
			"writeGLArray",
			"registerWebGlEventCallback",
			"runAndAbortIfError",
			"ALLOC_NORMAL",
			"ALLOC_STACK",
			"allocate",
			"writeStringToMemory",
			"writeAsciiToMemory",
			"setErrNo",
			"demangle",
			"stackTrace",
			"getTypeName",
			"getFunctionName",
			"getFunctionArgsName",
			"heap32VectorToArray",
			"requireRegisteredType",
			"usesDestructorStack",
			"createJsInvokerSignature",
			"createJsInvoker",
			"init_embind",
			"throwUnboundTypeError",
			"ensureOverloadTable",
			"exposePublicSymbol",
			"replacePublicSymbol",
			"extendError",
			"createNamedFunction",
			"getBasestPointer",
			"registerInheritedInstance",
			"unregisterInheritedInstance",
			"getInheritedInstance",
			"getInheritedInstanceCount",
			"getLiveInheritedInstances",
			"enumReadValueFromPointer",
			"runDestructors",
			"newFunc",
			"craftInvokerFunction",
			"embind__requireFunction",
			"genericPointerToWireType",
			"constNoSmartPtrRawPointerToWireType",
			"nonConstNoSmartPtrRawPointerToWireType",
			"init_RegisteredPointer",
			"RegisteredPointer",
			"RegisteredPointer_fromWireType",
			"runDestructor",
			"releaseClassHandle",
			"detachFinalizer",
			"attachFinalizer",
			"makeClassHandle",
			"init_ClassHandle",
			"ClassHandle",
			"throwInstanceAlreadyDeleted",
			"flushPendingDeletes",
			"setDelayFunction",
			"RegisteredClass",
			"shallowCopyInternalPointer",
			"downcastPointer",
			"upcastPointer",
			"validateThis",
			"char_0",
			"char_9",
			"makeLegalFunctionName",
			"getStringOrSymbol",
			"emval_get_global",
			"emval_returnValue",
			"emval_lookupTypes",
			"emval_addMethodCaller",
		];
		missingLibrarySymbols.forEach(missingLibrarySymbol);

		var unexportedSymbols = [
			"run",
			"addOnPreRun",
			"addOnInit",
			"addOnPreMain",
			"addOnExit",
			"addOnPostRun",
			"addRunDependency",
			"removeRunDependency",
			"FS_createFolder",
			"FS_createPath",
			"FS_createLazyFile",
			"FS_createLink",
			"FS_createDevice",
			"FS_readFile",
			"out",
			"err",
			"callMain",
			"abort",
			"wasmMemory",
			"wasmExports",
			"writeStackCookie",
			"checkStackCookie",
			"convertI32PairToI53Checked",
			"stackSave",
			"stackRestore",
			"ptrToString",
			"exitJS",
			"getHeapMax",
			"abortOnCannotGrowMemory",
			"ENV",
			"MONTH_DAYS_REGULAR",
			"MONTH_DAYS_LEAP",
			"MONTH_DAYS_REGULAR_CUMULATIVE",
			"MONTH_DAYS_LEAP_CUMULATIVE",
			"ERRNO_CODES",
			"ERRNO_MESSAGES",
			"DNS",
			"Protocols",
			"Sockets",
			"timers",
			"warnOnce",
			"readEmAsmArgsArray",
			"jstoi_s",
			"handleException",
			"keepRuntimeAlive",
			"wasmTable",
			"noExitRuntime",
			"freeTableIndexes",
			"functionsInTableMap",
			"setValue",
			"getValue",
			"PATH",
			"PATH_FS",
			"UTF8Decoder",
			"UTF8ArrayToString",
			"UTF8ToString",
			"stringToUTF8Array",
			"stringToUTF8",
			"lengthBytesUTF8",
			"UTF16Decoder",
			"UTF16ToString",
			"stringToUTF16",
			"lengthBytesUTF16",
			"UTF32ToString",
			"stringToUTF32",
			"lengthBytesUTF32",
			"JSEvents",
			"specialHTMLTargets",
			"findCanvasEventTarget",
			"currentFullscreenStrategy",
			"restoreOldWindowedStyle",
			"UNWIND_CACHE",
			"ExitStatus",
			"flush_NO_FILESYSTEM",
			"promiseMap",
			"uncaughtExceptionCount",
			"exceptionLast",
			"exceptionCaught",
			"Browser",
			"getPreloadedImageData__data",
			"wget",
			"SYSCALLS",
			"preloadPlugins",
			"FS_stdin_getChar_buffer",
			"FS",
			"MEMFS",
			"TTY",
			"PIPEFS",
			"SOCKFS",
			"tempFixedLengthArray",
			"miniTempWebGLFloatBuffers",
			"miniTempWebGLIntBuffers",
			"GL",
			"AL",
			"GLUT",
			"EGL",
			"GLEW",
			"IDBStore",
			"SDL",
			"SDL_gfx",
			"allocateUTF8",
			"allocateUTF8OnStack",
			"InternalError",
			"BindingError",
			"throwInternalError",
			"throwBindingError",
			"registeredTypes",
			"awaitingDependencies",
			"typeDependencies",
			"tupleRegistrations",
			"structRegistrations",
			"sharedRegisterType",
			"whenDependentTypesAreResolved",
			"embind_charCodes",
			"embind_init_charCodes",
			"readLatin1String",
			"UnboundTypeError",
			"PureVirtualError",
			"GenericWireTypeSize",
			"EmValType",
			"embindRepr",
			"registeredInstances",
			"registeredPointers",
			"registerType",
			"integerReadValueFromPointer",
			"floatReadValueFromPointer",
			"readPointer",
			"finalizationRegistry",
			"detachFinalizer_deps",
			"deletionQueue",
			"delayFunction",
			"emval_freelist",
			"emval_handles",
			"emval_symbols",
			"init_emval",
			"count_emval_handles",
			"Emval",
			"emval_methodCallers",
			"reflectConstruct",
		];
		unexportedSymbols.forEach(unexportedRuntimeSymbol);

		var calledRun;

		dependenciesFulfilled = function runCaller() {
			// If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
			if (!calledRun) run();
			if (!calledRun) dependenciesFulfilled = runCaller; // try this again later, after new deps are fulfilled
		};

		function callMain() {
			assert(
				runDependencies == 0,
				'cannot call main when async dependencies remain! (listen on Module["onRuntimeInitialized"])',
			);
			assert(
				__ATPRERUN__.length == 0,
				"cannot call main when preRun functions remain to be called",
			);

			var entryFunction = _main;

			var argc = 0;
			var argv = 0;

			try {
				var ret = entryFunction(argc, argv);

				// if we're not running an evented main loop, it's time to exit
				exitJS(ret, /* implicit = */ true);
				return ret;
			} catch (e) {
				return handleException(e);
			}
		}

		function stackCheckInit() {
			// This is normally called automatically during __wasm_call_ctors but need to
			// get these values before even running any of the ctors so we call it redundantly
			// here.
			_emscripten_stack_init();
			// TODO(sbc): Move writeStackCookie to native to to avoid this.
			writeStackCookie();
		}

		function run() {
			if (runDependencies > 0) {
				return;
			}

			stackCheckInit();

			preRun();

			// a preRun added a dependency, run will be called later
			if (runDependencies > 0) {
				return;
			}

			function doRun() {
				// run may have just been called through dependencies being fulfilled just in this very frame,
				// or while the async setStatus time below was happening
				if (calledRun) return;
				calledRun = true;
				Module["calledRun"] = true;

				if (ABORT) return;

				initRuntime();

				preMain();

				readyPromiseResolve(Module);
				if (Module["onRuntimeInitialized"]) Module["onRuntimeInitialized"]();

				if (shouldRunNow) callMain();

				postRun();
			}

			if (Module["setStatus"]) {
				Module["setStatus"]("Running...");
				setTimeout(function () {
					setTimeout(function () {
						Module["setStatus"]("");
					}, 1);
					doRun();
				}, 1);
			} else {
				doRun();
			}
			checkStackCookie();
		}

		function checkUnflushedContent() {
			// Compiler settings do not allow exiting the runtime, so flushing
			// the streams is not possible. but in ASSERTIONS mode we check
			// if there was something to flush, and if so tell the user they
			// should request that the runtime be exitable.
			// Normally we would not even include flush() at all, but in ASSERTIONS
			// builds we do so just for this check, and here we see if there is any
			// content to flush, that is, we check if there would have been
			// something a non-ASSERTIONS build would have not seen.
			// How we flush the streams depends on whether we are in SYSCALLS_REQUIRE_FILESYSTEM=0
			// mode (which has its own special function for this; otherwise, all
			// the code is inside libc)
			var oldOut = out;
			var oldErr = err;
			var has = false;
			out = err = (x) => {
				has = true;
			};
			try {
				// it doesn't matter if it fails
				flush_NO_FILESYSTEM();
			} catch (e) {}
			out = oldOut;
			err = oldErr;
			if (has) {
				warnOnce(
					"stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the Emscripten FAQ), or make sure to emit a newline when you printf etc.",
				);
				warnOnce(
					"(this may also be due to not including full filesystem support - try building with -sFORCE_FILESYSTEM)",
				);
			}
		}

		if (Module["preInit"]) {
			if (typeof Module["preInit"] == "function")
				Module["preInit"] = [Module["preInit"]];
			while (Module["preInit"].length > 0) {
				Module["preInit"].pop()();
			}
		}

		// shouldRunNow refers to calling main(), not run().
		var shouldRunNow = true;

		if (Module["noInitialRun"]) shouldRunNow = false;

		run();

		// end include: postamble.js

		// include: postamble_modularize.js
		// In MODULARIZE mode we wrap the generated code in a factory function
		// and return either the Module itself, or a promise of the module.
		//
		// We assign to the `moduleRtn` global here and configure closure to see
		// this as and extern so it won't get minified.

		moduleRtn = readyPromise;

		// Assertion for attempting to access module properties on the incoming
		// moduleArg.  In the past we used this object as the prototype of the module
		// and assigned properties to it, but now we return a distinct object.  This
		// keeps the instance private until it is ready (i.e the promise has been
		// resolved).
		for (const prop of Object.keys(Module)) {
			if (!(prop in moduleArg)) {
				Object.defineProperty(moduleArg, prop, {
					configurable: true,
					get() {
						abort(
							`Access to module property ('${prop}') is no longer possible via the module constructor argument; Instead, use the result of the module constructor.`,
						);
					},
				});
			}
		}
		// end include: postamble_modularize.js

		return moduleRtn;
	};
})();
export default Module;
