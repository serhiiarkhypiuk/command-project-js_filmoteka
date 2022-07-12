// (FT-18 За натисканням на кнопку "Add to watched" фільм додається до переглянутих фільмів поточного користувача (local-storage))

const btnAddToWatch = document.querySelector('.wached');
const btnAddToQueue = document.querySelector('.queue');
const btns = document.querySelector('.movie-collection'); 

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
    } else {
      removeFromWatched(movie.id);
  btnAddToWatch.textContent = 'add to Watched';


    }
  });
    
  btnAddToWatch.textContent = 'Remove from Watched';
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
// localStorage.removeItem('watched')


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