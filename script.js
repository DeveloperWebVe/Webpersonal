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

    // Lightbox Avanzado con navegación por mouse y teclado (flechas)
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const btnPrev = document.getElementById('lightbox-prev');
    const btnNext = document.getElementById('lightbox-next');
    const galleryImages = document.querySelectorAll('.about-gallery img');

    let currentIndex = 0;

    function showImage(index) {
        if (index < 0) {
            currentIndex = galleryImages.length - 1;
        } else if (index >= galleryImages.length) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
        lightboxImg.src = galleryImages[currentIndex].src;
    }

    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            lightbox.style.display = 'flex';
            showImage(index);
        });
    });

    if (btnNext) {
        btnNext.addEventListener('click', (e) => {
            e.stopPropagation();
            showImage(currentIndex + 1);
        });
    }

    if (btnPrev) {
        btnPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            showImage(currentIndex - 1);
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

    // Control mediante teclado (Flecha Izquierda y Derecha, Escape)
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'ArrowRight') {
                showImage(currentIndex + 1);
            } else if (e.key === 'ArrowLeft') {
                showImage(currentIndex - 1);
            } else if (e.key === 'Escape') {
                closeLightbox();
            }
        }
    });
});