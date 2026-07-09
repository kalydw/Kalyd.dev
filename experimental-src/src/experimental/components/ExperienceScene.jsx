import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createNoise3D } from 'simplex-noise';
import { useExperienceStore } from '../store/experienceStore.js';

const colorByMode = {
  idle: new THREE.Color('#8b5cf6'),
  experiências: new THREE.Color('#ffffff'),
  digitais: new THREE.Color('#a78bfa'),
  presença: new THREE.Color('#c4b5fd'),
  movimento: new THREE.Color('#7c3aed'),
  impacto: new THREE.Color('#f8f7ff')
};

export default function ExperienceScene() {
  const canvasRef = useRef(null);
  const stateRef = useRef({});
  const hoveredProject = useExperienceStore((state) => state.hoveredProject);
  const hoveredWord = useExperienceStore((state) => state.hoveredWord);
  const backgroundMode = useExperienceStore((state) => state.backgroundMode);
  const mousePosition = useExperienceStore((state) => state.mousePosition);

  useEffect(() => {
    stateRef.current = { hoveredProject, hoveredWord, backgroundMode, mousePosition };
  }, [hoveredProject, hoveredWord, backgroundMode, mousePosition]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSmallScreen = window.matchMedia('(max-width: 760px)').matches;
    const noise3D = createNoise3D();

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmallScreen ? 1.2 : 1.8));
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 5.2;

    const geometry = new THREE.IcosahedronGeometry(1.35, isSmallScreen ? 8 : 18);
    const basePositions = geometry.attributes.position.array.slice();
    const material = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      roughness: 0.35,
      metalness: 0.18,
      wireframe: true,
      transparent: true,
      opacity: isSmallScreen ? 0.38 : 0.54
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(isSmallScreen ? 1.45 : 1.55, isSmallScreen ? 0.1 : 0.35, 0);
    scene.add(mesh);

    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = isSmallScreen ? 80 : 180;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 9;
      positions[i + 1] = (Math.random() - 0.5) * 6;
      positions[i + 2] = (Math.random() - 0.5) * 5;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particlesGeometry,
      new THREE.PointsMaterial({ color: 0xffffff, size: 0.018, transparent: true, opacity: 0.5 })
    );
    scene.add(particles);

    scene.add(new THREE.AmbientLight(0xffffff, 1.2));
    const purpleLight = new THREE.PointLight(0x8b5cf6, 6, 12);
    purpleLight.position.set(2.5, 2.2, 3);
    scene.add(purpleLight);

    const whiteLight = new THREE.PointLight(0xffffff, 2.4, 10);
    whiteLight.position.set(-3, -1.5, 3);
    scene.add(whiteLight);

    let frameId;
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const state = stateRef.current;
      const targetColor = state.hoveredProject?.accent
        ? new THREE.Color(state.hoveredProject.accent)
        : colorByMode[state.backgroundMode] || colorByMode.idle;

      material.color.lerp(targetColor, 0.045);
      purpleLight.color.lerp(targetColor, 0.045);
      purpleLight.intensity += ((state.hoveredProject || state.hoveredWord ? 8.5 : 5.5) - purpleLight.intensity) * 0.04;

      if (!reducedMotion) {
        const mouseX = (state.mousePosition?.x || window.innerWidth / 2) / window.innerWidth - 0.5;
        const mouseY = (state.mousePosition?.y || window.innerHeight / 2) / window.innerHeight - 0.5;
        mesh.rotation.x += 0.0024 + mouseY * 0.001;
        mesh.rotation.y += 0.0035 + mouseX * 0.0012;
        mesh.position.x += ((isSmallScreen ? 1.45 : 1.55) + mouseX * 0.38 - mesh.position.x) * 0.035;
        mesh.position.y += ((isSmallScreen ? 0.1 : 0.35) - mouseY * 0.28 - mesh.position.y) * 0.035;
        particles.rotation.y -= 0.0008;

        const position = geometry.attributes.position;
        const intensity = state.hoveredProject || state.hoveredWord ? 0.08 : 0.035;
        for (let i = 0; i < position.count; i += 1) {
          const ix = i * 3;
          const n = noise3D(basePositions[ix] * 0.65, basePositions[ix + 1] * 0.65, elapsed * 0.28);
          position.array[ix] = basePositions[ix] + n * intensity;
          position.array[ix + 1] = basePositions[ix + 1] + n * intensity;
          position.array[ix + 2] = basePositions[ix + 2] + n * intensity;
        }
        position.needsUpdate = true;
      }

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    const resize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', resize);
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      geometry.dispose();
      material.dispose();
      particlesGeometry.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas className="webgl-bg" ref={canvasRef} aria-hidden="true" />;
}
