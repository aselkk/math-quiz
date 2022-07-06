/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
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
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/js/game.js ***!
  \************************/
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
/******/ })()
;
//# sourceMappingURL=game.js.map