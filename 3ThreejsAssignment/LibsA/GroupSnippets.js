// Class
Group()


// Creating A Group and Adding it to the Scene
const group = new THREE.Group();
scene.add(group);


// Creating content to be grouped
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


// Add the content to the group

group.add(box1);
group.add(box2,box3);


// Modify the Group of objects as one collection
group.position.y = 1;
group.roation.y = 1;
group.scale.y = 2;


// AxesHelper

const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);
