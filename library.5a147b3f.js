!function(){document.querySelector(".wached");const e=document.querySelector(".queue");let t=[];e.addEventListener("click",(o=>{(async function(e){return await fetch(`https://api.themoviedb.org/3//movie/${e}?api_key=7fea517bd5b294dd7a1b57e94e2c1c68&language=en-US`).then((e=>{if(!e.ok)throw new Error(e.status);return e.json()})).then((e=>e))})(o.target.closest(".modal__card-content").getAttribute("data-id")).then((o=>{localStorage.getItem("queue")&&(t=JSON.parse(localStorage.getItem("queue")));let a=!1;for(let e of t)if(e.id===o.id){a=!0;break}a?(!function(e){const t=JSON.parse(localStorage.getItem("queue")).filter((t=>t.id!==e));localStorage.setItem("queue",JSON.stringify(t))}(o.id),e.textContent="add to queue"):(t.push(o),localStorage.setItem("queue",JSON.stringify(t)),e.textContent="remove from queue")}))}))}();
//# sourceMappingURL=library.5a147b3f.js.map
