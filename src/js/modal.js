const btns = document.querySelector('.movie-collection');
const modalOverlay = document.querySelector('.modal__card-overlay');
const modalCard = document.querySelector('.modal__card-content');
let closeBtn = null;

btns.addEventListener('click', showModal);
async function showModal(e) {
  e.preventDefault();
  if (e.target !== btns) {
    modalOverlay.classList.add('modal__card-overlay--active');
    modalCard.classList.add('modal__card--active');
    closeModal();
  }
  closeBtn = document.querySelector('.modal__close');
  modalOverlay.classList.add('modal__card-overlay--active');
  modalCard.classList.add('modal__card--active');
  closeBtn.addEventListener('click', closeByBtn);
  modalOverlay.addEventListener('click', closeByOverlay);
  window.addEventListener('keydown', closeByWindow);
}

// let path = e.currentTarget.getAttribute('data-path');
// modalCard.classList.remove('modal__card--active');
// document.querySelector(`[data-target="${path}"]`).classList.add('modal__card--active');
// modalOverlay.classList.add('modal__card-overlay--active');

function closeModal() {
  closeBtn.addEventListener('click', closeByBtn);
  modalOverlay.addEventListener('click', closeByOverlay);
  window.addEventListener('keydown', closeByWindow);
}

function closeByOverlay(e) {
  if (e.target === modalOverlay) {
    modalOverlay.removeEventListener('click', closeByOverlay);
    modalOverlay.classList.remove('modal__card-overlay--active');
    modalCard.classList.remove('modal__card--active');
  }
}

function closeByBtn(e) {
  if (e.target === closeBtn) {
    closeBtn.removeEventListener('click', closeByBtn);
    modalOverlay.classList.remove('modal__card-overlay--active');
    modalCard.classList.remove('modal__card--active');
  }
}

function closeByWindow(e) {
  if (e.keyCode === 27) {
    window.removeEventListener('keydown', closeByWindow);
    modalOverlay.classList.remove('modal__card-overlay--active');
    modalCard.classList.remove('modal__card--active');
  }
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

function checkGenreList(genres) {
  if (genres.length === 0) {
    return '';
  } else if (genres.length > 2) {
    return `${genres[0].name}, ${genres[1].name}, Other`;
  } else {
    return `${[genres.map(genre => genre.name)].join(', ')}`;
  }
}
