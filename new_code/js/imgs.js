document.addEventListener('DOMContentLoaded', function() {
    // Initialize each slider
    document.querySelectorAll('.slider').forEach(slider => {
        const slides = slider.querySelectorAll('.slides img');
        let slideIndex = 0; // Track the current slide index for this slider

        // Show the first slide
        if (slides.length > 0) {
            slides[slideIndex].classList.add('displaySlide');
        }

        // Function to show the slide based on index
        function showSlide(index) {
            // Remove current display
            slides[slideIndex].classList.remove('displaySlide');

            // Update index respecting boundaries
            slideIndex = (index + slides.length) % slides.length;

            // Show the new slide
            slides[slideIndex].classList.add('displaySlide');
        }

        // Attach event listeners to buttons
        slider.querySelector('.prev').addEventListener('click', () => showSlide(slideIndex - 1));
        slider.querySelector('.next').addEventListener('click', () => showSlide(slideIndex + 1));
    });
});


