
const queueBtn = document.querySelector(".queue")
const btns = document.querySelector('.movie-collection');

queueBtn.addEventListener("click", setDataStorage);

function setDataStorage(e) {
    let array = [];
const isCardMovie = e.target.closest('.modal__card-content');
    const movId = isCardMovie.getAttribute('data-id');
    
  fetchMovieDetails(movId).then(movie => {
    if (localStorage.getItem('queue')) { 
      array = JSON.parse(localStorage.getItem('queue')); 
    }
    array.push(movie);
    localStorage.setItem('queue', JSON.stringify(array));
  });
}

async function fetchMovieDetails(id) {
  return await fetch(
    `https://api.themoviedb.org/3//movie/${id}?api_key=7fea517bd5b294dd7a1b57e94e2c1c68&language=en-US`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      return data;
    });
};