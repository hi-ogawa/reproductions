/******/ var __webpack_modules__ = {
	/***/ "@rolldown/test-dep-external":
		/*!**********************************************!*\
  !*** external "@rolldown/test-dep-external" ***!
  \**********************************************/
		/***/ (module) => {
			module.exports = import("@rolldown/test-dep-external");

			/***/
		},

	/***/ "./src/dep.js":
		/*!********************!*\
  !*** ./src/dep.js ***!
  \********************/
		/***/ (
			__unused_webpack___webpack_module__,
			__webpack_exports__,
			__webpack_require__,
		) => {
			__webpack_require__.r(__webpack_exports__);
			console.log("[importing dep.js]");

			/***/
		},

	/***/ "./src/entry.js":
		/*!**********************!*\
  !*** ./src/entry.js ***!
  \**********************/
		/***/ (__webpack_module__, __webpack_exports__, __webpack_require__) => {
			__webpack_require__.a(
				__webpack_module__,
				async (
					__webpack_handle_async_dependencies__,
					__webpack_async_result__,
				) => {
					try {
						__webpack_require__.r(__webpack_exports__);
						/* harmony import */ var _dep_js__WEBPACK_IMPORTED_MODULE_0__ =
							__webpack_require__(/*! ./dep.js */ "./src/dep.js");
						/* harmony import */ var _rolldown_test_dep_external__WEBPACK_IMPORTED_MODULE_1__ =
							__webpack_require__(
								/*! @rolldown/test-dep-external */ "@rolldown/test-dep-external",
							);
						var __webpack_async_dependencies__ =
							__webpack_handle_async_dependencies__([
								_rolldown_test_dep_external__WEBPACK_IMPORTED_MODULE_1__,
							]);
						_rolldown_test_dep_external__WEBPACK_IMPORTED_MODULE_1__ = (
							__webpack_async_dependencies__.then
								? (await __webpack_async_dependencies__)()
								: __webpack_async_dependencies__
						)[0];

						__webpack_async_result__();
					} catch (e) {
						__webpack_async_result__(e);
					}
				},
			);

			/***/
		},

	/******/
};
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
	/******/ // Check if module is in cache
	/******/ var cachedModule = __webpack_module_cache__[moduleId];
	/******/ if (cachedModule !== undefined) {
		/******/ return cachedModule.exports;
		/******/
	}
	/******/ // Create a new module (and put it into the cache)
	/******/ var module = (__webpack_module_cache__[moduleId] = {
		/******/ // no module.id needed
		/******/ // no module.loaded needed
		/******/ exports: {},
		/******/
	});
	/******/
	/******/ // Execute the module function
	/******/ __webpack_modules__[moduleId](
		module,
		module.exports,
		__webpack_require__,
	);
	/******/
	/******/ // Return the exports of the module
	/******/ return module.exports;
	/******/
}
/******/
/************************************************************************/
/******/ /* webpack/runtime/async module */
/******/ (() => {
	/******/ var webpackQueues =
		typeof Symbol === "function"
			? Symbol("webpack queues")
			: "__webpack_queues__";
	/******/ var webpackExports =
		typeof Symbol === "function"
			? Symbol("webpack exports")
			: "__webpack_exports__";
	/******/ var webpackError =
		typeof Symbol === "function"
			? Symbol("webpack error")
			: "__webpack_error__";
	/******/ var resolveQueue = (queue) => {
		/******/ if (queue && queue.d < 1) {
			/******/ queue.d = 1;
			/******/ queue.forEach((fn) => fn.r--);
			/******/ queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
			/******/
		}
		/******/
	};
	/******/ var wrapDeps = (deps) =>
		deps.map((dep) => {
			/******/ if (dep !== null && typeof dep === "object") {
				/******/ if (dep[webpackQueues]) return dep;
				/******/ if (dep.then) {
					/******/ var queue = [];
					/******/ queue.d = 0;
					/******/ dep.then(
						(r) => {
							/******/ obj[webpackExports] = r;
							/******/ resolveQueue(queue);
							/******/
						},
						(e) => {
							/******/ obj[webpackError] = e;
							/******/ resolveQueue(queue);
							/******/
						},
					);
					/******/ var obj = {};
					/******/ obj[webpackQueues] = (fn) => fn(queue);
					/******/ return obj;
					/******/
				}
				/******/
			}
			/******/ var ret = {};
			/******/ ret[webpackQueues] = (x) => {};
			/******/ ret[webpackExports] = dep;
			/******/ return ret;
			/******/
		});
	/******/ __webpack_require__.a = (module, body, hasAwait) => {
		/******/ var queue;
		/******/ hasAwait && ((queue = []).d = -1);
		/******/ var depQueues = new Set();
		/******/ var exports = module.exports;
		/******/ var currentDeps;
		/******/ var outerResolve;
		/******/ var reject;
		/******/ var promise = new Promise((resolve, rej) => {
			/******/ reject = rej;
			/******/ outerResolve = resolve;
			/******/
		});
		/******/ promise[webpackExports] = exports;
		/******/ promise[webpackQueues] = (fn) => (
			queue && fn(queue), depQueues.forEach(fn), promise["catch"]((x) => {})
		);
		/******/ module.exports = promise;
		/******/ body(
			(deps) => {
				/******/ currentDeps = wrapDeps(deps);
				/******/ var fn;
				/******/ var getResult = () =>
					currentDeps.map((d) => {
						/******/ if (d[webpackError]) throw d[webpackError];
						/******/ return d[webpackExports];
						/******/
					});
				/******/ var promise = new Promise((resolve) => {
					/******/ fn = () => resolve(getResult);
					/******/ fn.r = 0;
					/******/ var fnQueue = (q) =>
						q !== queue &&
						!depQueues.has(q) &&
						(depQueues.add(q), q && !q.d && (fn.r++, q.push(fn)));
					/******/ currentDeps.map((dep) => dep[webpackQueues](fnQueue));
					/******/
				});
				/******/ return fn.r ? promise : getResult();
				/******/
			},
			(err) => (
				err ? reject((promise[webpackError] = err)) : outerResolve(exports),
				resolveQueue(queue)
			),
		);
		/******/ queue && queue.d < 0 && (queue.d = 0);
		/******/
	};
	/******/
})();
/******/
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
	/******/ // define __esModule on exports
	/******/ __webpack_require__.r = (exports) => {
		/******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
			/******/ Object.defineProperty(exports, Symbol.toStringTag, {
				value: "Module",
			});
			/******/
		}
		/******/ Object.defineProperty(exports, "__esModule", { value: true });
		/******/
	};
	/******/
})();
/******/
/************************************************************************/
/******/
/******/ // startup
/******/ // Load entry module and return exports
/******/ // This entry module used 'module' so it can't be inlined
/******/ var __webpack_exports__ = __webpack_require__("./src/entry.js");
/******/
