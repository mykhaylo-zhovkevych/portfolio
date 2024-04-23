/* const canvas = document.getElementById('effect');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];

function initStars() {  // Renamed from ininStars to initStars
    for(let i = 0; i < 1000; i++) {  // Corrected from 0 < 100 to i < 100

        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2,
            speed: Math.random() * 0.5 + 0.1
        });
    }
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();

        star.x += star.speed;

        if(star.x > canvas.width) {
            star.x = 0;
        }
    }

    requestAnimationFrame(drawStars);
}

initStars();  // Corrected function call
drawStars();


*/


// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 10);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true // Enable transparency in the canvas
});
renderer.setClearColor(0x000000, 0); // Set clear color to black with full opacity
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.style.margin = '0'; // Remove default margin of the body
renderer.sortObjects = true; // Make sure the renderer sorts objects
document.body.appendChild(renderer.domElement);

// Background gradient setup using custom shader
const vertexShader = `
  varying vec3 vWorldPosition;
  void main() {
    vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
`;

const fragmentShader = `
  uniform vec3 topColor;
  uniform vec3 bottomColor;
  uniform float offset;
  uniform float exponent;
  varying vec3 vWorldPosition;
  void main() {
    float h = normalize(vWorldPosition + offset).y;
    float factor = smoothstep(-1.0, 1.0, h);
    gl_FragColor = vec4(mix(bottomColor, topColor, factor), 1.0);
  }
`;

// Now rotation will be more apparent because of the ellipsoid's stretched shape
// Rotate to demonstrate the effect


// First sky setup
const uniformsSky1 = {
    topColor: { value: new THREE.Color(0x001155) },  // Dark blue
    bottomColor: { value: new THREE.Color(0x00003) },  // Very dark blue, nearly black
    offset: { value: 1 },
    exponent: { value: 1 }
};

const skyGeo1 = new THREE.SphereGeometry(2, 550, 550);
const skyMat1 = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: uniformsSky1,
    side: THREE.BackSide,
    /* wireframe: true */
});

const sky1 = new THREE.Mesh(skyGeo1, skyMat1);
sky1.position.set(-2, 3, 8);
sky1.rotation.x = Math.PI / 4;  // Rotate by 45 degrees around the X-axis
sky1.rotation.y = Math.PI / 2;  // Rotate by 90 degrees around the Y-axis

scene.add(sky1);




// another figure:
const uniformsSky2 = {
    topColor: { value: new THREE.Color(0x000000) }, // A vibrant orange
    bottomColor: { value: new THREE.Color(0x00000) }, // Bright yellow
    offset: { value: 1 },
    exponent: { value: 1 }
};

const skyGeo2 = new THREE.SphereGeometry(2, 550, 550); // Slightly smaller and less segments
const skyMat2 = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: uniformsSky2,
    side: THREE.BackSide,
    /* wireframe: true */
});

const sky2 = new THREE.Mesh(skyGeo2, skyMat2);
sky2.position.set(6, -1, 7); // Different position
sky2.rotation.x = Math.PI ;
scene.add(sky2);



/*
// another figure:
const uniformsSky3 = {
  topColor: { value: new THREE.Color(0xff8c00) }, // A vibrant orange
  bottomColor: { value: new THREE.Color(0xffff00) }, // Bright yellow
  offset: { value: 1 },
  exponent: { value: 1 }
};

const skyGeo3 = new THREE.SphereGeometry(3, 550, 550); // Slightly smaller and less segments
const skyMat3 = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: uniformsSky2,
  side: THREE.BackSide

});

const sky3 = new THREE.Mesh(skyGeo3, skyMat3);
sky3.position.set(-5, -7, 6); // Different position
scene.add(sky3); */

/* // Torus Knot setup
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.7, 1, 200, 4);
const torusKnotMaterial = new THREE.MeshBasicMaterial({ color: 0xff6347, wireframe: true });
const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial);
torusKnot.position.set(-12, 0, 0); // Center position
scene.add(torusKnot);
 */

// Animation loop
function animate() {
    requestAnimationFrame(animate);




    const time = Date.now() * 0.0015;
    const hueTop = 0.6 + Math.sin(time) * 0.09;;
    const hueBottom = 0.6 + Math.cos(time) * 0.09


    const delta = 0.004;
    sky1.rotation.x += delta * 0.25;
    sky1.rotation.y += delta * 0.5;

    sky2.rotation.x -= delta * 0.25; // Opposite rotation for visual variety
    sky2.rotation.y -= delta * 0.5;

    /*   sky3.rotation.x -= delta * 0.25; // Opposite rotation for visual variety
      sky3.rotation.y -= delta * 0.5;
     */
    uniformsSky1.topColor.value.setHSL(hueBottom, 0.4, 0.4);
    uniformsSky1.bottomColor.value.setHSL(hueTop, 0.4, 0.4);

    uniformsSky2.topColor.value.setHSL(hueBottom, 0.4, 0.4);
    uniformsSky2.bottomColor.value.setHSL(hueTop, 0.4, 0.4);

    /*   uniformsSky3.topColor.value.setHSL(hueBottom, 1, 2);
      uniformsSky3.bottomColor.value.setHSL(hueTop, 2, 9);
     */
    /*   torusKnot.rotation.x += 0.01;
      torusKnot.rotation.y += 0.01;
     */
    /*  ellipsoid.rotation.x += 0.01;
       ellipsoid.rotation.y += 0.01; */

    renderer.render(scene, camera);
}

// Window resize handler
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    // Update camera aspect ratio and projection matrix
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // Reset the size of the renderer and canvas
    renderer.setSize(window.innerWidth, window.innerHeight * 2); // Adjust to the canvas size
}

window.addEventListener('resize', onWindowResize, false);
document.body.appendChild(renderer.domElement);
onWindowResize(); // This will set the initial size correctly


// Start the animation loop
animate();
