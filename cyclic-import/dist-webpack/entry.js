/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ion-js/Ion.js":
/*!***************************!*\
  !*** ./src/ion-js/Ion.js ***!
  \***************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IonTypes: () => (/* reexport safe */ _IonTypes_js__WEBPACK_IMPORTED_MODULE_0__.IonTypes),
/* harmony export */   dom: () => (/* reexport module object */ _dom_index_js__WEBPACK_IMPORTED_MODULE_1__)
/* harmony export */ });
/* harmony import */ var _IonTypes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IonTypes.js */ "./src/ion-js/IonTypes.js");
/* harmony import */ var _dom_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom/index.js */ "./src/ion-js/dom/index.js");





/***/ }),

/***/ "./src/ion-js/IonTypes.js":
/*!********************************!*\
  !*** ./src/ion-js/IonTypes.js ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IonTypes: () => (/* binding */ IonTypes)
/* harmony export */ });
const IonTypes = {
  BLOB: 'Blob',
};


/***/ }),

/***/ "./src/ion-js/dom/Blob.js":
/*!********************************!*\
  !*** ./src/ion-js/dom/Blob.js ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Blob: () => (/* binding */ Blob)
/* harmony export */ });
/* harmony import */ var _Ion_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Ion.js */ "./src/ion-js/Ion.js");

const Blob = _Ion_js__WEBPACK_IMPORTED_MODULE_0__.IonTypes.BLOB;


/***/ }),

/***/ "./src/ion-js/dom/index.js":
/*!*********************************!*\
  !*** ./src/ion-js/dom/index.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Blob: () => (/* reexport safe */ _Blob_js__WEBPACK_IMPORTED_MODULE_0__.Blob)
/* harmony export */ });
/* harmony import */ var _Blob_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Blob.js */ "./src/ion-js/dom/Blob.js");



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/entry.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ion_js_Ion_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ion-js/Ion.js */ "./src/ion-js/Ion.js");

console.log(JSON.stringify(_ion_js_Ion_js__WEBPACK_IMPORTED_MODULE_0__, null, 2));

})();

/******/ })()
;