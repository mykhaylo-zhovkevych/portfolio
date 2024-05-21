document.addEventListener("DOMContentLoaded", function() {
    function isMobile() {
        return window.innerWidth < 768 || window.innerHeight < 600;
    }

    function toggleOverlay() {
        const overlay = document.getElementById('mobileOverlay');
        if (isMobile()) {
            overlay.style.display = 'flex';
            document.documentElement.classList.add('overlay-active');
            document.body.classList.add('overlay-active');
        } else {
            overlay.style.display = 'none';
            document.documentElement.classList.remove('overlay-active');
            document.body.classList.remove('overlay-active');
        }
    }

    toggleOverlay(); 

});