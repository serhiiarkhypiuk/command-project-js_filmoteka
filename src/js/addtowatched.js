import TopMovies from './work-with-api.js'
const addToWatchButton = document.querySelector('.modal__btn-add');

topMovies = new TopMovies(); 

let watchedMovies = [];

addToWatchButton.addEventListener('click', () => {
const modalTitle = document.querySelector('.modal__info-title');
    topMovies.fetchMovies()
        .then(movie => {
            movie.results.map(it => {
                if (modalTitle.textContent === it.original_title.toUpperCase()) {  
                    if (localStorage.getItem('watched')) { 
                        watchedMovies = JSON.parse(localStorage.getItem('watched')); 
                    }
                    watchedMovies.push(it);
                    localStorage.setItem('watched', JSON.stringify(watchedMovies));
                }
            })
        });
});

