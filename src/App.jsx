import "./App.css";
import { useEffect, useRef } from "react";
import Ground from "./Ground";
import mushroom from "./mushroom";
import * as THREE from "three";

function App() {
  const refContainer = useRef(null);
  useEffect(() => {
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    refContainer.current &&
      refContainer.current.appendChild(renderer.domElement);

    const { stem, cap } = mushroom();
    scene.add(stem, cap);
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    camera.position.z = 5;

    var animate = function () {
      requestAnimationFrame(animate);
      stem.rotation.y += 0.05;
      cap.rotation.y += 0.05;
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup on unmount, otherwise stuff will linger in GPU
    return () => {
      renderer.forceContextLoss();
      renderer.dispose();
      stem.geometry.dispose();
      stem.material.dispose();
      cap.geometry.dispose();
      cap.material.dispose();
      refContainer.current.children[0].remove();
    };
  }, []);

  return (
    <div className="app">
      <div className="container" ref={refContainer}></div>
      <Ground />
    </div>
  );
}

export default App;
