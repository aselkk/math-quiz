/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/animate.css/animate.css":
/*!**********************************************!*\
  !*** ./node_modules/animate.css/animate.css ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/styles/index.scss":
/*!*******************************!*\
  !*** ./src/styles/index.scss ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

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

/***/ "./src/js/login.js":
/*!*************************!*\
  !*** ./src/js/login.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "login": () => (/* binding */ login)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/js/modal.js");
/* harmony import */ var _leaderboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./leaderboard */ "./src/js/leaderboard.js");



const login = () => {
    const userInput =  document.getElementById("username")
    const inputHeader = document.querySelector('.input-header')

    userInput?.addEventListener('input', function (e) {
        if (e.target.value.length >= 1) {
            inputHeader.style = 'color: #fff';
            userInput.style = 'border: 2px solid #fff';
        }
    })

    const validateField = (e) => {
        e.preventDefault();
        if(userInput.value.length == 0){
            userInput.style = 'border: 1px solid #ff5437';
            inputHeader.style = 'color: #ff5437';
        } else {
            getValues()
        }
    }

    document.getElementById("start-form")?.addEventListener("submit", validateField);
    document.getElementById("bttn--leaderboard")?.addEventListener("click", (0,_leaderboard__WEBPACK_IMPORTED_MODULE_1__.renderLeaderboard)());

    const getValues = () => {
        const values = {
            name: document.forms['start-form']['username'].value,
            mode: document.querySelector('input[name="select"]:checked').value,
            score: 0,
        }

        localStorage.setItem('inputData', JSON.stringify(values));        

        document.getElementById('bttnStart').addEventListener('click', redirect())
        function redirect() {
            window.location.href="./game.html";
        }
    }

    const username = JSON.parse(localStorage.getItem('inputData'));
    if(!username) return
    userInput.value = username.name.replace(/\"/g, "")    
}

;(0,_modal__WEBPACK_IMPORTED_MODULE_0__.initModalToggling)()


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
/* harmony import */ var animate_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! animate.css */ "./node_modules/animate.css/animate.css");
/* harmony import */ var _login__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login */ "./src/js/login.js");
/* harmony import */ var _leaderboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./leaderboard */ "./src/js/leaderboard.js");




// import { initModalToggling } from './modal'

(0,_login__WEBPACK_IMPORTED_MODULE_2__.login)()
;(0,_leaderboard__WEBPACK_IMPORTED_MODULE_3__.renderLeaderboard)()
// initModalToggling()

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map