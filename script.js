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

/* ==== LIGHTBOX FUNCTION (PROJECT-SPECIFIC + SINGLE IMAGE SUPPORT) ==== */
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('.lightbox-img');
const closeBtn = lightbox.querySelector('.close');
const arrows = lightbox.querySelectorAll('.lightbox-arrow');

let currentImages = [];
let currentIndex = 0;

// For every image that can open the lightbox
document.querySelectorAll('.lightbox-trigger').forEach(img => {
  img.addEventListener('click', () => {
    const project = img.closest('.project');
    
    if (project) {
      // Get all images inside that project
      currentImages = Array.from(project.querySelectorAll('.lightbox-trigger'));
      currentIndex = currentImages.indexOf(img);

      // ✅ Show arrows (since project has multiple images)
      arrows.forEach(a => a.style.display = currentImages.length > 1 ? 'block' : 'none');
    } else {
      // Resume or single image case
      currentImages = [img];
      currentIndex = 0;

      // 🚫 Hide arrows
      arrows.forEach(a => a.style.display = 'none');
    }

    // Show image
    lightboxImg.src = img.src;
    lightbox.style.display = 'flex';
  });
});

// Close button
closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

// Navigate left/right within the same project
arrows.forEach(arrow => {
  arrow.addEventListener('click', () => {
    if (currentImages.length <= 1) return;

    if (arrow.classList.contains('left')) {
      currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    } else {
      currentIndex = (currentIndex + 1) % currentImages.length;
    }

    lightboxImg.src = currentImages[currentIndex].src;
  });
});
