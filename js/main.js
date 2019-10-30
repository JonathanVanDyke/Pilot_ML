let camera, sceneHUD, cameraHUD, rotateAngle, renderer, scene, player, bullets, bulletsBlock, input, environment, _vector, clock, lastTimeStamp;
let player2 = { id: null, x: 0, y: 0, z: 0, ph: 0 };
let serverPackage = [];
let player2Data = {id: null, x: 0, y: 0, z: 0, ph: 0};
let bulletCount = 0;
let j = 0;
let radar;
let p1radar;
p1radar = {position: {x: 0, y: 0, z: 0}};
let p2radar;
p2radar = {position: {x: 0, y: 0, z: 0}};
let hpBar, hpTxt = { position: { x: 0, y: 0, z: 0 } };;
let hpBar2, hp2Txt = { position: { x: 0, y: 0, z: 0 } };;

let RELOAD = 1000; 

var stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
// document.body.appendChild(stats.dom);

function reset() {

  setTimeout(() => {
    player.hp = 20;
    player2.hp = 20;
    let pointEle = document.getElementById('points')
    player.points2 += 1;
    pointEle.innerHTML = `Score: ${player.points2}`
    // player.position.set(0, 20, 0);
    // player2.position.set(0, 20, 0);
    // location.reload()
    // animate().reset();
  }, 0);
  // animate();
  // requestAnimationFrame(animate);
}

function init() {
  //Crosshair
  crosshair = document.createElement('h1');
  crosshair.id = 'cross'
  crosshair.style.cssText = `
  position: absolute;
  left: 49.75%;
  font-size: 10px;
  font-family: fantasy;
  top: 40%;
  `;
  document.body.appendChild(crosshair);
  crosshair.innerHTML = 'X'
  

  // 201 
  Physijs.scripts.worker = './lib/physijs_worker.js';
  Physijs.scripts.ammo = './lib/ammo.js';

  // 02
  //RENDERER INPUT, SCENE (virtual environment)/CAMERA 
  // let scene = new THREE.Scene();
  scene = new Physijs.Scene;

  // let scene = new Physijs.Scene({ reportsize: 50, fixedTimeStep: 1 / 20 }); //Slow down scene to fix rotation bug
  scene.setGravity(new THREE.Vector3(0, -15, 0));
  {
    const color = 'black';  // white
    const near = 90;
    const far = 300;
    scene.fog = new THREE.Fog(color, near, far);
  }
  scene.background = new THREE.Color('skyblue');

  createCamera();
  createLights();
  createMeshes();
  createRenderer();


  //202
  //Bullets
  // bullets = new Bullets();
  // let bulletsBlockGeometry = new THREE.SphereGeometry(1, 1, 1); //PRIMITIVE SHAPE AND SIZE
  // let bulletsBlockMaterial = new THREE.MeshLambertMaterial({ color: 0xff00C2 }); //COLOR OF MESH
  // bulletsBlock = new Physijs.BoxMesh(bulletsBlockGeometry, bulletsBlockMaterial); //MESH POINTS MAT TO GEOMETRY

  // 101
  //INPUT OBJECT
  input = new Input();

  // 001
  // Environment
  // environment = new Environment();



  // 05
  //MAKE WINDOW RESPONSIVE ON RESIZE
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
  })

  // 06
  //RAYCASTER => VECTOR 'RAY'... RAY === Array? (like vector array?)
  let raycaster = new THREE.Raycaster();
  let mouse = new THREE.Vector2();


  // 09
  //RENDER LOOP
  // 102
  //Normalize animation loop
  lastTimeStamp = 0;

  clock = new THREE.Clock();
  _vector = new THREE.Vector3(0, 0, 0)


  // debugger
  // socket.emit('init', {
  //   id: socket.id,
  //   x: player.position.x,
  //   y: player.position.y,
  //   z: player.position.z,
  //   h: player.rotation.y,
  //   pb: player.rotation.y
  // });


}

function createCamera() {
  camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    300
  );
  // debugger

  camera.position.set(0, 6, 10);
  camera.rotation.x = -.2
}

