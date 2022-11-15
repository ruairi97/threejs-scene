Ruairí Horgan 116458276 ReadMe 

Quad Model: Featured (see function loadModel()). 
At least 2 independently animated characters: Three character featureds. See: Mutant, man and robofloat. All include keyframe animation. 
Ground floor: Plane with added image. 
Shadows: Cast and receive shadows used with shadows enabled. 
Billboard: Featured (see function loadBillboard())
At least 3 different light types: Ambient Light, Directional light and Hemisphere light used. HDRI also included. 
Spatial Sound: Featured (see function createPosN). 
Three fragment shaders: Featured: See s1, s2, s3 in js script. 
Code: Comments throughout. 
Function Calls: Many printed to console. 
Stats.js: Audio toggle buttons included.  
WebXR: Featured. 
Bonus: Characters use 3rd party library (all from Mixamo). 

General Info 
For this scene I wanted to author a dystopian, barren sci-fi future. The inspiration behind this came from Denis Villeneuve's visual interpretation of Frank Herberts’s world from ‘Dune’ and his contribution to the Blade Runner series with ‘Blade Runner: 2049’. After implanting the UCC quad model dae file with the Collada Loader, I decided to first add a plane as a ground floor. 

I added an image texture of a hard cracked desert floor to give the scene the barren feel I wanted. To further add to this, I implemented a HDRI of a desert background. I turned down the exposure significantly as I wanted to make sure I could implement shadows successfully later on. For lighting, I added a small bit of ambient light. I added in directional light and it set in such a way so that it can mimic a sun. Finally I added a hemisphere light. I also enabled shadows and once I imported more models I set them so they would cast and receive shadows. 

I added three sci fi characters to the scene. When downloading them from Mixamo, I made sure I had a keyframe animation attached so they would animate successfully. I imported them using FBXLoader and I added a clock to the scene to make sure the characters would animate. As I enjoy ambient music, I decided to download an ambient track to be used as ambient background noise to further give a sci-feel to the scene. Next I wanted to incorporate positional audio. I decided I want to give talking sound for the mutant. Once I found a suitable sound, I created a sphere object and implemented it in to the centre of the scene (close to where the alien is standing) and gave it a wireframe mesh so it would be less noticeable. It now appeared as if the mutant was making noise. 

Once again taking inspiration from the work of Denis Villeneuve, I wanted to implemented a large figure that towers of the characters in a barren space. To do so, I decided to implement a FBX model of a large alien head-mount into the scene. For the billboard I used (THREE.PlaneGeometry()). In my html file I added a video id for a copyright free video file I took from pexels and implemented it onto the billboard. I chose one that I felt suited the scene. I was happy with how the models I imported casted shadows from the sun. In particular, I position the alien head-mount in such a way so it would have its face covered in deep shadow and it would cast a large strong shadow. This gave it a towering, menacing presence. 

For the shaders I wanted to implement them onto spheres. The inspiration behind this came from the sci-fi themed album of the same name by a band I enjoy called ‘Pestilence’. In my html script, I created a vertex shader and a fragment shader using the type="x-shader/x-fragment" tag. Next I created three spheres that uses these tags in three separate functions Each sphere was alternated and changed to give them all a different look. As well as this, I wanted to give them a continuous animation so I made a function unique from the others as it uses an infinite loop. For each sphere (mesh) I animated in them in different ways. 

I added a function called createUtils so I could add a fps monitor to the scene to count how many frames per second the animation was occurring at. I also added a widget to start and stop the positional audio. As well as this, the audio can be muted. An axis helper is also featured in this function. 

Imported works (AssetsA) + Libraries Used (LibsA)

ASSETS

talkingalien.wav- https://freesound.org/people/TRXone/sounds/266838/ (by TRXone)

ambientscifi.fbx- https://freesound.org/people/onderwish/sounds/468407/ (by onderwish)

goegap_4k.hdr- https://polyhaven.com/a/goegap (by Greg Zaal)

desert.jpeg- https://www.dreamstime.com/shot-dry-cracked-desert-floor-shot-dry-cracked-desert-floor-parched-lack-water-image104219740 (by Bill H)

alienhm.fbx- https://www.turbosquid.com/3d-models/alien-printing-3d-model-1366450 (by MorenoB)

mutantturn.fbx- https://www.mixamo.com/#/?page=1&query=mutant&type=Motion%2CMotionPack (by Mixamo- downloaded with skin attached)

robofloat.fbx- https://www.mixamo.com/#/?page=1&query=float&type=Motion%2CMotionPack (by Mixamo- downloaded with skin attached (skin by T. Choonyung))

manlooking.fbx- https://www.mixamo.com/#/?page=1&query=looking&type=Motion%2CMotionPack (by Mixamo- downloaded with skin attached)

scifivid.mp4- https://www.pexels.com/video/woman-wearing-dystopian-costume-7651117/ (by Anna Tarazevich)

LIBRARIES 

three.module.js

OrbitControls.js

ColladaLoader.js

RGBELoader.js

FBXLoader.js

NURBSCurve.js

VRButton.js

build/dat.gui.module.js

stats.module.js

All libs are taken from the 'three.js-dev' folder by mrdoob (https://github.com/mrdoob/three.js/)