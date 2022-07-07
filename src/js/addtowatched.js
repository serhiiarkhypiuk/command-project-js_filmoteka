import TopMovies from './work-with-api.js'
const cardsList = document.querySelector('.movie-collection');

topMovies = new TopMovies();

let watchedMovies = [];

cardsList.addEventListener('click', (e) => {
    const isCardMovie = e.target.closest('.movies__item');
    const movId = parseInt(isCardMovie.id);
    topMovies.fetchMovies()
        .then(movie => {
            movie.results.map(it => {
                if (movId === it.id) {
                    watchedMovies.push(it);
                    localStorage.setItem('watched', JSON.stringify(watchedMovies))
                }
            })
        });
});

// localStorage.removeItem('watched');
console.log(localStorage.getItem('watched'))