import Notiflix from 'notiflix';

export default class TopMovies {
  constructor() {
    this.page = 1;
  }
  async fetchMovies() {
    try {
      return await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=7fea517bd5b294dd7a1b57e94e2c1c68&language=en-US&page=${this.page}`
      ).then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      });
    } catch {
      Notiflix.Notify.failure('Sorry, we have API error. Please try again.');
    }
  }
  async fetchGenr() {
    return await fetch(
      'https://api.themoviedb.org/3/genre/movie/list?api_key=7fea517bd5b294dd7a1b57e94e2c1c68&language=en-US'
    )
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(geners => {
        return geners;
      });
  }
}
