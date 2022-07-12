import { startTimer } from './timer';
import { initModalToggling } from './modal'
import {renderLeaderboard} from './leaderboard'

export const game = () => {
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
        renderLeaderboard()
    })

    const changeMode = () => {
        if (inputData.mode == 'time') {
            window.onload = function () {
                const time = 10,
                display = document.querySelector('#time');
                startTimer(time, display);
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
        const firstNum = getRandom(1, 10)
        const secondNum = getRandom(1, 10)
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

initModalToggling()
game()

