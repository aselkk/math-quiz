export const endGame = () => {
    const setResults = () => {
        const results = JSON.parse(localStorage.getItem('inputData'))
        console.log(results, 'results')
        document.querySelector('.score-num').innerText = results.totalCorrect
    }
    setResults()
}

