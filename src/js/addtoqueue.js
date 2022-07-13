// (FT-18 За натисканням на кнопку "Add to watched" фільм додається до переглянутих фільмів поточного користувача (local-storage))

const btnAddToWatch = document.querySelector('.wached');
const btnAddToQueue = document.querySelector('.queue');

let queueMovies = [];

btnAddToQueue.addEventListener('click', e => {
  const isCardMovie = e.target.closest('.modal__card-content');
  const movId = isCardMovie.getAttribute('data-id');

  const movie = fetchMovieDetails(parseInt(movId));
  if (localStorage.getItem('queue')) {
    queueMovies = JSON.parse(localStorage.getItem('queue'));
  }
  let isMovieExists = false;
  for (let el of queueMovies) {
    if (el.id === movie.id) {
      isMovieExists = true;
      break;
    }
  }

  if (!isMovieExists) {
    queueMovies.push(movie);
    localStorage.setItem('queue', JSON.stringify(queueMovies));
    btnAddToQueue.textContent = 'remove from queue';
  } else {
    removeFromQueue(movie.id);
    btnAddToQueue.textContent = 'add to queue';
  }
});

function removeFromQueue(id) {
  const films = JSON.parse(localStorage.getItem('queue'));
  const filtered = films.filter(el => el.id !== id);
  localStorage.setItem('queue', JSON.stringify(filtered));
}

function fetchMovieDetails(id) {
  return getPageMovies().filter(el => el.id === id)[0];
}

function getPageMovies() {
  return JSON.parse(localStorage.getItem('pageMovies'));
}
