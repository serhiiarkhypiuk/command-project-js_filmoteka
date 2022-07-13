// (FT-18 За натисканням на кнопку "Add to watched" фільм додається до переглянутих фільмів поточного користувача (local-storage))

const btnAddToWatch = document.querySelector('.wached');
const btnAddToQueue = document.querySelector('.queue');
const btns = document.querySelector('.movie-collection');

let watchedMovies = [];


btnAddToWatch.addEventListener('click', e => {
  const isCardMovie = e.target.closest('.modal__card-content');
  const movId = isCardMovie.getAttribute('data-id');

  const movie = fetchMovieDetails(parseInt(movId));
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

    btnAddToWatch.textContent = 'Remove from Watched';
  } else {
    removeFromWatched(movie.id);

    btnAddToWatch.textContent = 'add to Watched';
  }
});


function fetchMovieDetails(id) {
  return getPageMovies().filter(el => el.id === id)[0];
}

function getPageMovies() {
  return JSON.parse(localStorage.getItem('pageMovies'));
}


btns.addEventListener('click', changeTextOnButton);

function changeTextOnButton(e) {
  if (e.target !== btns) {
    const movieId = parseInt(e.target.closest('.movies__item').dataset.id);
    const filmsFromLocalStorage = JSON.parse(localStorage.getItem('watched'));
    const filmsFromQueue = JSON.parse(localStorage.getItem('queue'));


    if (filmsFromLocalStorage) {
      let isMovieInLibrary = false;
      for (const film of filmsFromLocalStorage) {
        if (film.id === movieId) {
          isMovieInLibrary = true;
        }
      }

      if (isMovieInLibrary) {
        btnAddToWatch.textContent = 'Remove from Watched';
      }
      else {
        btnAddToWatch.textContent = 'Add to Watched';
      }
    }


    if (filmsFromQueue) {
      let isMovieInLibrary = false;
      for (const film of filmsFromQueue) {
        if (film.id === movieId) {
          isMovieInLibrary = true;
        }
      }

      if (isMovieInLibrary) {
        btnAddToQueue.textContent = 'Remove from Queue';
      }
      else {
        btnAddToQueue.textContent = 'Add to queue';
      }
    }
  }
}

function removeFromWatched(id) {
  const films = JSON.parse(localStorage.getItem('watched'));
  const filtered = films.filter(el => el.id !== id);
  localStorage.setItem('watched', JSON.stringify(filtered));
}

