/* 
document.addEventListener("DOMContentLoaded", function() {
    // Preloader animation setup
    const counter3 = document.querySelector(".counter-3");

    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 10; j++) {
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

    // Preload images
    preloadImages(140, './blender02/', 'jpg', function(loadedImages) {
        images = loadedImages;
        initializeCanvasAnimation();
    });
});

let images = []; // Global images array

function preloadImages(frameCount, path, extension, callback) {
    const loadedImages = [];
    let loadedCount = 0;

    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = `${path}${(i + 1).toString()}.${extension}`;
        img.onload = () => {
            loadedImages[i] = img;
            loadedCount++;
            if (loadedCount === frameCount) {
                callback(loadedImages);
            }
        };
        img.onerror = (error) => {
            console.error(`Failed to load image ${img.src}: `, error);
        };
    }
}

function initializeCanvasAnimation() {
    Promise.all([
        new Promise(resolve => setTimeout(resolve, 6500)),
        new Promise(resolve => window.onload = resolve)
    ]).then(() => {
        document.querySelector('.loading-screen02').style.display = 'none';
        document.querySelector('.website-content02').style.display = 'flex';
        document.querySelector('.canvas').style.display = 'flex';

        const canvas = document.querySelector(".canvas");
        const context = canvas.getContext("2d");
        const frameCount = images.length;
        let ball = { frame: 1 };

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        function render() {
            if (!images[0]) return; // Check if images are loaded
            context.canvas.width = images[0].width;
            context.canvas.height = images[0].height;
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(images[ball.frame], 0, 0, canvas.width, canvas.height);
        }

        setTimeout(() => {
            gsap.to(ball, {
                frame: frameCount - 1,
                duration: 5,
                ease: "none",
                snap: 'frame',
                onUpdate: render,
            });
        }, 3500);

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

        updateAnimations();
        window.addEventListener('resize', updateAnimations);

        gsap.fromTo('.ball-text02', {
            x: '100%',
        }, {
            x: '0%',
            opacity: 1,
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

        function simulateKeyPress(keyCode) {
            let event = new KeyboardEvent('keypress', {
                keyCode: keyCode,
                which: keyCode,
                bubbles: true,
                cancelable: true
            });

            window.dispatchEvent(event);
        }

        setTimeout(() => {
            simulateKeyPress(135);
        }, 11000);

        window.addEventListener('keypress', (event) => {
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
            newScrollTop = Math.min(newScrollTop, maxScrollTop);

            window.scrollTo({ top: newScrollTop, behavior: 'instant' });
        }
    });
}

function updateAnimations() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    let xStart, startPercent, endPercent;

    if (screenWidth <= 1400 && screenHeight <= 800) {
        xStart = '-120%';
        startPercent = "605%";
        endPercent = "1455%";
    } else if (screenWidth <= 1400 && screenHeight <= 1000) {
        xStart = '-120%';
        startPercent = "605%";
        endPercent = "1255%";
    } else if (screenWidth <= 650 && screenHeight >= 1000) {
        xStart = '-0%';
        startPercent = "605%";
        endPercent = "1255%";
    } else if (screenWidth <= 1100 && screenHeight >= 1000) {
        xStart = '-0%';
        startPercent = "605%";
        endPercent = "1055%";
    } else {
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
 */

document.addEventListener("DOMContentLoaded", function() {
    // Preloader animation setup
    const counter3 = document.querySelector(".counter-3");

    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 10; j++) {
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

    // Check network speed after preloader animation

    checkNetworkSpeed().then(speed => {
        if (speed < 300) { 
            setTimeout(() => {
                showSlowNetworkMessage();
            }, 5800);
                preloadImages(140, './blender02/', 'jpg', function(loadedImages) {
                    images = loadedImages;
                    initializeCanvasAnimation();
                });
           
        } else {
            preloadImages(140, './blender02/', 'jpg', function(loadedImages) {
                images = loadedImages;
                initializeCanvasAnimation();
            });
        }
    });
});

let images = []; // Global images array

function preloadImages(frameCount, path, extension, callback) {
    const loadedImages = [];
    let loadedCount = 0;

    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = `${path}${(i + 1).toString()}.${extension}`;
        img.onload = () => {
            loadedImages[i] = img;
            loadedCount++;
            if (loadedCount === frameCount) {
                callback(loadedImages);
            }
        };
        img.onerror = (error) => {
            console.error(`Failed to load image ${img.src}: `, error);
        };
    }
}

function initializeCanvasAnimation() {
    Promise.all([
        new Promise(resolve => setTimeout(resolve, 6500)),
        new Promise(resolve => window.onload = resolve)
    ]).then(() => {
        document.querySelector('.loading-screen02').style.display = 'none';
        document.querySelector('.website-content02').style.display = 'flex';
        document.querySelector('.canvas').style.display = 'flex';

        const canvas = document.querySelector(".canvas");
        const context = canvas.getContext("2d");
        const frameCount = images.length;
        let ball = { frame: 1 };

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        function render() {
            if (!images[0]) return; // Check if images are loaded
            context.canvas.width = images[0].width;
            context.canvas.height = images[0].height;
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(images[ball.frame], 0, 0, canvas.width, canvas.height);
        }

        setTimeout(() => {
            gsap.to(ball, {
                frame: frameCount - 1,
                duration: 5,
                ease: "none",
                snap: 'frame',
                onUpdate: render,
            });
        }, 3500);

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
        updateAnimations();
        window.addEventListener('resize', updateAnimations);

        gsap.fromTo('.ball-text02', {
            x: '100%',
        }, {
            x: '0%',
            opacity: 1,
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

        function simulateKeyPress(keyCode) {
            let event = new KeyboardEvent('keypress', {
                keyCode: keyCode,
                which: keyCode,
                bubbles: true,
                cancelable: true
            });

            window.dispatchEvent(event);
        }

        setTimeout(() => {
            simulateKeyPress(135);
        }, 11000);

        window.addEventListener('keypress', (event) => {
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
            newScrollTop = Math.min(newScrollTop, maxScrollTop);

            window.scrollTo({ top: newScrollTop, behavior: 'instant' });
        }
    });
}

/* ------------------ On scrollTrigger --------------------- */
function updateAnimations() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    let xStart, startPercent, endPercent;

    if (screenWidth <= 1400 && screenHeight <= 800) {
        xStart = '-120%';
        startPercent = "605%";
        endPercent = "1455%";
    } else if (screenWidth <= 1400 && screenHeight <= 1000) {
        xStart = '-120%';
        startPercent = "605%";
        endPercent = "1255%";
    } else if (screenWidth <= 650 && screenHeight >= 1000) {
        xStart = '-0%';
        startPercent = "605%";
        endPercent = "1255%";
    } else if (screenWidth <= 1100 && screenHeight >= 1000) {
        xStart = '-0%';
        startPercent = "605%";
        endPercent = "1055%";
    } else {
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

function checkNetworkSpeed() {
    return new Promise((resolve) => {
        const startTime = Date.now();
        const img = new Image();
        img.src = "https://www.google.com/images/phd/px.gif" + "?cache=" + Math.random();
        img.onload = function() {
            const endTime = Date.now();
            const duration = (endTime - startTime) / 1000; // seconds
            const fileSize = 4 * 1024 * 8; // 4KB in bits
            const speed = fileSize / duration / 1024; // kbps
            resolve(speed);
        };
    });
}

function showSlowNetworkMessage() {
    const message = document.querySelector('.main-INT');
    gsap.fromTo(message, { display: "none", opacity: 0 }, { display: "flex", opacity: 1, duration: 1, ease: "power2.inOut" });
}
