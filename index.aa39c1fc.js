function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},i=t.parcelRequired7c6;null==i&&((i=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var i={id:e,exports:{}};return n[e]=i,t.call(i.exports,i,i.exports),i.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){r[e]=t},t.parcelRequired7c6=i);var o,a=i("kKeZA"),u=/^\s+|\s+$/g,s=/^[-+]0x[0-9a-f]+$/i,c=/^0b[01]+$/i,l=/^0o[0-7]+$/i,f=parseInt,d="object"==typeof t&&t&&t.Object===Object&&t,p="object"==typeof self&&self&&self.Object===Object&&self,v=d||p||Function("return this")(),m=Object.prototype.toString,_=Math.max,h=Math.min,y=function(){return v.Date.now()};function g(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function b(e){if("number"==typeof e)return e;if(function(e){return"symbol"==typeof e||function(e){return!!e&&"object"==typeof e}(e)&&"[object Symbol]"==m.call(e)}(e))return NaN;if(g(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=g(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(u,"");var n=c.test(e);return n||l.test(e)?f(e.slice(2),n?2:8):s.test(e)?NaN:+e}o=function(e,t,n){var r,i,o,a,u,s,c=0,l=!1,f=!1,d=!0;if("function"!=typeof e)throw new TypeError("Expected a function");function p(t){var n=r,o=i;return r=i=void 0,c=t,a=e.apply(o,n)}function v(e){return c=e,u=setTimeout(j,t),l?p(e):a}function m(e){var n=e-s;return void 0===s||n>=t||n<0||f&&e-c>=o}function j(){var e=y();if(m(e))return $(e);u=setTimeout(j,function(e){var n=t-(e-s);return f?h(n,o-(e-c)):n}(e))}function $(e){return u=void 0,d&&r?p(e):(r=i=void 0,a)}function w(){var e=y(),n=m(e);if(r=arguments,i=this,s=e,n){if(void 0===u)return v(s);if(f)return u=setTimeout(j,t),p(s)}return void 0===u&&(u=setTimeout(j,t)),a}return t=b(t)||0,g(n)&&(l=!!n.leading,o=(f="maxWait"in n)?_(b(n.maxWait)||0,t):o,d="trailing"in n?!!n.trailing:d),w.cancel=function(){void 0!==u&&clearTimeout(u),c=0,r=s=i=u=void 0},w.flush=function(){return void 0===u?a:$(y())},w};const j=new(0,a.default),$={list:document.querySelector(".movie-collection"),formEl:document.querySelector("#search-form"),inputEl:document.querySelector(".search__input")};$.inputEl.addEventListener("input",e(o)((function(e){e.preventDefault(),function(){const e=document.querySelector(".search__error-message");e&&e.classList.contains("active")&&e.classList.remove("active")}();const t=e.target.value.trim();j.searchMovieByKeyword(t).then((e=>{0!==e.results.length?j.fetchGenr().then((t=>{var n,r;n=e.results,r=t.genres,$.list.innerHTML=n.map((e=>{let t=function(e,t){return e.map((e=>t.find((t=>t.id===e)).name))}(e.genre_ids,r);return`<li class="movies__item" data-id=${e.id}>\n    <a href="" class="movies__link">\n        <img src='https://image.tmdb.org/t/p/original${e.poster_path}' class="movie__image" alt="Movie">\n        <div class="movie__text-part">\n            <h2 class="movie__title">${e.title}</h2>\n            <p class="movie__genre">${function(e){return 0===e.length?"":e.length>2?`${e[0]}, ${e[1]}, Other`:`${[...e].join(", ")}`}(t)} <span class="stick">|</span> \n                <span class="movie__year">${n=e.release_date,n?n.slice(0,4):""}</span></p>\n        </div>\n    </a>\n</li>`;var n})).join("")})):document.querySelector(".search__error-message").classList.add("active")}))}),1200));
//# sourceMappingURL=index.aa39c1fc.js.map
