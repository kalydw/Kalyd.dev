import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createNoise3D } from 'simplex-noise';
import { useExperienceStore } from '../store/experienceStore.js';
import { getIsLowPower } from '../utils/performance.js';
import { pointer } from '../utils/pointer.js';
import { subscribeFrame } from '../utils/rafBus.js';

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

  useEffect(() => {
    stateRef.current = { hoveredProject, hoveredWord, backgroundMode };
  }, [hoveredProject, hoveredWord, backgroundMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const isLowPower = getIsLowPower();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !isLowPower,
      powerPreference: isLowPower ? 'low-power' : 'high-performance'
    });
    const noise3D = createNoise3D();
    const targetColor = new THREE.Color('#8b5cf6');

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isLowPower ? 1 : 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 5.2;

    const geometry = new THREE.IcosahedronGeometry(1.28, isLowPower ? 3 : 7);
    const basePositions = Float32Array.from(geometry.attributes.position.array);
    const material = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: isLowPower ? 0.32 : 0.5
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(isLowPower ? 1.2 : 1.55, isLowPower ? 0 : 0.32, 0);
    scene.add(mesh);

    const particleCount = isLowPower ? 28 : 90;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 8;
      positions[i + 1] = (Math.random() - 0.5) * 5;
      positions[i + 2] = (Math.random() - 0.5) * 4;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: isLowPower ? 0.014 : 0.018,
      transparent: true,
      opacity: isLowPower ? 0.24 : 0.42
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    let frameCount = 0;
    const clock = new THREE.Clock();
    const unsubscribeFrame = subscribeFrame(() => {
      const elapsed = clock.getElapsedTime();
      const state = stateRef.current;
      targetColor.copy(colorByMode[state.backgroundMode] || colorByMode.idle);
      if (state.hoveredProject?.accent) targetColor.set(state.hoveredProject.accent);

      material.color.lerp(targetColor, 0.035);

      const mouseX = isLowPower ? 0 : pointer.x / window.innerWidth - 0.5;
      const mouseY = isLowPower ? 0 : pointer.y / window.innerHeight - 0.5;
      const baseX = isLowPower ? 1.2 : 1.55;
      const baseY = isLowPower ? 0 : 0.32;

      mesh.rotation.x += isLowPower ? 0.0008 : 0.0018 + mouseY * 0.0008;
      mesh.rotation.y += isLowPower ? 0.0011 : 0.0026 + mouseX * 0.001;
      mesh.position.x += (baseX + mouseX * 0.28 - mesh.position.x) * 0.032;
      mesh.position.y += (baseY - mouseY * 0.2 - mesh.position.y) * 0.032;
      particles.rotation.y -= isLowPower ? 0.00025 : 0.0005;

      frameCount += 1;
      if (!isLowPower && frameCount % 4 === 0) {
        const position = geometry.attributes.position;
        const intensity = state.hoveredProject || state.hoveredWord ? 0.055 : 0.022;

        for (let i = 0; i < position.count; i += 1) {
          const ix = i * 3;
          const n = noise3D(basePositions[ix] * 0.7, basePositions[ix + 1] * 0.7, elapsed * 0.18);
          position.array[ix] = basePositions[ix] + n * intensity;
          position.array[ix + 1] = basePositions[ix + 1] + n * intensity;
          position.array[ix + 2] = basePositions[ix + 2] + n * intensity;
        }

        position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    });

    const resize = () => {
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, getIsLowPower() ? 1 : 1.5));
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', resize);

    return () => {
      unsubscribeFrame();
      window.removeEventListener('resize', resize);
      geometry.dispose();
      material.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas className="webgl-bg" ref={canvasRef} aria-hidden="true" />;
}
