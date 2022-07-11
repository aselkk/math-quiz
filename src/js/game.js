import { startTimer } from './timer';
import { endGame } from './endGame';
import { initModalToggling } from './modal'
import {renderLeaderboard} from './leaderboard'

export const game = () => {
    const inputData = JSON.parse(localStorage.getItem('inputData'));
    if (!inputData) return;

    document.querySelector('.bttn--stop').addEventListener('click', () => {
        const results = JSON.parse(localStorage.getItem('inputData'))
        console.log(results, 'results')
        let storagePlayers = JSON.parse(localStorage.getItem('storagePlayers'))
        console.log(storagePlayers, '1231321');
        if(storagePlayers){
            storagePlayers.push(results)
            localStorage.setItem('storagePlayers', JSON.stringify(storagePlayers))
        } else {
            storagePlayers = []
            storagePlayers.push(results)
            localStorage.setItem('storagePlayers', JSON.stringify(storagePlayers))
        }
        console.log(JSON.parse(localStorage.getItem('storagePlayers')));
        renderLeaderboard()
    })
    
    document.querySelector('.user-greet').innerText = `Have fun, ${inputData.name.replace(/\"/g, "")}!`;

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

    let totalCorrect = 0
    let totalIncorrect = 0
    let activeCount = 0
    let problem = getRandoms()
    renderProblem(problem)


    const onSubmit = (e) => {
        document.querySelector('.total-correct').innerText = totalCorrect
        document.querySelector('.total-incorrect').innerText = totalIncorrect
        document.querySelector('.score-num').innerText = totalCorrect - totalIncorrect

        e.preventDefault()

        if (!answer.value) return
        if (Number(answer.value) === Number(problem.answer)) {
            activeCount += 1
            count.textContent = '+1'
            totalCorrect += 1
            count.style = 'display: block'
            count.classList.add('animate__fadeInUp')
        } else {
            activeCount -= 1
            count.textContent = '-1'
            totalIncorrect += 1
            document.querySelector('.score-wrapper').classList.add('shake-animation')
            setTimeout(function() {
                document.querySelector('.score-wrapper').classList.remove('shake-animation')
            },1000)
            
        }
        
        score.textContent = activeCount
        answer.value = ''
        inputData.score = totalCorrect - totalIncorrect
        
        localStorage.setItem('inputData', JSON.stringify(inputData));
        console.log(JSON.parse(localStorage.getItem('inputData')));
        localStorage.setItem('inputData', JSON.stringify(inputData));
        document.querySelector('.game').classList.remove('animationfr')
        document.querySelector('.game').classList.add('animation')
        setTimeout(function() {
            problem = getRandoms()
            renderProblem(problem)
            document.querySelector('.game').classList.remove('animation')
            document.querySelector('.game').classList.add('animationfr')
        },400)
    }
    // document.querySelector('.bttn--leaderboard').addEventListener('click', renderLeaderboard())
    form.addEventListener('submit', onSubmit)
}

initModalToggling()
game()

