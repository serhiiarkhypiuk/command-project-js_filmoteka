const queueBtn=document.querySelector(".queue"),btns=document.querySelector(".movie-collection");function setDataStorage(e){let t=[];fetchMovieDetails(e.target.closest(".modal__card-content").getAttribute("data-id")).then((e=>{localStorage.getItem("queue")&&(t=JSON.parse(localStorage.getItem("queue"))),t.push(e),localStorage.setItem("queue",JSON.stringify(t))}))}async function fetchMovieDetails(e){return await fetch(`https://api.themoviedb.org/3//movie/${e}?api_key=7fea517bd5b294dd7a1b57e94e2c1c68&language=en-US`).then((e=>{if(!e.ok)throw new Error(e.status);return e.json()})).then((e=>e))}queueBtn.addEventListener("click",setDataStorage);
//# sourceMappingURL=index.ed0ee1dc.js.map
