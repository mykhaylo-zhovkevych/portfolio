/* const container = document.querySelector(".kontainer");
const sections = gsap.utils.toArray(".kontainer section");
const canvasHeight = document.querySelector('.canvas').offsetHeight;
const texts = gsap.utils.toArray(".anim");
const mask = document.querySelector(".mask");


document.querySelector('.scroll-wrapper').style.height = `${canvasHeight + window.innerHeight * 7}px`;

// Iterate over sections and apply animation
sections.forEach((section, index) => {
  gsap.to(section, {
    xPercent: -100, 
    ease: "none",
    scrollTrigger: {
      trigger: ".kontainer",
      scroller: window,
      start: () => `top+=${canvasHeight + window.innerHeight * 8 + 250}`, 
      end: "+=600", 
      scrub: 1,
      markers: true,
    }
  });
});
 */
const container = document.querySelector(".kontainer");
const sections = gsap.utils.toArray(".kontainer section");
const canvasHeight = document.querySelector('.canvas').offsetHeight;
const texts = gsap.utils.toArray(".anim");
const mask = document.querySelector(".mask");

document.querySelector('.scroll-wrapper').style.height = `${canvasHeight + window.innerHeight * 7}px`;

// Check if the viewport width is less than 1100 pixels
if (window.innerWidth >= 1100) {
  
  sections.forEach((section, index) => {
    gsap.to(section, {
      xPercent: -100,
      ease: "none",
      scrollTrigger: {
        trigger: ".kontainer",
        scroller: window,
        start: () => `top+=${canvasHeight + window.innerHeight * 8 + 250}`,
        end: "+=600",
        scrub: 1,
        markers: true,
      }
    });
  });
}
// Ensure GSAP and ScrollTrigger are loaded
gsap.registerPlugin(ScrollTrigger);

function animateFooter() {
    gsap.from(".block", {
    scrollTrigger: {
        trigger: ".footer-wrapper",
        scroller: window,
        start: () => { 
            const canvasHeight = document.querySelector('.canvas').offsetHeight;
            return "top+=" + (canvasHeight + window.innerHeight * 7 - 800);
        },
        end: () => { 
            const canvasHeight = document.querySelector('.canvas').offsetHeight;
            const sectionHeight = document.querySelector('.footer-wrapper').offsetHeight;
            return "top+=" + (canvasHeight - sectionHeight + window.innerHeight * 7); 
        }, 
        toggleActions: "play none none none",
        markers: true,
    },
    width: "0%",
    duration: 1.3,
    ease: "power2.inOut",
    stagger: {
        amount: 1.5,
        from: "start",
    },
    onComplete: function() {
            document.querySelector(".overlay-effect-footer").style.opacity = '1';
            document.querySelector(".canvas-footer").style.opacity = '1';
            document.querySelector(".content").style.background = "#bfc0c4"
        }
});
}

function animateSection() {
    gsap.from(".block-catalog", {
    scrollTrigger: {
        trigger: ".section02",
        scroller: window, 
        start: () => { 
                const canvasHeight = document.querySelector('.canvas').offsetHeight;
                return "top+=" + (canvasHeight + window.innerHeight * 7 - 150);
            },
        end: () => { 
                const canvasHeight = document.querySelector('.canvas').offsetHeight;
                const sectionHeight = document.querySelector('.section02').offsetHeight;
                return "top+=" + (canvasHeight - sectionHeight + window.innerHeight * 9); 
            },
        toggleActions: "play none none none",
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
            start: () => { 
                    const canvasHeight = document.querySelector('.canvas').offsetHeight;
                    return "top+=" + (canvasHeight + window.innerHeight * 7 - 200); 
                },
            end: () => { 
                    const canvasHeight = document.querySelector('.canvas').offsetHeight;
                    const sectionHeight = document.querySelector('.section01').offsetHeight;
                    return "top+=" + (canvasHeight - sectionHeight + window.innerHeight * 9); 
                },
            toggleActions: "play none none none",
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
                document.querySelector(".overlay-effect-section01").style.opacity = '0';
                document.querySelector(".overlay-effect-section01").style.display = 'none';
            }
    });
}

function animateSection03() {
        gsap.from(".block-contact", {
            scrollTrigger: {
                trigger: ".section03",
                scroller: window, 
                start: () => { 
                        const canvasHeight = document.querySelector('.canvas').offsetHeight;
                        return "top+=" + (canvasHeight + window.innerHeight * 7 - 200); 
                    },
                end: () => { 
                        const canvasHeight = document.querySelector('.canvas').offsetHeight;
                        const sectionHeight = document.querySelector('.section03').offsetHeight;
                        return "top+=" + (canvasHeight - sectionHeight + window.innerHeight * 9); 
                    },
                toggleActions: "play none none none",
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
                    document.querySelector(".overlay-effect-contact").style.opacity = '0';
                    document.querySelector(".overlay-effect-contact").style.display = 'none';
                }
        });
    }

animateSection01();
animateSection();
animateSection03();
animateFooter();

