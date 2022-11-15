import * as THREE from '../libs/three.module.js';
import { OrbitControls } from '../libs/OrbitControls.js';
import { GUI } from '../libs/dat.gui.module.js';



let aspectRatio = (window.innerWidth / window.innerHeight);
let scene, camera, renderer, controls;
const group = new THREE.Group();
const listener = new THREE.AudioListener();
const sound = new THREE.Audio( listener );
const posSound = new THREE.PositionalAudio ( listener );



const cube = new THREE.Mesh(
   new THREE.BoxGeometry(),
   new THREE.MeshBasicMaterial({color:0xf0f099, wireframe:true})
)


// Create Scene

function createScene() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color('grey');
  scene.add(cube);
}

// Create Content
//
function createCamera() {
  camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
  camera.position.z = 2;
  controls = new OrbitControls(camera, renderer.domElement);
  camera.add( listener );
}


function createAmbientSound(){
   const audioLoader = new THREE.AudioLoader();
   audioLoader.load('../assets/stream.mp3', function (buffer) {
   sound.setBuffer(buffer);
   sound.setLoop(true);
   sound.setVolume(0.25);
   sound.play();
});
}

function createPositionSound(){
   const audioLoader2 = new THREE.AudioLoader();
   audioLoader2.load ('../assets/music.mp3', function (buffer) {
     posSound.setBuffer( buffer)
     posSound.setRefDistance( 10 )
   });
  cube.add(posSound);
}

function createGeometry() {
  const box1 = new THREE.Mesh(
     new THREE.BoxGeometry(1,1,1),
     new THREE.MeshBasicMaterial({color: 0xff0000})
   );
  box1.position.x = -2;

  const box2 = new THREE.Mesh(
      new THREE.BoxGeometry(1,1,1),
      new THREE.MeshBasicMaterial({color: 0x00ff00})
    );
  box2.position.x = 0;

  const box3 = new THREE.Mesh(
       new THREE.BoxGeometry(1,1,1),
       new THREE.MeshBasicMaterial({color: 0x0000ff})
     );
  box3.position.x = 2;


  scene.add(group);
  group.add(box1);
  group.add(box2,box3);


}

group.position.y = 2;
group.rotation.y = .35;
group.scale.y = 1;


//////////////////////////////////

// Renderer, Utils, Animate, Init
function createRenderer() {
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 1.0);
  document.body.appendChild(renderer.domElement);
}

function createUtils(){

// Axes Helper
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);


// GUI
  const gui = new GUI();

  const soundFolder = gui.addFolder("Positional Audio");
  const playObj = { play:function(){ posSound.play() }};
  const stopObj = { stop:function(){ posSound.stop() }};

  soundFolder.add(stopObj,'stop');
  soundFolder.add(playObj,'play');

  soundFolder.add(cube.position, "x", -5, 5, .001).name("Panner");
  soundFolder.open()
  const allAudioFolder = gui.addFolder("All Audio");

  const muteObj = { stop:function(){
    posSound.isPlaying || sound.isPlaying ? listener.setMasterVolume(0) : listener.setMasterVolume(1) }};
  allAudioFolder.add(muteObj,'stop').name("Mute All");
  allAudioFolder.open()
}


function animate() {
  window.requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

function init() {
  createRenderer();
  createCamera();
  createScene();
  createGeometry();
  createAmbientSound();
  createPositionSound();
  createUtils();
  animate();
}

init();
