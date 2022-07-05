import TopMovies from './work-with-api';

const refs = {
  list: document.querySelector('.movie-collection'),
};

const topList = new TopMovies();
topList.fetchMovies().then(movies => {
  topList.fetchGenr().then(generlist => {
    topMoviesMarkUp(movies.results, generlist.genres);
  });
});

function topMoviesMarkUp(movies, genres) {
  refs.list.innerHTML = movies
    .map(movie => {
      let movie_g = getGenrs(movie.genre_ids, genres);
      if (movie_g.length > 2) {
        movie_g = [movie_g[0], movie_g[1], 'Other'];
      }
      return `<li class="movies__item">
    <a href="" class="movies__link modal__open">
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
