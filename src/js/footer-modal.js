const refs = {
    openModalLink: document.querySelector('[data-open-modal]'),
    backdrop: document.querySelector('.backdrop'),
};

refs.openModalLink.addEventListener('click', openModal);
refs.backdrop.addEventListener('click',closeModal );

function openModal(e) {
    e.preventDefault();
    refs.backdrop.classList.remove('is-hidden');
};

function closeModal(e) {
    if (e.target.classList.contains('backdrop')) {
    refs.backdrop.classList.add('is-hidden');
    }
}


