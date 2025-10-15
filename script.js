/* ==== CAROUSEL FUNCTION ==== */
const carousels = document.querySelectorAll('.carousel');

carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const imgs = Array.from(track.children);
    const nextBtn = carousel.querySelector('.carousel-btn.right');
    const prevBtn = carousel.querySelector('.carousel-btn.left');
    let index = 0;

    function updateCarousel() {
        const width = imgs[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${index * width}px)`;
    }

    nextBtn.addEventListener('click', () => {
        index = (index + 1) % imgs.length;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        index = (index - 1 + imgs.length) % imgs.length;
        updateCarousel();
    });

    window.addEventListener('resize', updateCarousel);
});

/* ==== LIGHTBOX FUNCTION ==== */
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('.lightbox-img');
const closeBtn = lightbox.querySelector('.close');
const arrows = lightbox.querySelectorAll('.lightbox-arrow');

document.querySelectorAll('.lightbox-trigger').forEach(img => {
    img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.style.display = 'flex';
    });
});

closeBtn.addEventListener('click', () => lightbox.style.display = 'none');

arrows.forEach(arrow => {
    arrow.addEventListener('click', () => {
        const imgs = Array.from(document.querySelectorAll('.lightbox-trigger'));
        let currentIndex = imgs.findIndex(i => i.src === lightboxImg.src);
        if(arrow.classList.contains('left')) {
            currentIndex = (currentIndex - 1 + imgs.length) % imgs.length;
        } else {
            currentIndex = (currentIndex + 1) % imgs.length;
        }
        lightboxImg.src = imgs[currentIndex].src;
    });
});
