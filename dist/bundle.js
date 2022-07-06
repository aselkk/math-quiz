/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles/index.scss":
/*!*******************************!*\
  !*** ./src/styles/index.scss ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/js/game.js":
/*!************************!*\
  !*** ./src/js/game.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "game": () => (/* binding */ game)
/* harmony export */ });
const game = () => {

    const username = localStorage.getItem('username');
    document.getElementById("username").value = username.replace(/\"/g, "");

    const setName = () => {
        document.querySelector('.user-greet').textContent = `Have fun, ${username.replace(/\"/g, "")}`;
        console.log('123');
    }
    setName()

    const firstNum = document.querySelector('.num-1')
    const secondNum = document.querySelector('.num-2')
    const operator = document.querySelector('.operator')
    const answer = document.querySelector('.answer')
    const form = document.querySelector('.gameplay-form')
    const score = document.querySelector('.score')
    const count = document.querySelector('.count')

    function getRandom(min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    const operators = ['+', '-', '*', '/']

    const calculate = (a, b, operator) => {
    switch (operator) {
        case '+':
        return a + b
        case '-':
        return a - b
        case '/':
        return a / b
        default:
        return a * b
    }
    }

    const generateExample = () => {
        const firstNum = getRandom(1, 10)
        const secondNum = getRandom(1, 10)
        const operator = operators[getRandom(0, 3)]

        if (operator === '/') {
            if (firstNum % secondNum !== 0) {
            return generateExample()
            }
        }

        const answer = calculate(firstNum, secondNum, operator)
        return { firstNum, secondNum, operator, answer }
    }

    const renderExample = (data) => {
        firstNum.textContent = data.firstNum
        secondNum.textContent = data.secondNum
        operator.textContent = data.operator
    }

    let activeCount = 0
    let example = generateExample()
    renderExample(example)

    const onSubmit = (e) => {
        e.preventDefault()

        if (!answer.value) return
        if (Number(answer.value) === Number(example.answer)) {
            activeCount += 1
            count.textContent = '+1'
        } else {
            activeCount -= 1
            count.textContent = '-1'
        }
        score.textContent = `Your score is: ${activeCount}`
        answer.value = ''
        example = generateExample()
        renderExample(example)
    }

form.addEventListener('submit', onSubmit)

}

/***/ }),

/***/ "./src/js/login.js":
/*!*************************!*\
  !*** ./src/js/login.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "login": () => (/* binding */ login)
/* harmony export */ });
const login = () => {


    document.getElementById("username")?.addEventListener('input', function (e) {
        if (e.target.value.length >= 1) {
            document.querySelector(".input-header").style = 'color: #fff';
            document.getElementById('username').style = 'border: 2px solid #fff';
        }
    })

    const validateField = (e) => {
        e.preventDefault();
        if(document.getElementById('username').value.length == 0){
            document.getElementById('username').style = 'border: 2px solid #ff5437';
            document.querySelector('.input-header').style = 'color: #ff5437';
        } else {
            getValues()
        }
        
    }

    document.getElementById("start-form")?.addEventListener("submit", validateField);

    const getValues = () => {

        const values = {
            name: document.forms['start-form']['username'].value,
            mode: document.querySelector('input[name="select"]:checked').value
        }
        console.log('values:', values)

        window.localStorage.setItem('username', JSON.stringify(values.name));

        document.querySelector('.bttn--start').addEventListener('click', redirect())
        function redirect() {
            window.location.href="./game.html";
            console.log('asfdf')
        }
    }

}

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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/index.scss */ "./src/styles/index.scss");
/* harmony import */ var _login__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login */ "./src/js/login.js");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game */ "./src/js/game.js");




const username = localStorage.getItem('username');


(0,_login__WEBPACK_IMPORTED_MODULE_1__.login)()
;(0,_game__WEBPACK_IMPORTED_MODULE_2__.game)()
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map