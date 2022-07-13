import { json } from 'stream/consumers';
import TopMovies from './work-with-api.js';

const refs = {
  watchedBtn: document.querySelector('.header_btn-watched'),
  queueBtn: document.querySelector('.header_btn-queue'),
  list: document.querySelector('.movie-collection'),
  addToWatchedBtn: document.querySelector('.modal__btn-add'),
};

const topMoviesList = new TopMovies();

onWatchedMarkup();

refs.watchedBtn.addEventListener('click', onWatchedBtnClick);

function onWatchedBtnClick() {
  refs.queueBtn.classList.remove('header-active-button');
  refs.watchedBtn.classList.add('header-active-button');
  onWatchedMarkup();
}

function onWatchedMarkup() {
  const filmsFromLocalStorage = JSON.parse(localStorage.getItem('watched'));
  if (filmsFromLocalStorage) {
    topMoviesMarkUp(filmsFromLocalStorage);
  } else {
    const placeholder = document.querySelector('.placeholder');
    placeholder.style.display = 'block';
    refs.list.innerHTML = '';
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

  const placeholder = document.querySelector('.placeholder');
  if (isLocalStorageItemEmpty('watched')) {
    placeholder.style.display = 'block';
  } else {
    placeholder.style.display = 'none';
  }

  //Make footer sticky
  makeFooterBottom();
}

function getGenrs(genres) {
  return genres.map(genre => {
    return genre.name;
  });
}

function isLocalStorageItemEmpty(localStorageKey) {
  if (!localStorage.getItem(localStorageKey)) {
    return true;
  }

  return JSON.parse(localStorage.getItem(localStorageKey)).length === 0;
}

//Rerender after delete movie
const btnAddToWatch = document.querySelector('.wached');
btnAddToWatch.addEventListener('click', e => {
  setTimeout(() => onWatchedMarkup(), 100); //Dirty hack due to late work with localstorage
});

//Make footer down if window size changed
window.addEventListener('resize', function(event){
  makeFooterBottom();
});

function makeFooterBottom() {
  const offsetHeight = document.querySelector('body').offsetHeight;   
  const screenHeight = screen.height;

  const footer = document.querySelector("footer");

  if (offsetHeight < screenHeight) {
    //We should make footer sticky
    footer.style.position = "fixed";
    footer.style.bottom = "0";
    footer.style.left = "0";
    footer.style.right = "0";
  } else {
    //Footer it's ok, shouldn't fix it
    footer.style.position = "";
    footer.style.bottom = "";
    footer.style.left = "";
    footer.style.right = "";
  }
}