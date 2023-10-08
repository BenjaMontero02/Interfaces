function initializeCarousel(carouselContainerId, prevButtonId, nextButtonId, cardCount) {
    const carousel = document.getElementById(carouselContainerId);
    const prevButton = document.getElementById(prevButtonId);
    const nextButton = document.getElementById(nextButtonId);
    const totalCards = carousel.querySelectorAll('.card').length;

    let currentIndex = 0;
    let cardWidth = 100 / cardCount; // Ancho de una tarjeta en porcentaje

    function showSlide(index) {
        const translateX = -index * cardWidth;
        carousel.style.transform = `translateX(${translateX}%)`;
    }

    showSlide(currentIndex);

    // Avanzar al siguiente slide
    function nextSlide() {
        currentIndex++;
        showSlide(currentIndex);
    }

    // Retroceder al slide anterior
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            showSlide(currentIndex);
        }
    }

    // Función para habilitar o deshabilitar los botones según la posición del carrusel
    function updateButtonState() {
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex + cardCount >= totalCards;
    }


    // Actualizar el estado de los botones al iniciar el carrusel
    updateButtonState();

    prevButton.addEventListener('click', () => {
        prevSlide();
        updateButtonState();
    });

    nextButton.addEventListener('click', () => {
        nextSlide();
        updateButtonState();
    });

    // Media query para ajustar el comportamiento en mobile
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    function handleMobileMediaQuery(e) {
        if (e.matches) {
            cardCount = 1;
            cardWidth = 100 / cardCount; // Ancho de una tarjeta en porcentaje en mobile
            currentIndex = 0; // Reinicia el índice
        } else {
            cardCount = cardCount;
            cardWidth = 100 / cardCount; // Ancho de una tarjeta en porcentaje en desktop
            currentIndex = 0;
        }
        showSlide(currentIndex);
        updateButtonState();
    }

    mediaQuery.addEventListener('change', handleMobileMediaQuery);
    handleMobileMediaQuery(mediaQuery);
}

// Llama a la función para inicializar el carrusel específico
initializeCarousel("carrouselContainerBest", "prevButtonBest", "nextButtonBest", 4);
initializeCarousel("carrouselContainerCategories", "prevButtonCategories", "nextButtonCategories", 3);
initializeCarousel("carrouselContainerRecommended", "prevButtonRecommended", "nextButtonRecommended", 3);
initializeCarousel("carrouselContainerPopulars", "prevButtonPopulars", "nextButtonPopulars", 3);