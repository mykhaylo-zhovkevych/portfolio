Promise.all([
    new Promise(resolve => setTimeout(resolve, 6500)),
    new Promise(resolve => window.onload = resolve) // Waits for all resources to load 
]).then(() => {
    document.querySelector('.loading-screen02').style.display = 'none';
    document.querySelector('.website-content02').style.display = 'flex';
    document.querySelector('.canvas').style.display = 'flex';
    
const canvas = document.querySelector(".canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext("2d");
const frameCount = 140;

// this look into the folder and it will increment one by one and go trough each images // not looping
const currentFrame = (index) => `./blender02/${(index+1).toString()}.jpg`;
const images = [];
let ball = {frame : 1};

// get`s the images and moves to the array(images)
for(let i = 0; i < frameCount; i++){
const img = new Image();
// i is index
img.src = currentFrame(i);
/* images.push(img) was used to add each loaded image to the images array. This approach works but does not control the order in which images are loaded or ensure that they are stored in the array in their correct order. This can be problematic if network conditions cause some images to load slower than others, disrupting the sequence */
images.push(img);
}

// Load all images and display the first one when ready
function preloadImages(callback) {
    let loadedImages = 0;
    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        img.onload = () => {
            loadedImages++;
            images[i] = img;
            if (i === 0) { 
                ball.frame = 0;
                render(); 
            }
            if (loadedImages === frameCount) { 
                callback(); 
            }
        };
    }
}
// request
console.log(images); 
//output
/* Array(140) [ img, img, img, img, img, img, img, img, img, img, … ]
[0…99]
[100…139]
length: 140
<prototype>: Array []
*/
/* ------------------ On Animation --------------------- */


preloadImages(() => {
    setTimeout(() => {
        gsap.to(ball, {
            frame: frameCount - 1,
            duration: 5,
            ease: "none",
            snap: 'frame',
            onUpdate: render,
        });
    }, 3500); 
});


gsap.fromTo('.ball-text02', {
    opacity: 1,
}, {
    duration: 4,
    delay: 0, 
    onComplete: () => {
        gsap.to(".ball-text02", {
            opacity: 0,
            duration: 0.5,
            
        });
    }
});


gsap.fromTo('.ball-text02', {
    x: '100%', 
    opacity: 0
}, {
    x: '0%',  
    opacity: 1,
    duration: 1,
    delay: 0,  
    ease: "power2.out"
});


gsap.fromTo('.ball-text', {
    opacity: 1,
}, {
    delay: 7.5, 
});


gsap.fromTo('.ball-text', {
    x: '-100%', 
    opacity: 0
  }, {
    x: '0%',   
    opacity: 1,
    duration: 4,  
    ease: "power2.out", 
    delay: 7.5,   
  });
  


/* ------------------ On scrollTrigger --------------------- */

function updateAnimations() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    let xStart, startPercent, endPercent;
    // phone
    if (screenWidth <= 1400 && screenHeight <= 800) {
        xStart = '-120%';  
        startPercent = "605%";
        endPercent = "1455%"; 
    }
    // laptopp
    else if (screenWidth <= 1400 && screenHeight <= 1000) {
        xStart = '-120%';  
        startPercent = "605%";
        endPercent = "1255%"; 
    }
    else if (screenWidth <= 650 && screenHeight >= 1000) {  
      xStart = '-0%';
      startPercent = "605%";
      endPercent = "1255%";
    } else if (screenWidth <= 1100 && screenHeight >= 1000) {  
      xStart = '-0%';
      startPercent = "605%";
      endPercent = "1055%";
    } else {  // Larger screens
      xStart = '-120%';
      startPercent = "605%";
      endPercent = "1855%";
    } 
    

    gsap.fromTo('.ball-text', {
      x: xStart,
      opacity: 0
    }, {
      x: '0%',
      opacity: 1,
      duration: 2,
      scrollTrigger: {
        trigger: '.ball-text',
        scrub: true,
        start: startPercent,
        end: endPercent,
        markers: true, 
        toggleActions: 'play none none none',
        onEnter: () => gsap.to(".ball-text", { opacity: 1 }),
        onLeave: () => gsap.to(".ball-text", { opacity: 0 }),
      }
    });
  }
  
  // Initialize animations on load and update on window resize
  updateAnimations();
  window.addEventListener('resize', updateAnimations);

gsap.fromTo('.ball-text02', {
    x: '100%', }, { 
    x: '0%',
    opacity:1,  
    duration: 2,
    scrollTrigger: {
    trigger: '.ball-text02',
    scrub: true,
    start: "top",
    end: "top bottom%", 
    onLeave: () => gsap.to(".ball-text02", { opacity: 0 }) 
  },
});

gsap.to(ball, {
  frame: frameCount - 1,
  snap: 'frame',
  ease: "none",
  scrollTrigger: {
    scrub: true,
    pin: 'canvas',
    end: '800%',
  },
  onUpdate: render,
});

// Function to simulate a keypress event
function simulateKeyPress(keyCode) {
    let event = new KeyboardEvent('keypress', {
        keyCode: keyCode, 
        which: keyCode, 
        bubbles: true,
        cancelable: true 
    });

    
    window.dispatchEvent(event);
}

// Use setTimeout to delay the simulation
setTimeout(() => {
    simulateKeyPress(135); 
}, 11000); 

window.addEventListener('keypress', (event) => {
    // Check if the pressed key is '‡' (ASCII code 135)
    if (event.keyCode === 135 || event.which === 135) {
    
        setTimeout(() => {
            requestAnimationFrame(() => {
                performScrollAction();
            });
        }); 
    }
});
    
function performScrollAction() {
    const canvasBottomPosition = canvas.offsetTop + canvas.offsetHeight;
    const maxScrollTop = document.body.scrollHeight - window.innerHeight;
    const currentScrollTop = window.pageYOffset;
    const screenWidth = window.innerWidth;

    let multiplier;
    if (screenWidth < 550) {
        multiplier = 7;  
    } else if (screenWidth < 1160) {
        multiplier = 5;  
    } else {
        multiplier = 7; 
    }

    const distanceToCanvasBottom = canvasBottomPosition - currentScrollTop;
    const scrollFraction = distanceToCanvasBottom * multiplier;
    
    let newScrollTop = currentScrollTop + scrollFraction;
    newScrollTop = Math.min(newScrollTop, maxScrollTop);  // Verhindert, dass über das Dokumentende hinaus gescrollt wird
    
    window.scrollTo({ top: newScrollTop, behavior: 'instant' });
}
 
function render() {
context.canvas.width = images[0].width;
context.canvas.height = images[0].height;
context.clearRect(0,0, canvas.width, canvas.height);
context.drawImage(images[ball.frame], 0, 0, canvas.width, canvas.height);

}
});