function createLights() {
  // 08
  //LIGHT ONE
  let light1 = new THREE.DirectionalLight(0xFFFFFF, 2);
  light1.position.set(0, 20, 25)
  scene.add(light1)

  //LIGHT TWO
  let light2 = new THREE.AmbientLight(0xaaaaaa, 1);
  light2.position.set(0, 0, 25)
  scene.add(light2)

  
  // const ambientLight = new THREE.HemisphereLight(
  //   0xddeeff,
  //   0x202020,
  //   .5,
  // );
  // scene.add(ambientLight)

}

function createMeshes() {
  // 07
  //ELEMENT ONE (**LOOK UP MATERIAL OPTIONS**)
  // let playerGeometry = new THREE.BoxBufferGeometry(5, 8, 5, 0); //PRIMITIVE SHAPE AND SIZE (set 3rd val to 111 for cat paw)
  // let playerMaterial = new THREE.MeshLambertMaterial({
  //   color: 0x22CAC2,
  //   opacity: 1.0,
  //   // visible: false,
  // }); //COLOR OF MESH
  // let playerGeometry = new THREE.SphereGeometry(1, 1, 0); //PRIMITIVE SHAPE AND SIZE
  // let playerMaterial = new THREE.MeshLambertMaterial({ color: 0xff00C2 }); //COLOR OF MESH

  let playerGeometry = new THREE.ConeBufferGeometry(1, 2, 5);
  let playerMaterial = new THREE.MeshLambertMaterial({
    color: 0xff00C2,
    opacity: 0.5,
    transparent: true,
  })
  // p1radarGeometry.rotateX(-Math.PI / 2)



  // let player = new THREE.Mesh(playerGeometry, playerMaterial); //MESH POINTS MAT TO GEOMETRY
  player = new Physijs.BoxMesh(playerGeometry, playerMaterial); //MESH POINTS MAT TO GEOMETRY
  player.position.set(0, 1, 0);
  player.name = 'player';
  player.hp = 20;
  player.add(camera)

  
  let player2Geometry = new THREE.CubeGeometry(5, 8, 5, 0);
  let player2Material = new THREE.MeshLambertMaterial({
    color: 0x22CAC2,
    opacity: 0.0,
  })

  player2 = new Physijs.BoxMesh(playerGeometry, playerMaterial);

  player2.hp = 20;
  scene.add(player)
}

function createRenderer() {
  // 03
  //INSTANCE OF RENDERER
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // renderer.gammaFactorw

  renderer.physicallyCorrectLights = true;
  // renderer.setClearColor("#e5e5e5"); //BACKGROUND COLOR
  
  


  document.body.appendChild(renderer.domElement);
}




