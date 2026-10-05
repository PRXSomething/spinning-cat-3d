import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.159.0/build/three.module.js';

const canvas = document.querySelector('#scene');

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x070d1f, 8, 22);

const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 1.8, 8.5);

const ambient = new THREE.HemisphereLight(0xcfe7ff, 0x18263f, 1.4);
scene.add(ambient);

const keyLight = new THREE.DirectionalLight(0xfff3cc, 2.2);
keyLight.position.set(5, 6, 4);
scene.add(keyLight);

const rimLight = new THREE.DirectionalLight(0x8ec5ff, 1.4);
rimLight.position.set(-6, 3, -5);
scene.add(rimLight);

const floor = new THREE.Mesh(
  new THREE.CircleGeometry(7, 64),
  new THREE.MeshStandardMaterial({
    color: 0x1b2449,
    transparent: true,
    opacity: 0.9,
    roughness: 0.9,
    metalness: 0.15,
  })
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -2.3;
scene.add(floor);

const glow = new THREE.Mesh(
  new THREE.RingGeometry(2.5, 5.0, 64),
  new THREE.MeshBasicMaterial({
    color: 0x7dbaff,
    transparent: true,
    opacity: 0.18,
    side: THREE.DoubleSide,
  })
);
glow.rotation.x = -Math.PI / 2;
glow.position.y = -2.28;
scene.add(glow);

const cat = new THREE.Group();
scene.add(cat);

const furMaterial = new THREE.MeshStandardMaterial({
  color: 0xf7c38a,
  roughness: 0.8,
  metalness: 0.1,
});

const darkFurMaterial = new THREE.MeshStandardMaterial({
  color: 0xe1a06d,
  roughness: 0.85,
  metalness: 0.05,
});

const muzzleMaterial = new THREE.MeshStandardMaterial({
  color: 0xf6d7c2,
  roughness: 0.95,
});

const noseMaterial = new THREE.MeshStandardMaterial({
  color: 0xf77a7a,
  roughness: 0.8,
});

const eyeMaterial = new THREE.MeshStandardMaterial({
  color: 0x1a1b22,
  roughness: 0.6,
});

const eyeWhiteMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  roughness: 0.5,
});

// Body
const body = new THREE.Mesh(new THREE.SphereGeometry(1.28, 32, 32), furMaterial);
body.scale.set(1.55, 1.1, 1.25);
body.position.set(0, 0, 0);
cat.add(body);

// Belly
const belly = new THREE.Mesh(new THREE.SphereGeometry(0.8, 24, 24), new THREE.MeshStandardMaterial({
  color: 0xf8e0d6,
  roughness: 0.9,
}));
belly.scale.set(1.2, 1.2, 0.9);
belly.position.set(0.2, -0.5, 0);
cat.add(belly);

// Head
const head = new THREE.Mesh(new THREE.SphereGeometry(0.78, 28, 28), furMaterial);
head.position.set(1.95, 0.9, 0);
head.scale.set(1.08, 1.0, 1.0);
cat.add(head);

// Muzzle
const muzzle = new THREE.Mesh(new THREE.SphereGeometry(0.42, 20, 20), muzzleMaterial);
muzzle.scale.set(1.7, 1.15, 1.15);
muzzle.position.set(2.9, 0.55, 0);
cat.add(muzzle);

// Nose
const nose = new THREE.Mesh(new THREE.SphereGeometry(0.11, 12, 12), noseMaterial);
nose.position.set(3.53, 0.66, 0);
cat.add(nose);

// Eyes with whites
const eyeWhiteLeft = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 12), eyeWhiteMaterial);
eyeWhiteLeft.position.set(2.35, 1.02, 0.22);
cat.add(eyeWhiteLeft);

const leftEye = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 12), eyeMaterial);
leftEye.position.set(2.37, 1.02, 0.24);
cat.add(leftEye);

const eyeWhiteRight = eyeWhiteLeft.clone();
eyeWhiteRight.position.z = -0.22;
cat.add(eyeWhiteRight);

const rightEye = leftEye.clone();
rightEye.position.z = -0.24;
cat.add(rightEye);

// Ears
const earGeometry = new THREE.ConeGeometry(0.2, 0.4, 10);
const leftEar = new THREE.Mesh(earGeometry, darkFurMaterial);
leftEar.position.set(1.8, 1.75, 0.28);
leftEar.rotation.z = -0.2;
cat.add(leftEar);

