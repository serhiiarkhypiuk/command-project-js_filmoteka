// import { add } from 'lodash';
import { isGeneratorFunction } from 'util/types';
import TopMovies from './work-with-api.js'
const cardsList = document.querySelector('.movie-collection');
const addToWatchButton = document.querySelector('.modal__btn-add');
console.log(addToWatchButton)
topMovies = new TopMovies();

let watchedMovies = [];

cardsList.addEventListener('click', (e) => {
    // const isCardMovie = e.target.closest('.movies__item');
    // const movId = parseInt(isCardMovie.data-id);
    // console.log(movId)
    topMovies.fetchMovies()
        .then(movie => {
            movie.results.map(it => {
                // if (movId === it.id) {
                    if (localStorage.getItem('watched')) {
                        watchedMovies = JSON.parse(localStorage.getItem('watched'));
                    }
                    watchedMovies.push(it);
                    localStorage.setItem('watched', JSON.stringify(watchedMovies));
                // }
            })
        });
});

