import TopMovies from './work-with-api';

const movies = new TopMovies();

const refs = {
  list: document.querySelector('.movie-collection'),
  formEl: document.querySelector('#search-form'),
};

refs.formEl.addEventListener('submit', moviesByKeyword);

function moviesByKeyword(e) {
  e.preventDefault();
  removeErrorMessage();
  const keyword = refs.formEl.elements.search.value.trim();

  movies.searchMovieByKeyword(keyword).then(moviesList => {
    if (moviesList.results.length === 0) {
      showErrorMessage();
      return;
    }
    movies.fetchGenr().then(generlist => {
      moviesByKeywordMarkUp(moviesList.results, generlist.genres);
    });

    console.log(moviesList);
  });
}

function moviesByKeywordMarkUp(movies, genres) {
  refs.list.innerHTML = movies
    .map(movie => {
      let movie_g = getGenrs(movie.genre_ids, genres);
      if (movie_g.length > 2) {
        movie_g = [movie_g[0], movie_g[1], 'Other'];
      }
      return `<li class="movies__item">
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

function showErrorMessage() {
  const errorEl = document.querySelector('.search__error-message');
  errorEl.classList.add('active');
}

function removeErrorMessage() {
  const errorEl = document.querySelector('.search__error-message');
  if (errorEl && errorEl.classList.contains('active')) {
    errorEl.classList.remove('active');
  }
}
