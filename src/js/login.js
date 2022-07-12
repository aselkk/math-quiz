import { initModalToggling } from './modal'
import {renderLeaderboard} from './leaderboard'

export const login = () => {
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
    document.getElementById("bttn--leaderboard")?.addEventListener("click", renderLeaderboard());

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

initModalToggling()
