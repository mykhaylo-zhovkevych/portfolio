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
    images.push(img);
}
// request
// console.log(images); 
//output
/* Array(140) [ img, img, img, img, img, img, img, img, img, img, … ]
​
[0…99]
​
[100…139]
​
length: 140
​
<prototype>: Array []
 */
gsap.to(ball, {
    frame: frameCount - 1,
    duration: 5, // This is the time in seconds for the animation to complete
    snap: 'frame',
    ease: "none",
    
    onUpdate: render, // Call the render function on each update
   /*  repeat: -1, // Use this if you want the animation to loop indefinitely */
});

gsap.fromTo('.ball-text', { opacity: 0 }, {
    opacity: 1,
    duration: 3,
    /* repeat: -1,
    yoyo: true // Use yoyo for the animation to fade in and out */
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

gsap.fromTo('.ball-text', {opacity: 0}, {opacity: 1, scrollTrigger: {
    scrub: true,
    start: '50%',
    end: '160%',
    marker: '', 
},
}
);
window.addEventListener('load', () => {
    // Delay any scrolling until everything is truly ready
    setTimeout(() => {
        // Use requestAnimationFrame to sync with the browser's repaint cycle
        requestAnimationFrame(() => {
            performScrollAction();
        });
    }, 1500); // Delay might need adjustment based on actual load performance
});

function performScrollAction() {
    const canvasBottomPosition = canvas.offsetTop + canvas.offsetHeight;
    const maxScrollTop = document.body.scrollHeight - window.innerHeight;
    const currentScrollTop = window.pageYOffset;
    const distanceToCanvasBottom = canvasBottomPosition - currentScrollTop;
    const scrollFraction = distanceToCanvasBottom * 8; // Adjust the fraction as needed

    let newScrollTop = currentScrollTop + scrollFraction;
    newScrollTop = Math.min(newScrollTop, maxScrollTop); // Ensuring not to exceed the max scrollable area

    window.scrollTo({ top: newScrollTop, behavior: 'smooth' });
}

  
  
/* images[0].onload = render; */

function render() {
    context.clearRect(0,0, canvas.width, canvas.height);
    context.drawImage(images[ball.frame], 0, 0, canvas.width, canvas.height);

}