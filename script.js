/* script.js */
document.addEventListener('DOMContentLoaded', () => {
    // Desplazamiento suave manual (bypasea la restricción de animaciones de Windows)
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const navbarHeight = document.querySelector('header').offsetHeight;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const startPosition = window.pageYOffset;
                const targetPosition = elementPosition + startPosition - navbarHeight;
                const distance = targetPosition - startPosition;
                const duration = 600; // Duración de la animación en milisegundos
                let startTime = null;

                function animation(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) {
                        requestAnimationFrame(animation);
                    }
                }

                // Función de aceleración suave (Easing)
                function easeInOutQuad(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                }

                requestAnimationFrame(animation);
            }
        });
    });

    // Lógica del Slider Automático (5 segundos) y manual
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