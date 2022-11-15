// import necessary libraries
import * as THREE from './LibsA/three.module.js';
import { OrbitControls } from './LibsA/OrbitControls.js';
import { ColladaLoader } from './LibsA/ColladaLoader.js';
import { RGBELoader } from './LibsA/RGBELoader.js';
import { FBXLoader } from './LibsA/FBXLoader.js';
import { NURBSCurve } from './LibsA/NURBSCurve.js';
import { VRButton } from './LibsA/VRButton.js';
import { GUI } from './LibsA/build/dat.gui.module.js';
import { FlakesTexture } from './LibsA/FlakesTexture.js';
import Stats from './LibsA/stats.module.js';

// Variables listed here
let aspectRatio = (window.innerWidth / window.innerHeight);
let scene, camera, renderer, controls;
const container = document.getElementById( 'container' );
const listener = new THREE.AudioListener();
const sound = new THREE.Audio( listener );
const sound1 = new THREE.PositionalAudio( listener );
const clock = new THREE.Clock();
let mixer, mixer2, mixer3, fbxLoader;
let mesh, mesh2, mesh3;

// stats and fps panel
const stats = Stats();



// sphere created to be used for postional audio
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(2, 32, 2),
  new THREE.MeshBasicMaterial({color:0xffffff, wireframe:true})
)

//Functions
function createScene() {
  scene = new THREE.Scene();
  scene.add(sphere);
  console.log('Screen created.');
}


// camera is created here
function createCamera() {
  camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
  camera.position.x = 42;
  camera.position.y = 20;
  camera.position.z = 42;
  controls = new OrbitControls(camera, renderer.domElement);
  camera.add(listener);
  console.log('Camera created.');
}

// render created here, shadows are enabled and hdri tone mapping is completed
function createRenderer() {
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.13;
  renderer.outputEncoding = THREE.sRGBEncoding
  document.body.appendChild(renderer.domElement);
  console.log('Scene Rendered.');
}

// ambient lighting, hemisphere lighting and directional lighting is created
 function createLighting() {
  const ambLight = new THREE.AmbientLight(0xece1bc, 0.6);
  ambLight.castShadow = true;
  scene.add(ambLight);

  const hLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.8 );
  hLight.castShadow = true;
  scene.add( hLight );



  const dirLight = new THREE.DirectionalLight(0xece1bc, 3.5);
  dirLight.position.set(0, 1, 1);
  dirLight.position.multiplyScalar( 200);
  const dirLightHelper = new THREE.DirectionalLightHelper(dirLight, 3);
  scene.add(dirLight);
  // scene.add(dirLightHelper); // Please turn this on to see positoning of light source
  dirLight.castShadow = true;
  dirLight.shadowMapWidth = dirLight.shadowMapHeight = 1024*2;

  const dir = 300;

  dirLight.shadowCameraLeft = -dir;
  dirLight.shadowCameraRight = dir;
  dirLight.shadowCameraTop = dir;
  dirLight.shadowCameraBottom = -dir;

  dirLight.shadowCameraFar = 3500;
  dirLight.shadowBias = -0.0001;


}

// function used to load HDRI as a background
function hdriBG () {
  var loader = new RGBELoader ();

  loader.load("./AssetsA/goegap_4k.hdr", function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    scene.environment = texture;

  });
  console.log('Lighting created.');
}


// Plane added to create ground floor, plane is rotated
function createFloor () {
const planeImage = new THREE.TextureLoader().load('./AssetsA/desert.jpg');
const geo = new THREE.PlaneBufferGeometry(500, 500, 1, 1);
const mat = new THREE.MeshStandardMaterial({ map: planeImage, side: THREE.DoubleSide });
const plane = new THREE.Mesh(geo, mat);
plane.rotation.x += Math.PI / 2;
plane.rotation.z = 4.25;
plane.position.set(-30, 0, -30);
plane.traverse(function(child){
  if(child.isMesh){
    child.castShadow = true;
    child.receiveShadow = true;
  }
});
scene.add(plane);
console.log('Floor created.');

}

