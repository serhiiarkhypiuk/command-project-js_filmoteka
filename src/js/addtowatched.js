// (FT-18 За натисканням на кнопку "Add to watched" фільм додається до переглянутих фільмів поточного користувача (local-storage))

import TopMovies from './work-with-api.js'

const btnAddToWatch = document.querySelector('.modal__active-btn')

btnAddToWatch.addEventListener('submit', fetchMovies)

topMovies = new TopMovies();

let watchedMovies = [];

const isCardMovie = e.target.closest('.movies__item');
const movId = parseInt(isCardMovie.id);

topMovies.fetchMovies()
      .then(movie => {
        movie.results.map(it => {
          if (movId === it.id) {
            watchedMovies.push(it)
            localStorage.setItem('watched', JSON.stringify(watchedMovies))
          }
        })
    });



