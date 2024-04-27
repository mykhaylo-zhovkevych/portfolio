window.addEventListener("DOMContentLoaded", () => {
    const menu = document.querySelector(".content-overlay02");
    const squareContainer = document.getElementById("square-container02");
    let squares = [];

    // Initial setup for the menu to be hidden
    gsap.set(menu, { opacity: 0, visibility: "hidden" });

    // Create squares only once, at the start
    function createSquares() {
        const squareSite = 100;  // Size of each square, you can adjust this value
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const numCols = Math.ceil(screenWidth / squareSite);
        const numRows = Math.ceil(screenHeight / squareSite);
        const numSquares = numCols * numRows;

        squareContainer.innerHTML = '';  // Clear previous squares if any
        for (let i = 0; i < numSquares; i++) {
            const square = document.createElement("div");
            square.classList.add("square02");
            squareContainer.appendChild(square);
            squares.push(square);
        }
    }

    // Function to handle the animation of squares and the showing/hiding of the menu
    function animateSquares(showMenuAfter) {
        squareContainer.style.display = 'flex';  // Make sure the container for squares is visible

        // Animate squares appearing
        gsap.fromTo(squares, {
            opacity: 0
        }, {
            opacity: 1,
            duration: 0.6,
            stagger: {
                each: 0.004,
                from: "random"
            },
            onComplete: () => {
                // Animate squares disappearing
                gsap.to(squares, {
                    opacity: 0,
                    duration: 0.5,
                    stagger: {
                        each: 0.004,
                        from: "random"
                    },
                    onComplete: () => {
                        squareContainer.style.display = 'none';  // Hide the container after animation
                        if (showMenuAfter) {
                            // Show the menu if the flag is true
                            gsap.to(menu, {opacity: 1, visibility: "visible", duration: 0.5});
                        } else {
                            // Hide the menu if the flag is false
                            gsap.to(menu, {opacity: 0, visibility: "hidden", duration: 0.5});
                        }
                    }
                });
            }
        });
    }

    document.getElementById("toggle02").addEventListener("click", () => {
        const isVisible = window.getComputedStyle(menu).visibility === "visible";

        if (isVisible) {
            // If the menu is visible, animate to hide it
            animateSquares(false);
        } else {
            // If the menu is not visible, animate to show it
            animateSquares(true);
        }
    });

    createSquares();  // Initialize squares when the DOM is fully loaded
});
