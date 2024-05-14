document.addEventListener('DOMContentLoaded', function() {
    // Initialize each slider
    document.querySelectorAll('.slider').forEach(slider => {
        const slides = slider.querySelectorAll('.slides img');
        if (slides.length === 0) return; // Skip initializing this slider if no images are present

        let slideIndex = 0; // Track the current slide index for this slider

        // Show the first slide
        slides[slideIndex].classList.add('displaySlide');

        // Function to show a specific slide in the section
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('displaySlide'));
            slideIndex = (index + slides.length) % slides.length;
            slides[slideIndex].classList.add('displaySlide');
        }

        // Attach events to buttons within this section
        const prevButton = slider.querySelector('.prev');
        const nextButton = slider.querySelector('.next');

        if (prevButton) {
            prevButton.addEventListener('click', () => showSlide(slideIndex - 1));
        }
        if (nextButton) {
            nextButton.addEventListener('click', () => showSlide(slideIndex + 1));
        }
    });
});
