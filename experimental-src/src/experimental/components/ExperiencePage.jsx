import { useEffect, useMemo, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useExperienceStore } from '../store/experienceStore.js';
import { useLenis } from '../hooks/useLenis.js';
import { useMousePosition } from '../hooks/useMousePosition.js';
import { useScrollProgress } from '../hooks/useScrollProgress.js';
import CustomCursor from './CustomCursor.jsx';
import ExperienceScene from './ExperienceScene.jsx';
import HeroExperience from './HeroExperience.jsx';
import ManifestoSection from './ManifestoSection.jsx';
import ProjectExperienceList from './ProjectExperienceList.jsx';
import SkillsCloud from './SkillsCloud.jsx';
import ContactExperience from './ContactExperience.jsx';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function ExperiencePage() {
  const [isLoading, setIsLoading] = useState(true);
  const hoveredProject = useExperienceStore((state) => state.hoveredProject);
  const hoveredWord = useExperienceStore((state) => state.hoveredWord);
  const activeSection = useExperienceStore((state) => state.activeSection);
  const backgroundMode = useExperienceStore((state) => state.backgroundMode);

  useLenis();
  useMousePosition();
  useScrollProgress();

  const backdropAccent = hoveredProject?.accent || (hoveredWord ? '#f8f7ff' : '#8b5cf6');
  const backdropClass = useMemo(() => {
    const normalized = String(backgroundMode || 'idle')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9-]/gi, '-')
      .toLowerCase();

    return `experience-backdrop mode-${normalized}`;
  }, [backgroundMode]);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 760);
    return () => window.clearTimeout(timer);
  }, []);

  useGSAP(() => {
    const items = gsap.utils.toArray('[data-reveal]');

    items.forEach((item) => {
      gsap.from(item, {
        autoAlpha: 0,
        y: 34,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 84%',
          once: true
        }
      });
    });
  }, []);

  return (
    <>
      <div className={`loader ${isLoading ? '' : 'loader-hidden'}`} aria-hidden={!isLoading}>
        <span>Carregando experiência</span>
        <strong>Kalyd.dev</strong>
      </div>

      <div className={backdropClass} style={{ '--mode-accent': backdropAccent }} aria-hidden="true" />
      <div className="scroll-progress" aria-hidden="true" />
      <ExperienceScene />
      <CustomCursor />

      <header className="exp-header" data-reveal>
        <a className="exp-brand" href="../" data-cursor="link" aria-label="Voltar para Kalyd.dev">
          <span>k.</span>
          Kalyd.dev
        </a>
        <nav aria-label="Navegação da experiência">
          <a className={activeSection === 'manifesto' ? 'is-active' : ''} href="#manifesto" data-cursor="link">Manifesto</a>
          <a className={activeSection === 'work' ? 'is-active' : ''} href="#work" data-cursor="link">Projetos</a>
          <a className={activeSection === 'skills' ? 'is-active' : ''} href="#skills" data-cursor="link">Habilidades</a>
          <a href="../" data-cursor="link">Site principal</a>
        </nav>
      </header>

      <main>
        <HeroExperience />
        <ManifestoSection />
        <ProjectExperienceList />
        <section className="about section" id="about" data-reveal>
          <div className="about-grid">
            <div>
              <p className="section-kicker">Direção visual</p>
              <h2>Interfaces com presença, ritmo e intenção.</h2>
            </div>
            <div className="about-copy">
              <p>
                Esta página é um laboratório visual para mostrar como penso projetos digitais: estrutura clara, movimento com propósito, estética forte e cuidado para cada detalhe continuar funcionando no celular.
              </p>
              <div className="label-cloud" aria-label="Pilares da experiência">
                <span>Performance</span>
                <span>Responsividade</span>
                <span>Interação</span>
                <span>Identidade</span>
              </div>
            </div>
          </div>
        </section>
        <SkillsCloud />
        <ContactExperience />
      </main>
    </>
  );
}

