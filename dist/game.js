/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/leaderboard.js":
/*!*******************************!*\
  !*** ./src/js/leaderboard.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderLeaderboard": () => (/* binding */ renderLeaderboard)
/* harmony export */ });
const renderLeaderboard = () => {
    let players = JSON.parse(localStorage.getItem('storagePlayers'))
    if (!players) return;

    let filteredByName = []
    players?.forEach((player) => {
        if (filteredByName.length) {
            const res = filteredByName.findIndex((item) => item.name === player.name && item.mode === player.mode)
            if (res >= 0) {
                if (player.score > filteredByName[res].score) {
                    filteredByName.splice(res, 1);
                    filteredByName.push(player);
                }
            } else {
                filteredByName.push(player);
            }
        } else {
            filteredByName.push(player);
        }
    })

    const filteredByScore = filteredByName.sort((sameName, filteredByName) => filteredByName.score - sameName.score);

    function renderLeaders(arr) {
        const select = document.getElementById('select');
        const value = select.options[select.selectedIndex].value;
        const listContainer = document.createElement('ol');
        const listFragment = document.createDocumentFragment();
        const list = document.querySelector(".leaders-wrapper");
        list.innerHTML = ''
        function makeElem(arrItem) {
            const {name, mode, score} = arrItem;
            let li = document.createElement('li');
            li.innerHTML = `${name} ${score}`;
            return li;
        }

        arr.forEach((item, index) => {
            try {
                if(item.mode == value){
                    const listElement = makeElem(item, index);
                    listFragment.append(listElement);
                }
            } catch (Error) {
                console.log(Error);
            }
        });
        listContainer.append(listFragment);
        list.append(listContainer);
    }
    
    document.getElementById('select').addEventListener('change', () => {
        renderLeaders(filteredByScore)
    })
    renderLeaders(filteredByScore);
}
renderLeaderboard()


/***/ }),

/***/ "./src/js/modal.js":
/*!*************************!*\
  !*** ./src/js/modal.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initModalToggling": () => (/* binding */ initModalToggling)
/* harmony export */ });
const initModalToggling = () =>{
    const openModal = document.querySelector(".bttn--rules")
    const openLeaderboard = document.querySelector(".bttn--leaderboard")
    const openEndModal = document.querySelector(".bttn--stop")
    let modalWindow

    openModal?.addEventListener("click", function () {
        modalWindow = document.querySelector('.modal-window')
        hideModalWindow();
        showModalWindow();
        initModalEvents()
    });

    openLeaderboard?.addEventListener("click", function () {
        modalWindow = document.querySelector('.modal-window--leaderboard')
        hideModalWindow();
        showModalWindow();
        initModalEvents();
    });
    
    openEndModal?.addEventListener("click", function () {
        modalWindow = document.querySelector('.modal-window--game_end')
        hideModalWindow();
        showModalWindow();
        initModalEvents();
    });

    const initModalEvents = () =>{
        modalWindow.addEventListener(
            "click",
            function (event) {
                if (
                    event.target.matches(".modal-btn") ||
                    !event.target.closest(".modal-content")
                ) {
                    hideModalWindow();
                };
            },
            false 
        );
    }
    
    function showModalWindow () {
        document.body.style.overflow='hidden';
        modalWindow.style.display='flex';

    };
    
    function hideModalWindow () {
        document.body.style.overflow='scroll';
        modalWindow.style.display='none';
    };
};





/***/ }),

/***/ "./src/js/timer.js":
/*!*************************!*\
  !*** ./src/js/timer.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startTimer": () => (/* binding */ startTimer)
/* harmony export */ });
/* harmony import */ var _leaderboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./leaderboard */ "./src/js/leaderboard.js");


function startTimer(duration, display) {
    let timer = duration;
    let minutes;
    let seconds;

    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;
        if (--timer < 0) {
            document.body.style.overflow='hidden';
            document.querySelector('.modal-window--game_end').style.display='flex';
            document.querySelector('.modal-header--end').innerText = `time's up!`
            timer = 0
            const results = JSON.parse(localStorage.getItem('inputData'))
            let storagePlayers = JSON.parse(localStorage.getItem('storagePlayers'))
            if(storagePlayers){
                storagePlayers.push(results)
                localStorage.setItem('storagePlayers', JSON.stringify(storagePlayers))
            } else {
                storagePlayers = []
                storagePlayers.push(results)
                localStorage.setItem('storagePlayers', JSON.stringify(storagePlayers))
            }
            (0,_leaderboard__WEBPACK_IMPORTED_MODULE_0__.renderLeaderboard)()
            clearInterval(1)
        }
        
    }, 1000);
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
  !*** ./src/js/game.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "game": () => (/* binding */ game)
