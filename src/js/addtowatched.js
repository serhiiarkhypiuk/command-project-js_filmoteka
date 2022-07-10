// (FT-18 За натисканням на кнопку "Add to watched" фільм додається до переглянутих фільмів поточного користувача (local-storage))
import TopMovies from './work-with-api.js';

const btnAddToWatch = document.querySelector('.modal__active-btn');

import TopMovies from './work-with-api.js';

const topMovies = new TopMovies();

let watchedMovies = [];

btnAddToWatch.addEventListener('click', e => {
  const isCardMovie = e.target.closest('.modal__card-content');
  const movId = isCardMovie.getAttribute('data-id');

  fetchMovieDetails(movId).then(movie => {
    if (localStorage.getItem('watched')) {
      watchedMovies = JSON.parse(localStorage.getItem('watched'));
    }
    let isMovieExists = false;
    for (let el of watchedMovies) {
      if (el.id === movie.id) {
        isMovieExists = true;
        break;
      }
    }

    if (!isMovieExists) {
      watchedMovies.push(movie);
      localStorage.setItem('watched', JSON.stringify(watchedMovies));
    }
  });
});

async function fetchMovieDetails(id) {
  return await fetch(
    `https://api.themoviedb.org/3//movie/${id}?api_key=7fea517bd5b294dd7a1b57e94e2c1c68&language=en-US`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      return data;
    });
}
