export const login = () => {

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