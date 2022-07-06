import { initModalToggling } from './modal'

export const login = () => {

    const userInput =  document.getElementById("username")

    userInput?.addEventListener('input', function (e) {
        if (e.target.value.length >= 1) {
            document.querySelector(".input-header").style = 'color: #fff';
            userInput.style = 'border: 2px solid #fff';
        }
    })


    const validateField = (e) => {
        e.preventDefault();
        if(userInput.value.length == 0){
            userInput.style = 'border: 1px solid #ff5437';
            document.querySelector('.input-header').style = 'color: #ff5437';
        } else {
            getValues()
        }
        
    }

    document.getElementById("start-form")?.addEventListener("submit", validateField);

    const getValues = () => {

        const values = {
            name: document.forms['start-form']['username'].value,
            mode: document.querySelector('input[name="select"]:checked').value,
            totalCorrect: 0,
            totalIncorrect: 0,
            
        }

        localStorage.setItem('inputData', JSON.stringify(values));        

        document.getElementById('bttnStart').addEventListener('click', redirect())
        function redirect() {
            window.location.href="./game.html";
            console.log('asfdf')
        }
    }

    const username = JSON.parse(localStorage.getItem('inputData'));
    userInput.value = username.name.replace(/\"/g, "")    

}

initModalToggling()
