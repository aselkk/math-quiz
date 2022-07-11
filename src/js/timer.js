import {renderLeaderboard} from './leaderboard'

export function startTimer(duration, display) {
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
        }

    }, 1000);

}
