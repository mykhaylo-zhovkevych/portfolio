Promise.all([
    new Promise(resolve => setTimeout(resolve, 12000)), // Ensures the preloader shows for at least 7.7 seconds
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
            if (i === 0) { // Ensure the first image is displayed as soon as it's loaded
                ball.frame = 0;
                render(); // Display the first image
            }
            if (loadedImages === frameCount) { // Check if all images are loaded
                callback(); // Call the callback function (e.g., to start animation)
            }
        };
    }
}
// request
// console.log(images); 
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
            // repeat: -1, // Uncomment for looping animation
        });
    }, 5000); // Delay animation start by 5 seconds
});

// Configure additional text animation as needed
gsap.fromTo('.ball-text02', {
    opacity: 1,
}, {
   /*  opacity: 1, */
    duration: 5,
    delay: 0, // Start after initial delay
    onComplete: () => {
        gsap.to(".ball-text02", {
            opacity: 0,
            duration: 1,
            
        });
    }
});

// Entrance animation for '.ball-text02' after a delay
gsap.fromTo('.ball-text02', {
    x: '100%',  // Starts off the screen on the right
    opacity: 0
}, {
    x: '0%',  // Slides in to original position
    opacity: 1,
    duration: 2,
    delay: 0,  // Delay before animation starts
    ease: "power2.out"
});


// the start and end work only with 

// Configure additional text animation as needed
gsap.fromTo('.ball-text', {
    opacity: 1,
}, {
    delay: 10, // Start after initial delay
    
});

// Start the ball-text animation with a slide-in effect from the right
gsap.fromTo('.ball-text', {
    x: '-100%',  // Start off-screen to the right
    opacity: 0
  }, {
    x: '0%',    // End at its original position
    opacity: 1,
    duration: 2,  // Duration of the slide-in effect
    ease: "power2.out", // Ease out for a smooth ending
    delay: 10,   // Start after initial delay
  });
  


/* ------------------ On scrollTrigger --------------------- */

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
/* 
// GSAP Animation for '.ball-text' opacity based on scroll
gsap.fromTo('.ball-text', {
    opacity: 0
  }, {
    opacity: 1,
    scrollTrigger: {
      trigger: '.ball-text',  // Specify the trigger element for this animation
        scrub: true,
        start: "605%",
        end: '1855%', markers: true,   // When bottom of '.ball-text' hits the top of viewport
        onLeave: () => {
        gsap.to(".ball-text", {
            opacity: 0,
            duration: 1,
            
        });
    }
    }
  });
 */
  // GSAP Animation for '.ball-text' opacity based on scroll
gsap.fromTo('.ball-text', {
    x: '-120%',
    opacity: 0
  }, {
    x: '0%',
    opacity: 1,
    duration: 2,
    scrollTrigger: {
      trigger: '.ball-text',  // Specify the trigger element for this animation
      scrub: true,
      start: "605%",    // When the top of the trigger hits 80% of the viewport
      end: "1855%",      // When the top of the trigger hits 30% of the viewport
      markers: true,
      toggleActions: 'play none none reverse', // Play the animation in and reverse out
      onEnter: () => {
        gsap.to(".ball-text", { opacity: 1 });
      },
      onLeave: () => {
        gsap.to(".ball-text", { opacity: 0 });
      }
    }
});
 



gsap.fromTo('.ball-text02', {
    opacity: 1
}, {
    opacity: 0,
    scrollTrigger: {
        scrub: true,
        start: "top",
        end: "20%", // Ends 500px scroll after the start point
        onLeave: () => gsap.to(".ball-text02", {opacity: 0}) // Adjusted to use onLeave for when the trigger leaves the end point
    },
});





// Function to simulate a keypress event
function simulateKeyPress(keyCode) {
    // Create a new event
    let event = new KeyboardEvent('keypress', {
        keyCode: keyCode, // ASCII code for key, e.g., 119 for 'w'
        which: keyCode, // Set 'which' for compatibility with older browsers
        bubbles: true, // Event should bubble up through the DOM
        cancelable: true // Event can be canceled
    });

    // Dispatch the event on the window or any other element
    window.dispatchEvent(event);
}

// Use setTimeout to delay the simulation
setTimeout(() => {
    simulateKeyPress(119); // ASCII code for 'w'
}, 11000); // Delays the keypress event by 5000 milliseconds (5 seconds)

window.addEventListener('keypress', (event) => {
    // Check if the pressed key is 'w' (ASCII code 119)
    if (event.keyCode === 119 || event.which === 119) {
        // Delay any scrolling until everything is truly ready
        setTimeout(() => {
            // Use requestAnimationFrame to sync with the browser's repaint cycle
            requestAnimationFrame(() => {
                performScrollAction();
            });
        }); // Delay might need adjustment based on actual load performance
    }
});
    
    function performScrollAction() {
    const canvasBottomPosition = canvas.offsetTop + canvas.offsetHeight;
    const maxScrollTop = document.body.scrollHeight - window.innerHeight;
    const currentScrollTop = window.pageYOffset;
    const distanceToCanvasBottom = canvasBottomPosition - currentScrollTop;
    const scrollFraction = distanceToCanvasBottom * 7.5; // Adjust the fraction as needed
    
    let newScrollTop = currentScrollTop + scrollFraction;
    newScrollTop = Math.min(newScrollTop, maxScrollTop); // Ensuring not to exceed the max scrollable area
    
    window.scrollTo({ top: newScrollTop, behavior: 'instant' });
    }

function render() {
context.canvas.width = images[0].width;
context.canvas.height = images[0].height;
context.clearRect(0,0, canvas.width, canvas.height);
context.drawImage(images[ball.frame], 0, 0, canvas.width, canvas.height);

}
});