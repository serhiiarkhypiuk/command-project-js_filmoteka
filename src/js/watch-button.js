import TopMovies from './work-with-api.js';


const refs = {
    watchBtn: document.querySelector('.header_btn-watched'),
    list: document.querySelector('.movie-collection'),
};

topMovies = new TopMovies();

let watchedMovies = [];

refs.list.addEventListener('click', (e) => {
  e.preventDefault();
  const isCardMovie = e.target.closest('.movies__item');
  const movId = parseInt(isCardMovie.id);

  if (isCardMovie) {
    topMovies.fetchMovies()
      .then(movie => {
        movie.results.map(it => {
          if (movId === it.id) {
            watchedMovies.push(it)
            localStorage.setItem('watched', JSON.stringify(watchedMovies))
          }
        })
    })
  }
});

const obj = JSON.parse(localStorage.getItem('watched'));

function renderObj(movie) {
 return  movie.map(it => {
      return `<li class="movies__item">
    <a href="" class="movies__link">
        <img src='https://image.tmdb.org/t/p/original${
          it.poster_path
        }' class="movie__image" alt="Movie">
        <div class="movie__text-part">
            <h2 class="movie__title">${it.title}</h2>
        </div>
    </a>
</li>`
  }).join('')

};

refs.list.insertAdjacentHTML('beforeend', renderObj(obj))








