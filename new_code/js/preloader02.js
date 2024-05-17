document.addEventListener("DOMContentLoaded", function() {
    const counter3 = document.querySelector(".counter-3");

    // It seems you are creating an additional 20 divs here. If the counter is only 0-9, this may be redundant.
    for(let i = 0; i < 2; i++) {  // If needed to repeat twice, confirm this logic
        for(let j = 0; j < 10; j++) {
            const div = document.createElement("div");
            div.className = "num";
            div.textContent = j;
            counter3.appendChild(div);
        }
    }
    const finalDiv = document.createElement("div");
    finalDiv.className = "num";
    finalDiv.textContent = "0";
    counter3.appendChild(finalDiv);

    function animate(counter, duration, delay = 0) {
        const numHeight = counter.querySelector(".num").clientHeight;
        const totalDistance = (counter.querySelectorAll(".num").length - 1) * numHeight;

        gsap.to(counter, {
            y: -totalDistance,  // Ensure you're appending 'px' to make it a valid CSS value
            duration: duration,
            delay: delay,
            ease: "power2.inOut",
        });
    }

    animate(counter3, 5);
    animate(document.querySelector(".counter-2"), 6);
    animate(document.querySelector(".counter-1"), 2, 4);

});
const audio = document.getElementById("background-audio");
audio.play();
// responsibel for taking the number away wehn i reaches 100
gsap.to(".digit", {
    top: "-150px",
    stagger: {
        amount: 0.25,
    },
    delay: 6,
    duration: 1,
    ease: "power4.inOut",
});
gsap.from(".loader-1", {
    width: 0,
    duration: 6,
    ease: "power2.inOut",
});
gsap.from(".loader-2", {
    width: 0,
    delay: 1.9,
    duration: 2,
    ease: "power2.inOut",
});

gsap.to(".loader", {
    background: "none",
    delay: 6,
    duration: 0.1,
});

// rotates the bar one
gsap.to(".loader-1", {
    rotate: 90,
    y: -50,
    duration: 0.5,
    delay:6,
});
gsap.to(".loader-2", {
        x: -75,
        y: 75,
        duration: 0.5,
    },
    "<"
);

gsap.to(".loader", {
    scale: 40,
    duration: 1,
    delay: 7,
    ease: "power2.inOut"
})

gsap.to(".loader", {
    rotate: 45,
    y: 600,
    x: 2000,
    duration: 4, // changed ------------------
    delay: 7,
    ease: "power2.inOut",
});

/* // Change background color to white
gsap.to(".loader", {
    backgroundColor: "#FFFFFF",
    duration: 1.5,
    ease: "power1.inOut",
    delay: 11.5, // Timing adjusted to after the loader animation
}); */

// Fade the loader to reveal the main page content
gsap.fromTo(".loader", {
    opacity: 1,
}, {
    opacity: 0,
    duration: 2,
    ease: "power1.inOut",
    delay: 10, // Adjusted to start right after the background color change
    onComplete: function() {
        gsap.from(".canvas", {
            opacity: 0,
            duration: 1.5,
            ease: "power2.inOut"
        });
        setTimeout(function() {
            audio.pause();
            audio.currentTime = 0;
        }, 2000); // 2 seconds delay
    }
});