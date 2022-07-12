export const renderLeaderboard = () => {
    let players = JSON.parse(localStorage.getItem('storagePlayers'))
    let player = JSON.parse(localStorage.getItem('inputData'))
    let options = document.getElementById('select').options
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

    if(player.mode === 'practice'){
        options[0].setAttribute('selected', 'true')
    } else {
        options[1].setAttribute('selected', 'true')
    }

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