// qm = quad model
// function to load models using collada and FBXLoader
function loadModel() {
  // first collada loader is used to import quad model
  var loader = new ColladaLoader();

  loader.load('./AssetsA/UCC_Quad_Model_DAE/quad.dae', function (collada){
    const qm = collada.scene;
    qm.position.set(0,0,0);
    qm.scale.set(0.1, 0.1, 0.1);
    qm.updateMatrix();
    scene.add(qm);
    });
    console.log("Quad Loaded");

    // FBXLoader is used for all characters and their animations
    // mutant is added
    const loader2 = new FBXLoader();
    loader2.load('./AssetsA/mutantturn.fbx', function (object) {
      const mutant = object;
      mixer = new THREE.AnimationMixer(object);

      const action = mixer.clipAction(mutant.animations[0]);
      action.play();

      mutant.position.set(0,0,-20);
      mutant.scale.set(0.12,0.12,0.12);
      object.traverse(function(child){
        if(child.isMesh){
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      scene.add(mutant);

    });

    // man is added
    const loader3 = new FBXLoader();
    loader3.load('./AssetsA/manlooking.fbx', function (object) {
      const man = object;
      mixer2 = new THREE.AnimationMixer(object);

      const action2 = mixer2.clipAction(man.animations[0]);
      action2.play();

      man.position.set(0,0,20);
      man.scale.set(0.08,0.08,0.08);
      man.rotation.y = 160;
      object.traverse(function(child){
        if(child.isMesh){
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

    scene.add(man);

  });

// alienhm = alien head-mount
// alien head-mount is added
const loader5 = new FBXLoader();
loader5.load('./AssetsA/alienhm.fbx', function (object) {
  const alienhm = object;

  alienhm.position.set(-65,0,0);
  alienhm.rotation.y = 90;
  alienhm.scale.set(0.4, 0.4, 0.4);
  object.traverse(function(child){
    if(child.isMesh){
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

scene.add(alienhm);

});

// robo is added
// positioned above the ground floating to replicate someone in a space with 0 gravity
const loader6 = new FBXLoader();
loader6.load('./AssetsA/robofloat.fbx', function (object) {
  const robo = object;
  mixer3 = new THREE.AnimationMixer(object);

  const action3 = mixer3.clipAction(robo.animations[0]);
  action3.play();

  robo.position.set(0, 35, -75);
  robo.scale.set(0.1, 0.1, 0.1);
  //man.rotation.y = 160;
  object.traverse(function(child){
    if(child.isMesh){
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

scene.add(robo);

});

console.log('Models Loaded');

}

// AN = Ambient Noise, function creates background music
function createAN(){
  const audLoader = new THREE.AudioLoader();
  audLoader.load( './AssetsA/ambientscifi.mp3', function( buffer ) {
  	sound.setBuffer( buffer );
  	sound.setLoop( true );
  	sound.setVolume( 0.3 );
  	sound.play();
  });
  console.log('Ambient Sound Loaded');
}

// PosN = Positional Noise, spatial audio used to create alien noises
function createPosN(){
  const audioLoader = new THREE.AudioLoader();
  audioLoader.load( './AssetsA/talkingalien.wav', function( buffer ) {
  	sound1.setBuffer( buffer );
  	sound1.setRefDistance( 20 );
  	sound1.play();
  });
  sphere.add(sound1);
  console.log('Alien Sound Loaded');
}

// billboard created using plane geometry and adding a video texture
function createBillboard(){
  const vid = document.getElementById('vid');
  const vidText = new THREE.VideoTexture(vid);
  const bbVid = new THREE.Mesh(
    new THREE.PlaneGeometry(150, 78, 1, 1),
    new THREE.MeshPhongMaterial({map:vidText, side:THREE.FrontSide}));
  bbVid.position.set(110, 80, 30);
  bbVid.rotation.set(0.34, -1.06, 0.3);
  scene.add( bbVid );
  vid.loop = true;
  vid.play();
  console.log('Vid Loaded');
}

// S1 = Sphere/Shader 1
// Function to created sphere with vertext and fragment shader attached
function createS1() {

  var shaderProp = {
    uniforms: {
      colour_dark : {type: "v4", value: new THREE.Vector4(0.2, 0.3, 1.0, 1.0)},
      temp: {type: "f", value: 1.0}
    },
    vertexShader: document.getElementById("vs").textContent,
    fragmentShader: document.getElementById("fs").textContent};

    var s1 = new THREE.SphereGeometry(5, 30, 5);
    var s1S =new THREE.ShaderMaterial(shaderProp);
    mesh = new THREE.Mesh( s1, s1S);

    mesh.position.set(-20, 40, 0);
    scene.add(mesh);
    console.log('S1 Added');

  }

  // S2 = Sphere/Shader 2
  // Function to created sphere with vertext and fragment shader attached
  function createS2() {

    var shaderProp2 = {
      uniforms: {
        colour_dark : {type: "v4", value: new THREE.Vector4(1.0, 2.0, 0.01, 0.4)},
        temp: {type: "f", value: 1.0}
      },
      vertexShader: document.getElementById("vs").textContent,
      fragmentShader: document.getElementById("fs").textContent};

      var s2 = new THREE.SphereGeometry(4, 20, 4);
      var s2S =new THREE.ShaderMaterial(shaderProp2);
      mesh2 = new THREE.Mesh( s2, s2S);

      mesh2.position.set(-40, 20, 0);
      scene.add(mesh2);
      console.log('S2 Added');
    }

    // S3 = Sphere/Shader 3
    // Function to created sphere with vertext and fragment shader attached
    function createS3() {

      var shaderProp3 = {
        uniforms: {
          colour_dark : {type: "v4", value: new THREE.Vector4(1.5, 0.8, 0.5, 0.5)},
          temp: {type: "f", value: 1.0}
        },
        vertexShader: document.getElementById("vs").textContent,
        fragmentShader: document.getElementById("fs").textContent};

        var s3 = new THREE.SphereGeometry(5, 60, 5);
        var s3S =new THREE.ShaderMaterial(shaderProp3);
        mesh3 = new THREE.Mesh( s3, s3S);

        mesh3.position.set(40, 70, 0);
        scene.add(mesh3);
        console.log('S3 Added');

      }

// GUI import used to create a control over the audio, user can mute all sound or start and stop positional sound
function createUtils(){
  // axes helper
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);
  // GUI
  const gui = new GUI();
  // Stats
  document.body.appendChild(stats.dom);
  // Spatial Sound toggle
  const soundFolder = gui.addFolder("Spatial Audio");
  const startS = { play:function(){ sound1.play() }};
  const stopS = { stop:function(){ sound1.stop() }};
  soundFolder.add(startS,'play');
  soundFolder.add(stopS,'stop');
  soundFolder.open()
  // Mute Audio option
  const fullAudioFolder = gui.addFolder("Full Audio");
  const muteA = { stop:function(){
    sound.isPlaying || sound1.isPlaying ? listener.setMasterVolume(0) : listener.setMasterVolume(1) }};
  fullAudioFolder.add(muteA,'stop').name("Mute Audio");
  fullAudioFolder.open()
}

// function to animate character models, the clock had to be implemented for this to be successful
// VR button is imported in and added here so that scene can be experienced in WebXR
function animate() {
  window.requestAnimationFrame(animate);
  stats.begin();
  renderer.render(scene, camera);

  const delta = clock.getDelta();
  if (mixer) mixer.update(delta);
  if (mixer2) mixer2.update(delta);
  if (mixer3) mixer3.update(delta);

  document.body.appendChild( VRButton.createButton( renderer ) );
  renderer.xr.enabled = true;
  renderer.setAnimationLoop( function () {
   renderer.render(scene, camera);
    });
  stats.end();
  }

// function to animate spheres so they turn continously, please note how it is featured in the initialise function
  function animateSpheres(){
    // s1
    mesh.rotation.x += 0.22;
    mesh.rotation.y += 0.22;
    mesh.rotation.z += 0.22;

    // s2
    mesh2.rotation.x += 0.5;
    mesh2.rotation.z += 0.7;

    // s3
    mesh3.rotation.x += 0.01;
    mesh3.rotation.y += 0.01;
    mesh3.rotation.z += 0.03;


    requestAnimationFrame(animateSpheres);
  }

// functions are initalised
function init() {
  createRenderer();
  createCamera();
  createScene();
  animate();
  loadModel();
  createLighting();
  createFloor();
  createBillboard();
  hdriBG();
  createAN();
  createPosN();
  createUtils();
  createS1();
  createS2();
  createS3();

  document.body.appendChild(renderer.domElement);
  animateSpheres();
}

init();