/* harmony export */ });
/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer */ "./src/js/timer.js");
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal */ "./src/js/modal.js");
/* harmony import */ var _leaderboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./leaderboard */ "./src/js/leaderboard.js");




const game = () => {
    const firstNum = document.querySelector('.num-1')
    const secondNum = document.querySelector('.num-2')
    const operator = document.querySelector('.operator')
    const answer = document.querySelector('.answer')
    const form = document.querySelector('.gameplay-form')
    const score = document.querySelector('.score')
    const add = document.querySelector('.add')
    const substract = document.querySelector('.substract')
    const problemContainer = document.querySelector('.game')
    const inputData = JSON.parse(localStorage.getItem('inputData'));
    const stopBttn = document.querySelector('.bttn--stop')
    document.querySelector('.user-greet').innerText = `Have fun, ${inputData.name.replace(/\"/g, "")}!`;

    if (!inputData) return;

    stopBttn.addEventListener('click', () => {
        const results = JSON.parse(localStorage.getItem('inputData'))
        let storagePlayers = JSON.parse(localStorage.getItem('storagePlayers'))

        if (storagePlayers) {
            storagePlayers.push(results)
            localStorage.setItem('storagePlayers', JSON.stringify(storagePlayers))
        } else {
            storagePlayers = []
            storagePlayers.push(results)
            localStorage.setItem('storagePlayers', JSON.stringify(storagePlayers))
        }
        (0,_leaderboard__WEBPACK_IMPORTED_MODULE_2__.renderLeaderboard)()
    })

    const changeMode = () => {
        if (inputData.mode == 'time') {
            window.onload = function () {
                const time = 90,
                display = document.querySelector('#time');
                (0,_timer__WEBPACK_IMPORTED_MODULE_0__.startTimer)(time, display);
            };

            document.querySelector('.game-mode').innerText = 'time attack'        
            document.querySelector('.timer').style = 'display: block;'        
        }
    }
    changeMode()

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
            case '*':
            return a * b
        }
    }

    const getRandoms = () => {
        const firstNum = getRandom(1, 10 * level)
        const secondNum = getRandom(1, 10 * level)
        const operator = operators[getRandom(0, 3)]

        if (operator === '/') {
            if (firstNum % secondNum !== 0) {
                return getRandoms()
            }
        }

        const answer = calculate(firstNum, secondNum, operator)
        return { firstNum, secondNum, operator, answer }
    }

    const renderProblem = (data) => {
        firstNum.textContent = data.firstNum
        secondNum.textContent = data.secondNum
        operator.textContent = data.operator
    }

    let level = 1
    let inARow = 0
    let totalCorrect = 0
    let totalIncorrect = 0
    let counter = 0
    let problem = getRandoms()
    renderProblem(problem)

    const onSubmit = (e) => {
        e.preventDefault()

        if (!answer.value) return
        if (Number(answer.value) === Number(problem.answer)) {
            counter += 1
            totalCorrect += 1
            inARow += 1
            add.classList.add("fade-animation")
            setTimeout(function() {
                add.classList.remove('fade-animation')
            },1000)
            if(inARow == 5){
                level += 1
                inARow = 0
            }
        } else {
            counter -= 1
            totalIncorrect += 1
            document.querySelector('.score-wrapper').classList.add('shake-animation')
            substract.classList.add('fade-animation')
            setTimeout(function() {
                document.querySelector('.score-wrapper').classList.remove('shake-animation')
                substract.classList.remove('fade-animation')
            },1000)
            inARow = 0
        }

        problemContainer.classList.remove('animationfr')
        problemContainer.classList.add('animation')
        setTimeout(function() {
            problem = getRandoms()
            renderProblem(problem)
            problemContainer.classList.remove('animation')
            problemContainer.classList.add('animationfr')
        },400)

        score.textContent = counter
        inputData.score = counter
        answer.value = ''

        document.querySelector('.total-correct').innerText = totalCorrect
        document.querySelector('.total-incorrect').innerText = totalIncorrect
        document.querySelector('.score-num').innerText = counter
        document.querySelector('.game-level').innerText = level
        
        localStorage.setItem('inputData', JSON.stringify(inputData));        
    }
    form.addEventListener('submit', onSubmit)
}

;(0,_modal__WEBPACK_IMPORTED_MODULE_1__.initModalToggling)()
game()


})();

/******/ })()
;
//# sourceMappingURL=game.js.map