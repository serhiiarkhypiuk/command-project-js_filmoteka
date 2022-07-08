import TopMovies from './work-with-api';

const refs = {
  list: document.querySelector('.movie-collection'),
  pagination: document.querySelector('#tui-pagination-container'),
};

const topList = new TopMovies();


getMovies();

refs.pagination.addEventListener('click', changePage);

function getMovies() {
  refs.list.innerHTML = '<div class="loader"></div>';
  topList.fetchMovies().then(movies => {
    topList.fetchGenr().then(generlist => {
      topMoviesMarkUp(movies.results, generlist.genres);
    });
  });
}



function topMoviesMarkUp(movies, genres) {
  refs.list.innerHTML = movies
    .map(movie => {
      let movie_g = getGenrs(movie.genre_ids, genres);
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
function getGenrs(genresID, genres) {
  return genresID.map(id => {
    return genres.find(genre => genre.id === id).name;
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
