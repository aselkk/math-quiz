export const endGame = () => {
    const leaderboard = []
    const setResults = () => {
        const results = JSON.parse(localStorage.getItem('inputData'))
        console.log(results, 'results')
        leaderboard.push(results);
    }
    setResults()
}

