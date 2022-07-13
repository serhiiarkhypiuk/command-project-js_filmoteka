import TopMovies from './work-with-api';
import { createPagination } from './pagination';

const refs = {
  list: document.querySelector('.movie-collection'),
  pagination: document.querySelector('#tui-pagination-container'),
  form: document.querySelector('#search-form'),
};

const topList = new TopMovies();
topList.fetchGenr();

getMovies();

refs.pagination.addEventListener('click', changePage);
refs.form.addEventListener('submit', () => {
  refs.pagination.removeEventListener('click', changePage);
});

async function getMovies() {
  refs.list.innerHTML = '<div class="loader"></div>';
  topList.fetchMovies().then(movies => {
    topList.endPage = movies.total_pages;
    topMoviesMarkUp(movies.results);
  });
}

function topMoviesMarkUp(movies) {
  refs.list.innerHTML = [...movies]
    .map(movie => {
      let movie_g = [];
      if (movie.genre_ids) {
        movie_g = getGenrs(
          movie.genre_ids,
          JSON.parse(localStorage.getItem('genres'))
        );
      }
      if (movie_g.length > 2) {
        movie_g = [movie_g[0], movie_g[1], 'Other'];
      }
      return `<li class="movies__item" id="${movie.id}" data-id=${movie.id}>
    <a href="" class="movies__link">
        <img src='https://image.tmdb.org/t/p/original${
          movie.poster_path
        }' class="movie__image" alt="Movie">
        <div class="movie__text-part">
            <h2 class="movie__title">${movie.title || movie.name}</h2>
            <p class="movie__genre">${movie_g.join(
              ', '
            )} <span class="stick">|</span> 
                <span class="movie__year">${(
                  movie.release_date ||
                  movie.first_air_date ||
                  ''
                ).slice(0, 4)}</span></p>
        </div>
    </a>
</li>`;
    })
    .join('');
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
function changePage(event) {
  if (event.target === refs.pagination) {
    return;
  }
  if (event.target.classList.contains('tui-ico-first')) {
    topList.resetPage();
    getMovies();
  }
  if (event.target.classList.contains('tui-ico-last')) {
    topList.lastPage();
    getMovies();
  }
  if (
    event.target.classList.contains('tui-page-btn') &&
    !event.target.classList.contains('tui-next-is-ellip') &&
    !event.target.classList.contains('tui-prev-is-ellip')
  ) {
    topList.cengePage(Number(event.target.textContent));
    getMovies();
  }
  if (event.target.classList.contains('tui-ico-next')) {
    topList.nextPage();
    getMovies();
  }
  if (event.target.classList.contains('tui-ico-prev')) {
    topList.prePage();
    getMovies();
  }
  if (event.target.classList.contains('tui-next-is-ellip')) {
    topList.nextElip();
    getMovies();
  }
  if (event.target.classList.contains('tui-prev-is-ellip')) {
    topList.preElip();
    getMovies();
  }

  if (event.target.classList.contains('tui-ico-ellip')) {
    if (event.target.parentElement.classList.contains('tui-next-is-ellip')) {
      topList.nextElip();
      getMovies();
    }
    if (event.target.parentElement.classList.contains('tui-prev-is-ellip')) {
      topList.preElip();
      getMovies();
    }
  }
}
