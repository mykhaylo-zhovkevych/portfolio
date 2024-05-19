document.addEventListener("DOMContentLoaded", function() {
 
    const counter3 = document.querySelector(".counter-3");

    for(let i = 0; i < 2; i++) {
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
            y: -totalDistance,
            duration: duration,
            delay: delay,
            ease: "power2.inOut",
        });
    }

    animate(counter3, 3.75); 
    animate(document.querySelector(".counter-2"), 4.5); 
    animate(document.querySelector(".counter-1"), 1.5, 3); 

    const audio = document.getElementById("background-audio");
    audio.play();

    gsap.to(".digit", {
        top: "-150px",
        stagger: {
            amount: 0.1875, 
        },
        delay: 4.5, 
        duration: 0.75, 
        ease: "power4.inOut",
    });

    gsap.from(".loader-1", {
        width: 0,
        duration: 4.5, 
        ease: "power2.inOut",
    });

    gsap.from(".loader-2", {
        width: 0,
        delay: 1.425, 
        duration: 1.5, 
        ease: "power2.inOut",
    });

    gsap.to(".loader", {
        background: "none",
        delay: 4.5, 
        duration: 0.075, 
    });

    gsap.to(".loader-1", {
        rotate: 90,
        y: -50,
        duration: 0.375, 
        delay: 4.5, 
    });

    gsap.to(".loader-2", {
        x: -75,
        y: 75,
        duration: 0.375, 
    }, "<");

    gsap.to(".loader", {
        scale: 40,
        duration: 0.75, 
        delay: 5.25, 
        ease: "power2.inOut"
    });

    /* gsap.to(".loader", {
        rotate: 45,
        y: 600,
        x: 2000,
        duration: 1, 
        delay: 5.25, 
        ease: "power2.inOut",
    }); */

    gsap.fromTo(".loader", {
        opacity: 1,
    }, {
        opacity: 0,
        duration: 1, 
        ease: "power2.inOut",
        delay: 5, 
        onComplete: function() {
            gsap.from(".canvas", {
                opacity: 0,
                duration: 3, 
                ease: "power2.inOut"
            });
            setTimeout(function() {
                audio.pause();
                audio.currentTime = 0;
            }, 3000); 
        }
    });
});

