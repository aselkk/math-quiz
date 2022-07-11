export const renderLeaderboard = () => {
    let players = JSON.parse(localStorage.getItem('storagePlayers'))
    if (!players) return;

    let filteredByName = []
    players?.forEach((player) => {
        if (filteredByName.length) {
            console.log(filteredByName, 'filteredByName');
            const res = filteredByName.findIndex((item) => item.name === player.name)
            console.log(res, 'res');
            if (res >= 0) {
                console.log(player)
                if (player.score > filteredByName[res].score) {
                    filteredByName.splice(res, 1);
                    filteredByName.push(player);
                }
            } else {
            filteredByName.push(player);
            }
            }else {
            filteredByName.push(player);
        }
    })

    const filteredByScore = filteredByName.sort((sameName, filteredByName) => filteredByName.score - sameName.score);
    console.log(filteredByScore, 'filteredByScore')

    function renderLeaders(arr) {
        const select = document.getElementById('select');
        const value = select.options[select.selectedIndex].value;
        console.log(value, 'value');
        const list = document.querySelector(".leaders-wrapper");
        list.innerHTML = ''

        function makeElem(arrItem, arrIndex) {
            const {name, mode, score} = arrItem;
                let li = document.createElement('li');
                li.innerHTML = `${name} ${score}`;
                return li;
        }

        const listContainer = document.createElement('ol');
        const listFragment = document.createDocumentFragment();

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
