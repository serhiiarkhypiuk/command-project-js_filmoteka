!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},o=e.parcelRequired7c6;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in n){var o=n[e];delete n[e];var r={id:e,exports:{}};return t[e]=r,o.call(r.exports,r,r.exports),r.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){n[e]=t},e.parcelRequired7c6=o);var r=o("aRcm3");r=o("aRcm3");const a=document.querySelector(".modal__active-btn");new(0,r.default);let i=[];a.addEventListener("click",(e=>{(async function(e){return await fetch(`https://api.themoviedb.org/3//movie/${e}?api_key=7fea517bd5b294dd7a1b57e94e2c1c68&language=en-US`).then((e=>{if(!e.ok)throw new Error(e.status);return e.json()})).then((e=>e))})(e.target.closest(".modal__card-content").getAttribute("data-id")).then((e=>{localStorage.getItem("watched")&&(i=JSON.parse(localStorage.getItem("watched")));let t=!1;for(let n of i)if(n.id===e.id){t=!0;break}t||(i.push(e),localStorage.setItem("watched",JSON.stringify(i)))}))}))}();
//# sourceMappingURL=index.93d3c7fa.js.map
