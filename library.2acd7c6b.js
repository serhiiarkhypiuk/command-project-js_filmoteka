var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},a=e.parcelRequired7c6;null==a&&((a=function(e){if(e in t)return t[e].exports;if(e in n){var a=n[e];delete n[e];var o={id:e,exports:{}};return t[e]=o,a.call(o.exports,o,o.exports),o.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){n[e]=t},e.parcelRequired7c6=a);var o=a("kKeZA");const i={watchedBtn:document.querySelector(".header_btn-watched"),queueBtn:document.querySelector(".header_btn-queue"),list:document.querySelector(".movie-collection")};new(0,o.default);function l(){const e=JSON.parse(localStorage.getItem("queue"));e&&function(e){i.list.innerHTML=e.map((e=>{let t=JSON.parse(localStorage.getItem("genres")).map((e=>e.name));return t.length>2&&(t=[t[0],t[1],"Other"]),`<li class="movies__item" id="${e.id}" data-id=${e.id}>\n    <a href="" class="movies__link">\n        <img src='https://image.tmdb.org/t/p/original${e.poster_path}' class="movie__image" alt="Movie">\n        <div class="movie__text-part">\n            <h2 class="movie__title">${e.title}</h2>\n            <p class="movie__genre">${t.join(", ")} <span class="stick">|</span> \n                <span class="movie__year">${e.release_date.slice(0,4)}</span></p>\n        </div>\n    </a>\n</li>`})).join("");const t=document.querySelector(".placeholder");n="queue",localStorage.getItem(n)&&0!==JSON.parse(localStorage.getItem(n)).length?t.style.display="none":t.style.display="block";var n}(e)}i.queueBtn.addEventListener("click",(function(){i.watchedBtn.classList.remove("header-active-button"),i.queueBtn.classList.add("header-active-button"),l()}));document.querySelector(".queue").addEventListener("click",(e=>{setTimeout((()=>l()),100)}));
//# sourceMappingURL=library.2acd7c6b.js.map
