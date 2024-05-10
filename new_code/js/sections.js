const container = document.querySelector(".kontainer");
const sections = gsap.utils.toArray(".kontainer section");
const canvasHeight = document.querySelector('.canvas').offsetHeight;
const texts = gsap.utils.toArray(".anim");
const mask = document.querySelector(".mask");

// Create a larger scrolling context by adjusting the height of a wrapper or similar
document.querySelector('.scroll-wrapper').style.height = `${canvasHeight + window.innerHeight * 7}px`;

// Iterate over sections and apply animation
sections.forEach((section, index) => {
  // Adjust `xPercent` or any other transform property as needed
  gsap.to(section, {
    xPercent: -100, 
    ease: "none",
    scrollTrigger: {
      trigger: ".kontainer",
      scroller: window,
      start: () => `top+=${canvasHeight + window.innerHeight * 8 + 250}`, // Starts when the specified position is met
      end: "+=600", // Continues for an additional amount based on design needs
      scrub: 1,
      markers: true,
    }
  });
});


// Ensure GSAP and ScrollTrigger are loaded
gsap.registerPlugin(ScrollTrigger);

function animateFooter() {
    gsap.from(".block", {
    scrollTrigger: {
        trigger: ".footer-wrapper",
        scroller: window,
        start: "9500px", // 9500px
        end: "10300px", // 10300px
        toggleActions: "restart pause resume pause",
        /* markers: true, */
    },
    width: "0%",
    duration: 1.3,
    ease: "power1.inOut",
    stagger: {
        amount: 1.5,
        from: "start",
    }
});
}

function animateSection() {
    gsap.from(".block-catalog", {
    scrollTrigger: {
        trigger: ".section02",
        scroller: window, 
        start: () => { 
                // Errechnet den Startpunkt basierend auf der Höhe des Canvas
                const canvasHeight = document.querySelector('.canvas').offsetHeight;
                return "top+=" + (canvasHeight + window.innerHeight * 7 - 100);
            },
        end: () => { 
                // Berechnet das Ende basierend auf der Höhe des Canvas minus einem festen Wert
                const canvasHeight = document.querySelector('.canvas').offsetHeight;
                const sectionHeight = document.querySelector('.section02').offsetHeight;
                return "top+=" + (canvasHeight - sectionHeight + window.innerHeight * 9); 
            },
        toggleActions: "restart restart restart restart",
        markers: true
    },
    width: "0%",
    duration: 1.3,
    ease: "power2.inOut",
    stagger: {
        amount: 1.5,
        from: "start",
    },
    onComplete: function() {
            // Hide the overlay completely after animation
            document.querySelector(".overlay-effect-catalog").style.opacity = '0';
            document.querySelector(".overlay-effect-catalog").style.display = 'none';
        }
});
} 

function animateSection01() {
    gsap.from(".block-section01", {
        scrollTrigger: {
            trigger: ".section01",
            scroller: window, 
            start: () => { // 9500px
                    // Errechnet den Startpunkt basierend auf der Höhe des Canvas
                    const canvasHeight = document.querySelector('.canvas').offsetHeight;
                    return "top+=" + (canvasHeight + window.innerHeight * 7 ); // - 500 um das zu weiter bringen
                },
            end: () => { // 10300px
                    // Berechnet das Ende basierend auf der Höhe des Canvas minus einem festen Wert
                    const canvasHeight = document.querySelector('.canvas').offsetHeight;
                    const sectionHeight = document.querySelector('.section01').offsetHeight;
                    return "top+=" + (canvasHeight - sectionHeight + window.innerHeight * 9); // Endet, wenn das untere Ende von 'section02' minus 6200px die Oberkante erreicht. 11020
                },
            toggleActions: "play play play play",
            /* markers: true */
        },
        width: "0%",
        duration: 1.3,
        ease: "power2.inOut",
        stagger: {
            amount: 1.5,
            from: "start",
        },
        onComplete: function() {
                // Hide the overlay completely after animation
                document.querySelector(".overlay-effect-section01").style.opacity = '0';
                document.querySelector(".overlay-effect-section01").style.display = 'none';
            }
    });
}

animateSection01();
animateSection();
animateFooter();

