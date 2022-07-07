import TopMovies from './work-with-api.js';

const refs = {
    watchedBtn: document.querySelector('.header_btn-watched'),
    list: document.querySelector('.movie-collection'),
    addToWatchedBtn: document.querySelector('.modal__btn-add'),
};

topMoviesList = new TopMovies();


const filmsFromLocalStorage = JSON.parse(localStorage.getItem('watched'));

refs.watchedBtn.addEventListener('click', onWatchedBtnClick);

function onWatchedBtnClick() {
  topMoviesList.fetchGenr()
    .then(genre => {
      topMoviesMarkUp(filmsFromLocalStorage, genre.genres)
  })
}

function topMoviesMarkUp(movies, genres) {
  refs.list.innerHTML = movies
    .map(movie => {
      let movie_g = getGenrs(movie.genre_ids, genres);
      if (movie_g.length > 2) {
        movie_g = [movie_g[0], movie_g[1], 'Other'];
      }
      return `<li class="movies__item" id="${movie.id}">
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


function getGenrs(genresID, genres) {
  return genresID.map(id => {
    return genres.find(genre => genre.id === id).name;
  });
}


