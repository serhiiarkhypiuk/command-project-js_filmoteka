import Notiflix from 'notiflix';

export default class TopMovies {
  constructor() {
    this.page = 1;
  }
  async fetchMovies() {
    try {
      return await fetch(
        `https://api.themoviedb.org/3/trending/all/day?api_key=7fea517bd5b294dd7a1b57e94e2c1c68&language=en-US&page=${this.page}`
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
      'https://api.themoviedb.org/3/genre/movie/list?api_key=7fea517bd5b294dd7a1b57e94e2c1c68&language=en-US&page=2'
    )
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(geners => {
        localStorage.setItem('genres', JSON.stringify(geners.genres));
      });
  }
  async searchMovieByKeyword(str) {
    return await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=7fea517bd5b294dd7a1b57e94e2c1c68&language=en-US&page=1&query=${str}`
    )
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(movies => {
        return movies;
      });
  }

  cengePage(newPage) {
    this.page = newPage;
  }

  resetPage() {
    this.page = 1;
  }
  nextPage() {
    this.page += 1;
  }
  prePage() {
    this.page -= 1;
  }
  lastPage() {
    this.page = 20;
  }
  preElip() {
    if (this.page > 18) {
      this.page = 15;
    } else {
      this.page -= 3;
    }
  }
  nextElip() {
    if (this.page < 3) {
      this.page = 6;
    } else {
      this.page += 3;
    }
  }
}
