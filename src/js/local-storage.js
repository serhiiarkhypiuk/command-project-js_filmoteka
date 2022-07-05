const queueBtn = document.querySelector("#btn-queue")
let pageNumber = 1
console.log(queueBtn);
queueBtn.addEventListener("click", addToQueue)

async function addToQueue() {
    const response = await fetchFilms()
    console.log(response);
    console.log(response.results);
    const filmsTitle = response.results.map(({title}) => title)
   console.log(filmsTitle);
    // console.log(filmsId);
    localStorage.setItem("data-queue", JSON.stringify(filmsTitle))
}

async function fetchFilms() {
   try {
    const results = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=7fea517bd5b294dd7a1b57e94e2c1c68&language=en-US&page=${pageNumber}`)
   const response = await results.json()
   console.log(response);
    return response
   } catch (error) {
    console.log(error);
   }
}

// fetchImages()
// function fetchImages() {
//     return fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=7fea517bd5b294dd7a1b57e94e2c1c68&language=en-US').then(response => {
//         return response.json()
//     })
// }

// fetchImages()
//     .then(response => response.genres.map(genres => console.log(genres.id)))
