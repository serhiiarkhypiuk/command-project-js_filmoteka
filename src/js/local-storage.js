
const queueBtn = document.querySelector("#btn-queue")
const btns = document.querySelector('.movie-collection');

btns.addEventListener('click', showModal);
queueBtn.addEventListener("click", setDataStorage)
async function showModal(e) {
    e.preventDefault();
    if (e.target !== btns) {
        // console.log(e.target.closest('.movies__item'));
        const movieId = e.target.closest('.movies__item').dataset.id;            
            
            await fetchMovieDetails(movieId).then(data => {
                const {
                    original_title,
                    vote_average,
                    vote_count,
                    poster_path,
                    popularity,
                    genres,
                    overview,
                } = data;
                // console.log(data);           
                localStorage.setItem("data", JSON.stringify(data))                   
                
            })
        
        }
    }          


function setDataStorage() {
    const dataStorage = JSON.parse(localStorage.getItem("data"))
    console.log(dataStorage);
    let array = []
    array.push(dataStorage)
    console.log(array);
    localStorage.setItem('queue', JSON.stringify(array))
    localStorage.removeItem("data")
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
}