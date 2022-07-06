import TopMovies from './work-with-api';
import debounce from 'lodash.debounce';

const movies = new TopMovies();

const refs = {
  list: document.querySelector('.movie-collection'),
  formEl: document.querySelector('#search-form'),
  inputEl: document.querySelector('.search__input'),
};

refs.inputEl.addEventListener('input', debounce(moviesByKeyword, 1200));

function moviesByKeyword(e) {
  e.preventDefault();
  removeErrorMessage();
  const keyword = e.target.value.trim();

  movies.searchMovieByKeyword(keyword).then(moviesList => {
    if (moviesList.results.length === 0) {
      showErrorMessage();
      return;
    }
    movies.fetchGenr().then(generlist => {
      moviesByKeywordMarkUp(moviesList.results, generlist.genres);
    });
  });
}

function moviesByKeywordMarkUp(movies, genres) {
  refs.list.innerHTML = movies
    .map(movie => {
      let movie_g = getGenrs(movie.genre_ids, genres);

      return `<li class="movies__item">
    <a href="" class="movies__link">
        <img src='https://image.tmdb.org/t/p/original${
          movie.poster_path
        }' class="movie__image" alt="Movie">
        <div class="movie__text-part">
            <h2 class="movie__title">${movie.title}</h2>
            <p class="movie__genre">${checkGenreList(
              movie_g
            )} <span class="stick">|</span> 
                <span class="movie__year">${checkReleaseDate(
                  movie.release_date
                )}</span></p>
        </div>
    </a>
</li>`;
    })
    .join('');
}

function checkGenreList(genres) {
  if (genres.length === 0) {
    return '';
  } else if (genres.length > 2) {
    return `${genres[0]}, ${genres[1]}, Other`;
  } else {
    return `${[...genres].join(', ')}`;
  }
}

function checkReleaseDate(date) {
  if (date) {
    return date.slice(0, 4);
  } else {
    return '';
  }
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
