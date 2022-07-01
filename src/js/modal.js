
const btns = document.querySelectorAll('.modal__btn');
const modalOverlay = document.querySelector('.modal__card-overlay');
const modalCard = document.querySelector('.modal__card');
const closeBtn = document.querySelector('.modal__close');

openModal();
closeModal();


function openModal() {
    btns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            let path = e.currentTarget.getAttribute('data-path');

            modalCard.classList.remove('modal__card--active');
            document.querySelector(`[data-target="${path}"]`).classList.add('modal__card--active');
            modalOverlay.classList.add('modal__card-overlay--active');
        });
    });
    removeEventListener(`click`, openModal)
    
}

function closeModal() {
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('modal__card-overlay--active');
            modalCard.classList.remove('modal__card--active');
        }
    
    });
    closeBtn.addEventListener('click', (e) => {
        if (e.target === closeBtn) {
            modalOverlay.classList.remove('modal__card-overlay--active');
            modalCard.classList.remove('modal__card--active');
           
            console.log('close');
        } 

    });
    window.addEventListener('keydown', (e) => {
        if (e.keyCode === 27) {
            modalOverlay.classList.remove('modal__card-overlay--active');
            modalCard.classList.remove('modal__card--active');
        }
    });


}





  