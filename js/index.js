// Canvas element
const canvas = document.querySelector('.webgl');

// Resize canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* INIT */
// Renderer
const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
renderer.shadowMap.enabled = true;
renderer.setSize(canvas.width, canvas.height);

// Scene aanmaken
const scene = new THREE.Scene();
scene.background = new THREE.Color('#FECF96');

// Camera
const fov = 75;
const ratio =  canvas.width / canvas.height;
const camera = new THREE.PerspectiveCamera(fov, ratio, 0.1, 1000);
camera.position.set(8, 8, 8);
camera.lookAt(0, 0, 0)
scene.add(camera);

// Lights
const ambientLight = new THREE.AmbientLight('#FFFFFF', 1);

const directionalLight = new THREE.DirectionalLight('#FECF96', 0.5);
directionalLight.position.set(25, 25, 25);
directionalLight.castShadow = true;
directionalLight.shadow.camera.top = 50; // limieten van de lights instellen voor performance
directionalLight.shadow.camera.left = -50;
directionalLight.shadow.camera.right = 50;
directionalLight.shadow.camera.bottom = -50;
directionalLight.shadow.mapSize.set(2048, 2048);

scene.add(new THREE.CameraHelper(directionalLight.shadow.camera)); // helper class

scene.add(ambientLight, directionalLight);

/* OBJECTEN */
// Grond
const groundGeometry = new THREE.PlaneGeometry(1000, 1000); // vorm
const groundMaterial = new THREE.MeshStandardMaterial({color: '#E88E5A'}); // materiaal 
const ground = new THREE.Mesh(groundGeometry, groundMaterial); // mesh = vorm + materiaal
ground.rotation.x = -Math.PI * 0.5; // draaien om horizontaal te krijgen
ground.receiveShadow = true;

scene.add(ground);

// Controls
const controls = new THREE.OrbitControls(camera, canvas);

// Update functie
function animate() {
    // Render
	renderer.render( scene, camera );
    requestAnimationFrame( animate );
}
animate();