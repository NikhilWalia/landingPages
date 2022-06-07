/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/helper.js":
/*!**************************!*\
  !*** ./src/js/helper.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"pancardValidation\": () => (/* binding */ pancardValidation),\n/* harmony export */   \"ONHOLD\": () => (/* binding */ ONHOLD)\n/* harmony export */ });\nconst pancardValidation = (text) => {\r\n    let   regex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;\r\n    if(regex.test(text)) {\r\n         return true;\r\n    }\r\n    return false;\r\n}\r\n\r\nconst ONHOLD = [\"5PSADA\", \"SAS0DA\", \"AXISSA\", \"icici\",\r\n                        \"ESPRDA\", \"ICIDDA\"];//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvaGVscGVyLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQU87QUFDUCwrQkFBK0IsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1AiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJwYWNrLy4vc3JjL2pzL2hlbHBlci5qcz9hMmU5Il0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBwYW5jYXJkVmFsaWRhdGlvbiA9ICh0ZXh0KSA9PiB7XHJcbiAgICBsZXQgICByZWdleCA9IC9eKFthLXpBLVpdKXs1fShbMC05XSl7NH0oW2EtekEtWl0pezF9PyQvO1xyXG4gICAgaWYocmVnZXgudGVzdCh0ZXh0KSkge1xyXG4gICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IE9OSE9MRCA9IFtcIjVQU0FEQVwiLCBcIlNBUzBEQVwiLCBcIkFYSVNTQVwiLCBcImljaWNpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiRVNQUkRBXCIsIFwiSUNJRERBXCJdOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/js/helper.js\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/helper.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;