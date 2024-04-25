// to ensure that code runs after the html has been finished loading
window.addEventListener("DOMContentLoaded", () => {
    const menu = document.querySelector(".content-overlay");
// initial setup
    gsap.set(menu, { opacity: 0});

// element that calculates the desired dimention of window
    const squareContainer = document.getElementById("square-container");
    const squareSite = 100;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const numCols = Math.ceil(screenWidth / squareSite);
    const numRows = Math.ceil(screenHeight / squareSite);

    const numSquares = numCols * numRows;

// squareContainer updated to accommodate the the calculated number of the squares
    squareContainer.style.width = `${numCols * squareSite}px`;
    squareContainer.style.height = `${numRows * squareSite}px`;

// Array for holding the square elements
    let squares = [];

// function for generating squares dynamically
    function createSquares() {
        for (let i = 0; i < numSquares; i++) {
            const square = document.createElement("div");
            square.classList.add("square");
            squareContainer.appendChild(square); // Append square to the container
            squares.push(square);
        }
    }

    function animateSquares() {
        gsap.fromTo(squares, {
                opacity: 0
            }, {
                opacity: 1,
                delay: 0.5,
                duration:0.0005,
                stagger: {
                    each: 0.004,
                    from: "random",
                },
            }
        );
        gsap.to(squares, {
                opacity: 0,
                delay: 1.5,
                duration: 0.0005,
                stagger: {
                    each: 0.004,
                    from: "random",
                },
            }
        );
    }

    let overlayVisible = false;

    document.getElementById("toggle").addEventListener("click", () => {
        squareContainer.innerHTML = "";
        squares = [];
        createSquares();
        animateSquares();
// explination is needed

        gsap.to(menu, 0.025, {
            opacity: overlayVisible ? 0 : 1,
            visibility: overlayVisible ? "hidden" : "visible",
            delay: 1.15,
        });
        gsap.to(menu, {
            zIndex: overlayVisible ? -1 : 0,
            delay: overlayVisible ? 0 : 2,
        });
        overlayVisible = !overlayVisible;
    });
});