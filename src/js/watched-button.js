import TopMovies from './work-with-api.js';

const refs = {
  watchedBtn: document.querySelector('.header_btn-watched'),
  queueBtn: document.querySelector('.header_btn-queue'),
  list: document.querySelector('.movie-collection'),
  addToWatchedBtn: document.querySelector('.modal__btn-add'),
};

const topMoviesList = new TopMovies();

const filmsFromLocalStorage = JSON.parse(localStorage.getItem('watched'));

onWatchedMarkup();

refs.watchedBtn.addEventListener('click', onWatchedBtnClick);

function onWatchedBtnClick() {
  refs.queueBtn.classList.remove('header-active-button');
  refs.watchedBtn.classList.add('header-active-button');
  onWatchedMarkup();
}
function onWatchedMarkup() {
  if (filmsFromLocalStorage) {
    topMoviesMarkUp(filmsFromLocalStorage);
  }
}

function topMoviesMarkUp(movies) {
  refs.list.innerHTML = movies
    .map(movie => {
      let movie_g = getGenrs(JSON.parse(localStorage.getItem('genres')));
      if (movie_g.length > 2) {
        movie_g = [movie_g[0], movie_g[1], 'Other'];
      }
      return `<li class="movies__item" id="${movie.id}" data-id=${movie.id}>
    <a href="" class="movies__link">
        <img src='https://image.tmdb.org/t/p/original${
          movie.poster_path
        }' class="movie__image" alt="Movie">
        <div class="movie__text-part">
            <h2 class="movie__title">${movie.title}</h2>
            <p class="movie__genre">${movie_g.join(
              ', '
            )} <span class="stick">|</span> 
                <span class="movie__year">${movie.release_date.slice(
                  0,
                  4
                )}</span></p>
        </div>
    </a>
</li>`;
    })
    .join('');
}

function getGenrs(genres) {
  return genres.map(genre => {
    return genre.name;
  });
}

if (!localStorage.getItem('watched')) {
  const placeholder = document.querySelector('.placeholder');
  placeholder.style.display = 'block';
}
