// (FT-18 За натисканням на кнопку "Add to watched" фільм додається до переглянутих фільмів поточного користувача (local-storage))

const btnAddToWatch = document.querySelector('.wached');
const btnAddToQueue = document.querySelector('.queue');

let queueMovies = [];

btnAddToQueue.addEventListener('click', e => {
  const isCardMovie = e.target.closest('.modal__card-content');
  const movId = isCardMovie.getAttribute('data-id');

  fetchMovieDetails(movId).then(movie => {
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
  // btnAddToQueue.textContent = 'add to queue';
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


function removeFromQueue(id) {
  const films = JSON.parse(localStorage.getItem('queue'));
  const filtered = films.filter(el => el.id !== id);
  localStorage.setItem('queue', JSON.stringify(filtered));
}