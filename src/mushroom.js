import * as THREE from "three";

export default function mushroom() {
  const textureLoader = new THREE.TextureLoader();
  const mushroomTexture = textureLoader.load("./shroom.jpg");

  const capMaterial = new THREE.MeshStandardMaterial({
    map: mushroomTexture,
    roughness: 5,
    metalness: -1,
  });

  const capGeometry = new THREE.SphereGeometry(
    0.5,
    32,
    32,
    0,
    Math.PI * 2,
    0,
    Math.PI / 2.1
  );

  const cap = new THREE.Mesh(capGeometry, capMaterial);
  cap.position.y = -2.5;

  const stemTexture = textureLoader.load("./stem.jpg");

  const stemMaterial = new THREE.MeshStandardMaterial({
    map: stemTexture,
    roughness: 0,
    metalness: -0.3,
  });

  const stemGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1, 8);
  const stem = new THREE.Mesh(stemGeometry, stemMaterial);
  stem.position.y = -2.95;

  return { stem, cap };
}
