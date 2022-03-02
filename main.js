// First Three JS Website 
// JS File

// Import Statements
import './style.css'; // css stylesheet
import * as THREE from 'three'; // three js
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup three components: scene, camera, renderer

const scene = new THREE.Scene(); // create new scene

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // create new camera

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
}); // create new renderer

//set up renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// set position of camera
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera); // render scene and camera with renderer

// create Torus (spinning ring-thing)
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xc552fa });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus); // add Torus to scene

// Set up light source
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

// function to add the white sphere stars (not background stars)
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar); // create 200 white sphere stars

// Set up Background
const spaceTexture = new THREE.TextureLoader().load('space.jpg'); // use background space image
scene.background = spaceTexture;

// Avatar Cube image that spins as you scroll
const patTexture = new THREE.TextureLoader().load('Headshot-Professional.jpg'); // use my headshot

const pat = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: patTexture })); // create 3D cube

scene.add(pat); // add 3D cube with my headshot on each side to scene

// Set up spinning Moon
const moonTexture = new THREE.TextureLoader().load('moon.jpg'); // use image of moon surface
const normalTexture = new THREE.TextureLoader().load('normal.jpg'); // use extra texturing image too

// create 3D sphere mesh with moon and extra texturing wrapped around it
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon); // add moon to scene

// set position of moon
moon.position.z = 30;
moon.position.setX(-10);

// set position of cube headshot
pat.position.z = -5;
pat.position.x = 2;

// Scroll Animation
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  // define moon rotation rate as user scrolls
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  // define 3D headshot cube rotation rate as user scrolls
  pat.rotation.y += 0.01;
  pat.rotation.z += 0.01;

  // define camera position as user scrolls
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

// as user scrolls, call moveCamera()
document.body.onscroll = moveCamera; 
moveCamera();

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();
