import TopMovies from './work-with-api';
import { createPagination } from './pagination';

const movies = new TopMovies();

const refs = {
  list: document.querySelector('.movie-collection'),
  formEl: document.querySelector('#search-form'),
  inputEl: document.querySelector('.search__input'),
  pagination: document.querySelector('#tui-pagination-container'),
};

refs.formEl.addEventListener('submit', moviesByKeyword);

let keyword = null;

function moviesByKeyword(e) {
  e.preventDefault();
  movies.resetPage();
  pagination.movePageTo(movies.page);
  refs.pagination.addEventListener('click', changePageName);
  removeErrorMessage();
  movies.keyword = e.target.elements.search.value.trim();

  fetchMoviesByKeyword();
}

function fetchMoviesByKeyword() {
  movies.searchMovieByKeyword(keyword).then(moviesList => {
    if (moviesList.results.length === 0) {
      showErrorMessage();
      return;
    }
    pagination.setTotalItems(moviesList.total_results);
    movies.endPage = moviesList.total_pages;
    try {
      const genresList = JSON.parse(localStorage.getItem('genres'));
      moviesByKeywordMarkUp(moviesList.results, genresList);
    } catch (error) {
      console.log(error.name);
      console.log(error.message);
    }
  });
}

function getGenrs(genresID, genres) {
  return genresID.map(id => {
    if (genres.find(genre => genre.id === id)) {
      return genres.find(genre => genre.id === id).name;
    } else {
      return 'Self made';
    }
  });
}

function checkImgLink(data) {
  if (data) {
    return `https://image.tmdb.org/t/p/original/${data}`;
  }
  return `https://bflix.biz/no-poster.png`;
}

function moviesByKeywordMarkUp(movies, genres) {
  refs.list.innerHTML = movies
    .map(movie => {
      let movie_g = getGenrs(movie.genre_ids, genres);

      return `<li class="movies__item" data-id=${movie.id}>
    <a href="" class="movies__link">
        <img src='${checkImgLink(movie.poster_path)}
          ' class="movie__image" alt="Movie">
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
    return 'No data';
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
    return 'No data';
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

function changePageName(event) {
  if (event.target === refs.pagination) {
    return;
  }
  if (event.target.classList.contains('tui-ico-first')) {
    movies.resetPage();
    fetchMoviesByKeyword();
  }
  if (event.target.classList.contains('tui-ico-last')) {
    movies.lastPage();
    fetchMoviesByKeyword();
  }
  if (
    event.target.classList.contains('tui-page-btn') &&
    !event.target.classList.contains('tui-next-is-ellip') &&
    !event.target.classList.contains('tui-prev-is-ellip')
  ) {
    movies.cengePage(Number(event.target.textContent));
    fetchMoviesByKeyword();
  }
  if (event.target.classList.contains('tui-ico-next')) {
    movies.nextPage();
    fetchMoviesByKeyword();
  }
  if (event.target.classList.contains('tui-ico-prev')) {
    movies.prePage();
    fetchMoviesByKeyword();
  }
  if (event.target.classList.contains('tui-next-is-ellip')) {
    movies.nextElip();
    fetchMoviesByKeyword();
  }
  if (event.target.classList.contains('tui-prev-is-ellip')) {
    movies.preElip();
    fetchMoviesByKeyword();
  }

  if (event.target.classList.contains('tui-ico-ellip')) {
    if (event.target.parentElement.classList.contains('tui-next-is-ellip')) {
      movies.nextElip();
      fetchMoviesByKeyword();
    }
    if (event.target.parentElement.classList.contains('tui-prev-is-ellip')) {
      movies.preElip();
      fetchMoviesByKeyword();
    }
  }
}