let animate = function (timeStamp) {
  stats.begin();

  
  player.setAngularFactor(_vector);
  player.setAngularVelocity(_vector);
  // player.setLinearVelocity(new THREE.Vector3(0, 0, 0));

  let delta = clock.getDelta(); // seconds
  // console.log(clock.getElapsedTime())
  let moveDistance = 200 * delta; // 200 pixels per second
  rotateAngle = Math.PI / 2 * delta; // pi/2 radians (90 deg) per sec

  let time = document.getElementById('time')
  // time.innerHTML = `Time: ${Math.floor(clock.elapsedTime * 100)}`
  // let socketData = 'nope';
  // time.innerHTML = `Time: ${socketData}`

  let start = requestAnimationFrame(animate);

  //!Comment in for time challenge!!!
  // if (Math.floor(clock.elapsedTime * 100) >= RELOAD) {
  //   let pointEle = document.getElementById('points')
  //   // pointEle.className= 'finalpoint';
  //   pointEle.style = 'color: red; position: absolute; top: 20%; left: 40%; padding: 10px; border: 5px solid black;';
  //   pointEle.innerHTML = `Final Score: ${player.points}`
  //   // pointEle.style = `align: center;`
  //   cancelAnimationFrame(start);
  //   reset(animate);
  // }

  let timeDelta = (timeStamp - lastTimeStamp)/1000;
  lastTimeStamp = timeStamp;

  let movementSpeed = 12 * timeDelta;


  //BOOST
  let boost = 1;
  if (input.isShiftPressed) {
    boost = 10 * movementSpeed;
    // boost = 1
  }

  let playerSpeed = movementSpeed * boost * 2;
  
  //LEFT
  if (input.isLeftPressed) {
    player.__dirtyPosition = true;
    player.__dirtyRotation = true;
    player.setLinearVelocity(_vector);
    player.translateOnAxis(new THREE.Vector3(playerSpeed * 100, 0, 0), -rotateAngle)

    // player.position.x -= Math.sin(player.rotation.y + Math.PI / 2) * playerSpeed;
    // player.position.z -= Math.cos(player.rotation.y + Math.PI / 2) * playerSpeed;
  }
  //RIGHT
  if (input.isRightPressed) {
    player.__dirtyPosition = true;
    player.__dirtyRotation = true;
    player.setLinearVelocity(_vector);
    player.translateOnAxis(new THREE.Vector3(-playerSpeed * 100, 0, 0), -rotateAngle)

    // player.position.x += Math.sin(player.rotation.y + Math.PI / 2) * playerSpeed;
    // player.position.z += Math.cos(player.rotation.y + Math.PI / 2) * playerSpeed;
  }
  //JUMP  
  if (input.isSpacePressed) {
    player.__dirtyPosition = true;
    player.__dirtyRotation = true;
    player.setLinearVelocity(_vector);
    player.setAngularFactor(_vector);
    player.setAngularVelocity(_vector);
    player.translateOnAxis(new THREE.Vector3(0, -movementSpeed * 100, 0), -rotateAngle)
    // player.position.y += playerSpeed*2;
  }

  if(input.isXPressed) {
    player.__dirtyPosition = true;
    player.__dirtyRotation = true;
    if (player.position.y > 4.5) {
      player.translateOnAxis(new THREE.Vector3(0, movementSpeed * 100, 0), -rotateAngle)
      player.setAngularFactor(_vector);
      player.setAngularVelocity(_vector);
    }
  }

  //FWD 


  if (input.isFwdPressed) {
    player.__dirtyPosition = true;
    player.__dirtyRotation = true;
    player.setAngularFactor(_vector);
    player.setAngularVelocity(_vector);
    player.setAngularFactor(_vector);
    player.setLinearVelocity(_vector);

    player.translateOnAxis(new THREE.Vector3(0, 0, playerSpeed*100), -rotateAngle)
    // console.log(player.getWorldQuaternion())
 


    // delete3DOBJ('bullet');
    
    // player.position.x -= Math.sin(player.rotation.y) * playerSpeed;
    // player.position.z -= Math.cos(player.rotation.y) * playerSpeed;
  }
  //BACK 
  if (input.isBwdPressed) {
    player.__dirtyPosition = true;
    player.__dirtyRotation = true;
    player.setLinearVelocity(_vector);
    player.translateOnAxis(new THREE.Vector3(0, 0, -playerSpeed * 100), -rotateAngle)

    // player.position.x += Math.sin(player.rotation.y) * playerSpeed;
    // player.position.z += Math.cos(player.rotation.y) * playerSpeed;
  }
  //RotLeft
  if (input.isRLPressed) {
    // player.rotation.y += playerSpeed/4;
    player.rotateOnAxis(new THREE.Vector3(0, 1, 0), +0.05); 
    player.setLinearVelocity(_vector);
    // console.log(player.rotateOnAxis)
    player.__dirtyPosition = true;
    player.__dirtyRotation = true;
  }
  //RotRight
  if (input.isRRPressed) {

    player.rotateOnAxis(new THREE.Vector3(0, 1, 0), -0.05); 
    player.setLinearVelocity(_vector);
    player.__dirtyPosition = true;
    player.__dirtyRotation = true;
  }

  
  //Player BULLETS
  if (input.isFirePressed) {

    player.setAngularFactor(_vector);
    player.setAngularVelocity(_vector);
  }

  //Player2 BULLETS
  if (player2.firing) {

    player2.setAngularFactor(_vector);
    player2.setAngularVelocity(_vector);
  }


  scene.simulate();
  // renderer.render(sceneHUD, cameraHUD)
  renderer.render(scene, camera);
  stats.end();


};

init();

// 11 
//...10 is mouse event listener, 12 is adding listener to window)...
// CALL RENDER LOOP
animate();