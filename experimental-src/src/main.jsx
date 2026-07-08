import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import * as THREE from 'three';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: 'FMEDCHOICES',
    type: 'Web App',
    year: '2026',
    image: '/assets/images/projects/fmedchoices/desktop.png',
    description: 'Plataforma de estudos para medicina, com landing page e área interna.'
  },
  {
    name: 'Imóveis Jota',
    type: 'Website',
    year: '2026',
    image: '/assets/images/projects/imoveis-jota/desktop.png',
    description: 'Site imobiliário com foco em apresentação, clareza e contato.'
  },
  {
    name: 'Kalyd.dev',
    type: 'Portfolio',
    year: '2026',
    image: '/assets/images/kalyd-photo.png',
    description: 'Identidade digital pessoal com temas, animações e páginas de projeto.'
  },
  {
    name: 'Catálogo Digital',
    type: 'Web System',
    year: '2026',
    image: '/assets/images/projects/imoveis-jota/mobile.png',
    description: 'Conceito para catálogo responsivo com navegação simples e rápida.'
  }
];

const skills = ['HTML', 'CSS', 'JavaScript', 'React', 'GSAP', 'Three.js', 'Lenis', 'Vercel'];

function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 0.9,
      smoothWheel: true
    });

    const tick = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const scrollToHash = (hash) => {
      const target = hash ? document.querySelector(hash) : null;
      if (target) {
        lenis.scrollTo(target, { offset: -90 });
      }
    };

    const handleAnchorClick = (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (!link) {
        return;
      }

      event.preventDefault();
      const hash = link.getAttribute('href');
      history.pushState(null, '', hash);
      scrollToHash(hash);
    };

    document.addEventListener('click', handleAnchorClick);

    window.setTimeout(() => {
      scrollToHash(window.location.hash);
    }, 120);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
}

function useRevealAnimations() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-reveal]').forEach((element) => {
        gsap.fromTo(
          element,
          { y: 42, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 82%'
            }
          }
        );
      });

      gsap.fromTo(
        '.hero-title span',
        { yPercent: 115 },
        { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.08, delay: 0.25 }
      );
    });

    return () => ctx.revert();
  }, []);
}

function WebGLBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 5.2;

    const geometry = new THREE.IcosahedronGeometry(1.35, 18);
    const material = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      roughness: 0.35,
      metalness: 0.18,
      wireframe: true,
      transparent: true,
      opacity: 0.52
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(1.55, 0.35, 0);
    scene.add(mesh);

    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 180;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 9;
      positions[i + 1] = (Math.random() - 0.5) * 6;
      positions[i + 2] = (Math.random() - 0.5) * 5;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particles = new THREE.Points(
      particlesGeometry,
      new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.018,
        transparent: true,
        opacity: 0.5
      })
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
    const animate = () => {
      if (!reducedMotion) {
        mesh.rotation.x += 0.0028;
        mesh.rotation.y += 0.004;
        particles.rotation.y -= 0.0008;
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

function Loader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setHidden(true), 1100);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className={`loader ${hidden ? 'loader-hidden' : ''}`} aria-hidden={hidden}>
      <span>Materializando interfaces...</span>
      <strong>Kalyd.dev</strong>
    </div>
  );
}

function Cursor() {
  const dotRef = useRef(null);

  useEffect(() => {
    const cursor = dotRef.current;
    const move = (event) => {
      gsap.to(cursor, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.18,
        ease: 'power2.out'
      });
    };

    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, []);

  return <span className="cursor-dot" ref={dotRef} aria-hidden="true" />;
}

function WorkSection() {
  const [preview, setPreview] = useState(projects[0]);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const previewStyle = useMemo(
    () => ({
      transform: `translate3d(${position.x + 24}px, ${position.y - 120}px, 0)`
    }),
    [position]
  );

  return (
    <section className="section work" id="work">
      <div className="section-kicker" data-reveal>Work / 2026</div>
      <div className="section-heading" data-reveal>
        <h2>Projetos escolhidos para mostrar direção, cuidado visual e entrega.</h2>
      </div>

      <div className="work-list" onMouseMove={(event) => setPosition({ x: event.clientX, y: event.clientY })}>
        {projects.map((project, index) => (
          <article
            className="work-item"
            key={project.name}
            onMouseEnter={() => setPreview(project)}
            data-reveal
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{project.name}</h3>
            <p>{project.type}</p>
            <strong>{project.year}</strong>
          </article>
        ))}
      </div>

      <div className="floating-preview" style={previewStyle} aria-hidden="true">
        <img src={preview.image} alt="" />
        <p>{preview.description}</p>
      </div>
    </section>
  );
}

function App() {
  useSmoothScroll();
  useRevealAnimations();

  return (
    <>
      <Loader />
      <Cursor />
      <WebGLBackground />

      <header className="exp-header">
        <a href="../" className="exp-brand">Kalyd.dev</a>
        <nav aria-label="Experimental navigation">
          <a href="#home">Home</a>
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section className="hero-exp" id="home">
          <div className="hero-meta">
            <span>Pedro Kalyd</span>
            <span>Brazil / 2026</span>
          </div>
          <h1 className="hero-title" aria-label="Kalyd.dev">
            <span>Kalyd</span>
            <span>.dev</span>
          </h1>
          <p className="hero-copy-exp" data-reveal>
            Pedro Kalyd — desenvolvedor web criando sites modernos, responsivos e visuais para marcas que querem presença digital.
          </p>
          <div className="hero-links" data-reveal>
            <a href="#work">Ver projetos</a>
            <a href="https://wa.me/557798654680" target="_blank" rel="noreferrer">Fale comigo</a>
          </div>
        </section>

        <WorkSection />

        <section className="section about" id="about">
          <div className="section-kicker" data-reveal>About / Sobre</div>
          <div className="about-grid">
            <h2 data-reveal>Developer, designer visual e construtor de presença digital.</h2>
            <div data-reveal>
              <p>
                Trabalho com criação de sites, landing pages, sites institucionais, catálogos digitais, manutenção e identidade digital. Gosto de interfaces que respiram, textos diretos e detalhes de interação que fazem a experiência parecer viva.
              </p>
              <div className="label-cloud" aria-label="Características profissionais">
                <span>Developer</span>
                <span>Designer</span>
                <span>Web</span>
                <span>Brazil</span>
                <span>2026</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section skills" aria-labelledby="skills-title">
          <div className="section-kicker" data-reveal>Skills</div>
          <h2 id="skills-title" data-reveal>Ferramentas para criar páginas com impacto.</h2>
          <div className="skill-marquee" data-reveal>
            {skills.concat(skills).map((skill, index) => (
              <span key={`${skill}-${index}`}>{skill}</span>
            ))}
          </div>
        </section>

        <section className="section contact" id="contact">
          <p className="section-kicker" data-reveal>Contact</p>
          <h2 data-reveal>Vamos criar algo visualmente forte?</h2>
          <div className="contact-links" data-reveal>
            <a href="https://wa.me/557798654680" target="_blank" rel="noreferrer">WhatsApp</a>
            <a href="https://github.com/kalydw" target="_blank" rel="noreferrer">GitHub</a>
            <a href="../portfolio.html">Portfólio</a>
          </div>
        </section>
      </main>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
