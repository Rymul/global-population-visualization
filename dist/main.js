/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scripts/util */ \"./src/scripts/util.js\");\n\n\n\nwindow.addEventListener('DOMContentLoaded', (event) => {\n    console.log('The Dom hath Loaded?');\n    console.log(event.isTrusted);\n\nconst dataPoints = ['GDP']//, 'GDPPC', 'CPI', 'URATE', 'POP', 'IP', 'EXP', 'IMP', 'GDEBT', 'NIIP']\nconst countries = [\n\n    // 'AL',\n    // 'DZ',\n    // 'AO',\n    // 'AR',\n    // 'AU',\n    // 'AT',\n    // 'AZ',\n    // 'BD',\n    // 'BY',\n    // 'BE',\n    // 'BO',\n    // 'BA',\n    // 'BR',\n    // 'BG',\n    // 'KH',\n    // 'CA',\n    // 'CL',\n    // 'CN',\n    // 'CO',\n    // 'CR',\n    // 'HR',\n    // 'CY',\n    // 'CZ',\n    // 'CD',\n    // 'DK',\n    // 'DO',\n    // 'EC',\n    // 'EG',\n    // 'SV',\n    // 'EE',\n    // 'ET',\n    // 'EU',\n    // 'FI',\n    // 'FR',\n    // 'DE',\n    // 'GH',\n    // 'GR',\n    // 'GT',\n    // 'HN',\n    // 'HK',\n    // 'HU',\n    // 'IN',\n    // 'ID',\n    // 'IR',\n    // 'IQ',\n    // 'IE',\n    // 'IL',\n    // 'IT',\n    // 'JP',\n    // 'JO',\n    // 'KZ',\n    // 'KE',\n    // 'KW',\n    // 'KG',\n    // 'LA',\n    // 'LV',\n    // 'LB',\n    // 'LY',\n    // 'LT',\n    // 'LU',\n    // 'MO',\n    // 'MY',\n    // 'MX',\n    // 'MN',\n    // 'MA',\n    // 'MM',\n    // 'NP',\n    // 'NL',\n    // 'NZ',\n    // 'NI',\n    // 'NG',\n    // 'NO',\n    // 'OM',\n    // 'PK',\n    // 'PA',\n    // 'PY',\n    // 'PE',\n    // 'PH',\n    // 'PL',\n    // 'PT',\n    // 'QA',\n    // 'RO',\n    'RU',\n    'SA',\n    'SN',\n    'RS',\n    'SG',\n    'SK',\n    'SI',\n    'ZA',\n    'KR',\n    'ES',\n    'LK',\n    'SD',\n    'SE',\n    'CH',\n    'TW',\n    'TJ',\n    'TZ',\n    'TH',\n    'TN',\n    'TR',\n    'TM',\n    'UA',\n    'AE',\n    'UK',\n    'US']\n    // 'UY',\n    // 'UZ',\n    // 'VE',\n    // 'VN']\n    // function to run api fetching\n    let test = (0,_scripts_util__WEBPACK_IMPORTED_MODULE_0__.data)(dataPoints, countries)\n\n\n\n\n\n\n\n});\n\n\n\n\n\n\n\n\n\nconsole.log('Garret Sucks');\n\n//# sourceURL=webpack://js_data_visualization_project/./src/index.js?");

/***/ }),

/***/ "./src/scripts/util.js":
/*!*****************************!*\
  !*** ./src/scripts/util.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"data\": function() { return /* binding */ data; }\n/* harmony export */ });\n\n\n// let endpoints = ['GDPUS', 'GDPDE']\n// function to run api fetching\nconst data = (arr1, arr2)  => {\n    const bigData = {}\n    for (let i = 0; i < arr2.length; i++) {\n        bigData[arr2[i]] = {}\n        for (let j = 0; j < arr1.length; j++) {\n            fetch(`https://www.econdb.com/api/series/${arr1[j]}${arr2[i]}/?format=json`).then(result => result.json()).then(stuff => console.log(stuff));\n            // console.log(res);\n            // console.log(res.json())\n            // if(res.ok) {\n            //     const countryData = await res.json();\n            //     bigData[arr2[i]][arr1[j]] = countryData.data\n            //     console.log(countryData)\n            // } else {\n            //     bigData[arr2[i]][arr1[j]] = 'Data Unavailable'\n            // }\n            \n            // console.log(res);     \n        \n        }\n    }\n    console.log(bigData)\n}\n  \n\n\n\n\n\n\n\n\n//# sourceURL=webpack://js_data_visualization_project/./src/scripts/util.js?");

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
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;