/* script.js */
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Lógica del Slider Automático (10 segundos) y manual
    const sliderTrack = document.getElementById('sliderTrack');
    const slides = document.querySelectorAll('.slider-slide');
    const slidePrev = document.getElementById('slidePrev');
    const slideNext = document.getElementById('slideNext');
    let currentSlide = 0;
    const totalSlides = slides.length;

    function updateSlider() {
        sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    }

    if (slideNext) {
        slideNext.addEventListener('click', () => {
            nextSlide();
            resetTimer();
        });
    }

    if (slidePrev) {
        slidePrev.addEventListener('click', () => {
            prevSlide();
            resetTimer();
        });
    }

    // Intervalo automático cada 10 segundos (10000 ms)
    let slideInterval = setInterval(nextSlide, 5000);

    function resetTimer() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Lógica del Lightbox (Ampliación de imágenes)
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const btnPrev = document.getElementById('lightbox-prev');
    const btnNext = document.getElementById('lightbox-next');
    const sliderImages = document.querySelectorAll('.slider-slide img');

    let lightboxIndex = 0;

    function showLightboxImage(index) {
        if (index < 0) {
            lightboxIndex = sliderImages.length - 1;
        } else if (index >= sliderImages.length) {
            lightboxIndex = 0;
        } else {
            lightboxIndex = index;
        }
        lightboxImg.src = sliderImages[lightboxIndex].src;
    }

    sliderImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            lightbox.style.display = 'flex';
            showLightboxImage(index);
        });
    });

    if (btnNext) {
        btnNext.addEventListener('click', (e) => {
            e.stopPropagation();
            showLightboxImage(lightboxIndex + 1);
        });
    }

    if (btnPrev) {
        btnPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            showLightboxImage(lightboxIndex - 1);
        });
    }

    const closeLightbox = () => {
        lightbox.style.display = 'none';
    };

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Controles de teclado y táctiles dentro del visor ampliado
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchEndX < touchStartX - 50) {
            showLightboxImage(lightboxIndex + 1);
        }
        if (touchEndX > touchStartX + 50) {
            showLightboxImage(lightboxIndex - 1);
        }
    }, false);

    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'ArrowRight') {
                showLightboxImage(lightboxIndex + 1);
            } else if (e.key === 'ArrowLeft') {
                showLightboxImage(lightboxIndex - 1);
            } else if (e.key === 'Escape') {
                closeLightbox();
            }
        }
    });
});