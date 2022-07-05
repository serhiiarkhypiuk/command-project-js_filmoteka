const queueBtn = document.querySelector("#btn-queue")
console.log(queueBtn);
queueBtn.addEventListener("click", addToQueue)

async function addToQueue() {
    const response = await fetchFilms()
    console.log(response.genres);
    const filmsId = response.genres.map(genres => genres.id)
   
    console.log(filmsId);
    localStorage.setItem("data-queue", JSON.stringify(filmsId))
}

async function fetchFilms() {
   try {
    const results = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=7fea517bd5b294dd7a1b57e94e2c1c68&language=en-US')
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
