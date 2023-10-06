function initializeCarousel(carouselContainerId, prevButtonId, nextButtonId, slideSelector) {
    const carouselContainer = document.getElementById(carouselContainerId);
    const prevButton = document.getElementById(prevButtonId);
    const nextButton = document.getElementById(nextButtonId);
    const slides = carouselContainer.querySelectorAll(slideSelector);
    let currentIndex = 0;

    // Función para habilitar o deshabilitar botones según la posición del slide
    function updateButtons() {
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === slides.length - 1;
    }

    // Inicializar botones al cargar la página
    updateButtons();

    nextButton.addEventListener("click", function () {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Vuelve a la primera imagen si estás en la última
        }
        updateCarousel();
        updateButtons(); // Actualiza el estado de los botones
    });

    prevButton.addEventListener("click", function () {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = slides.length - 1;
        }
        updateCarousel();
        updateButtons(); // Actualiza el estado de los botones
    });

    function updateCarousel() {
        const slideWidth = slides[currentIndex].offsetWidth;
        carouselContainer.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    }
}

// Llama a la función para inicializar el carrusel específico
initializeCarousel("carrouselContainerBest", "prevButtonBest", "nextButtonBest", ".carrousel-slide-best");
initializeCarousel("carrouselContainerCategories", "prevButtonCategories", "nextButtonCategories", ".carrousel-slide-categories");
initializeCarousel("carrouselContainerRecommended", "prevButtonRecommended", "nextButtonRecommended", ".carrousel-slide-recommended");
initializeCarousel("carrouselContainerPopulars", "prevButtonPopulars", "nextButtonPopulars", ".carrousel-slide-populars");