const rightEar = leftEar.clone();
rightEar.position.z = -0.28;
rightEar.rotation.z = 0.2;
cat.add(rightEar);

// Whiskers
const whiskerMaterial = new THREE.MeshStandardMaterial({ color: 0xf6f0f0, roughness: 0.7 });
const whiskerGeometry = new THREE.CylinderGeometry(0.01, 0.01, 0.6, 6);

for (let side of [-1, 1]) {
  const whiskerGroup = new THREE.Group();
  for (let i = 0; i < 3; i++) {
    const whisker = new THREE.Mesh(whiskerGeometry, whiskerMaterial);
    whisker.rotation.z = (side * (Math.PI / 2)) - 0.18 + i * 0.08;
    whisker.rotation.x = 0.1 + i * 0.08;
    whisker.position.set(3.0 + i * 0.05, 0.7 + i * 0.02, side * (0.16 + i * 0.12));
    whiskerGroup.add(whisker);
  }
  cat.add(whiskerGroup);
}

// Paws
const pawGeometry = new THREE.CapsuleGeometry(0.12, 0.5, 4, 8);
const pawMaterial = new THREE.MeshStandardMaterial({ color: 0xdd9f6d, roughness: 0.82 });

for (const x of [-0.7, 0.7]) {
  for (const z of [-0.7, 0.7]) {
    const paw = new THREE.Mesh(pawGeometry, pawMaterial);
    paw.position.set(x, -1.4, z);
    paw.rotation.z = x * 0.2;
    cat.add(paw);
  }
}

// Tail
const tailCurve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-1.2, 0.2, 0),
  new THREE.Vector3(-2.1, 0.7, 0.4),
  new THREE.Vector3(-3.0, 1.2, 0.2),
  new THREE.Vector3(-3.7, 0.5, 0),
]);
const tail = new THREE.Mesh(
  new THREE.TubeGeometry(tailCurve, 32, 0.09, 10, false),
  darkFurMaterial
);
cat.add(tail);

const tailTip = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 12), darkFurMaterial);
tailTip.position.set(-3.85, 0.55, 0);
cat.add(tailTip);

// Mask marking
const mask = new THREE.Mesh(
  new THREE.SphereGeometry(0.24, 12, 12),
  new THREE.MeshStandardMaterial({ color: 0xd78670, roughness: 0.8 })
);
mask.position.set(3.2, 0.85, 0);
cat.add(mask);

const catPivot = new THREE.Group();
catPivot.add(cat);
scene.add(catPivot);

const mouse = { x: 0, y: 0 };
const clock = new THREE.Clock();
let spinVelocity = 0;
let lastMouseMoveTime = 0;

window.addEventListener('pointermove', (event) => {
  const nx = (event.clientX / window.innerWidth) * 2 - 1;
  const ny = -(event.clientY / window.innerHeight) * 2 + 1;
  mouse.x = nx;
  mouse.y = ny;

  lastMouseMoveTime = performance.now();
  spinVelocity = 8;
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

function animate() {
  const t = clock.getElapsedTime();
  const timeSinceMoveMs = performance.now() - lastMouseMoveTime;

  if (timeSinceMoveMs > 500) {
    spinVelocity *= 0.94;
    if (spinVelocity < 0.02) spinVelocity = 0;
  }

  const driftX = THREE.MathUtils.lerp(catPivot.rotation.x, mouse.y * 0.9, 0.06);
  const driftY = THREE.MathUtils.lerp(catPivot.rotation.y, mouse.x * 1.2, 0.06);

  catPivot.rotation.x = driftX;
  catPivot.rotation.y = driftY + (spinVelocity * t * 0.33);

  cat.rotation.z = Math.sin(t * 1.2) * 0.08;
  cat.rotation.x = Math.sin(t * 0.8) * 0.05;
  cat.position.y = Math.sin(t * 1.5) * 0.06;
  cat.position.x = Math.sin(t * 1.1) * 0.05;

  camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 1.5, 0.03);
  camera.position.y = THREE.MathUtils.lerp(camera.position.y, 1.8 + mouse.y * 0.7, 0.03);
  camera.lookAt(0, 0.2, 0);

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
