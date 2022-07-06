export const initModalToggling = () =>{
    const openModal = document.querySelector(".bttn--rules")
    const openLeaderboard = document.querySelector(".bttn--leaderboard")
    const openEndModal = document.querySelector(".bttn--stop")
    let modalWindow

    openModal?.addEventListener("click", function () {
        modalWindow = document.querySelector('.modal-window')
        hideModalWindow();
        showModalWindow();
        initModalEvents()
    });

    openLeaderboard?.addEventListener("click", function () {
        modalWindow = document.querySelector('.modal-window--leaderboard')
        hideModalWindow();
        showModalWindow();
        initModalEvents();
    });
    
    openEndModal?.addEventListener("click", function () {
        modalWindow = document.querySelector('.modal-window--game_end')
        hideModalWindow();
        showModalWindow();
        initModalEvents();
    });

    const initModalEvents = () =>{
        modalWindow.addEventListener(
            "click",
            function (event) {
                if (
                    event.target.matches(".modal-btn") ||
                    !event.target.closest(".modal-content")
                ) {
                    hideModalWindow();
                };
            },
            false 
        );
    }
    
    function showModalWindow () {
        document.body.style.overflow='hidden';
        modalWindow.style.display='flex';

    };
    
    function hideModalWindow () {
        document.body.style.overflow='scroll';
        modalWindow.style.display='none';
    };
};



