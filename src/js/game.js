import { startTimer } from './timer';
import { endGame } from './endGame';
import { initModalToggling } from './modal'

export const game = () => {

    const inputData = JSON.parse(localStorage.getItem('inputData'));
    if (!inputData) return;

    document.querySelector('.user-greet').innerText = `Have fun, ${inputData.name.replace(/\"/g, "")}!`;

    const changeMode = () => {
        if (inputData.mode == 'time') {
            window.onload = function () {
                const time = 90,
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

    let totalCorrect = 0
    let totalIncorrect = 0
    let activeCount = 0
    let example = generateExample()
    renderExample(example)

    const onSubmit = (e) => {
        e.preventDefault()

        if (!answer.value) return
        if (Number(answer.value) === Number(example.answer)) {
            activeCount += 1
            count.textContent = '+1'
            totalCorrect += 1
        } else {
            activeCount -= 1
            count.textContent = '-1'
            totalIncorrect += 1
        }
        
        score.textContent = activeCount
        answer.value = ''
        example = generateExample()
        renderExample(example)

        

        document.querySelector('.total-correct').innerText = totalCorrect
        document.querySelector('.total-incorrect').innerText = totalIncorrect
        document.querySelector('.score-num').innerText = totalCorrect - totalIncorrect
        localStorage.setItem('inputData', JSON.stringify(inputData));
        console.log(JSON.parse(localStorage.getItem('inputData')));
    }

form.addEventListener('submit', onSubmit)
document.querySelector('.bttn--stop').addEventListener('click', endGame())
}

initModalToggling()
game()

