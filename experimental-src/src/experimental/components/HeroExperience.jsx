import { useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import { useGSAP } from '@gsap/react';
import InteractiveWord from './InteractiveWord.jsx';
import { getIsLowPower } from '../utils/performance.js';

export default function HeroExperience() {
  const titleRef = useRef(null);

  useGSAP(() => {
    if (!titleRef.current) return undefined;
    const isLowPower = getIsLowPower();

    if (isLowPower) {
      gsap.from(titleRef.current, {
        autoAlpha: 0,
        y: 16,
        duration: 0.42,
        ease: 'power2.out',
        delay: 0.16
      });

      return undefined;
    }

    const split = new SplitType(titleRef.current, { types: 'chars,words' });

    gsap.from(split.chars, {
      yPercent: 120,
      opacity: 0,
      rotateZ: 4,
      duration: 0.9,
      stagger: 0.012,
      ease: 'power4.out',
      delay: 0.24
    });

    return () => split.revert();
  }, { scope: titleRef });

  return (
    <section className="hero-exp" id="home" aria-labelledby="hero-title">
      <div className="hero-meta" data-reveal>
        <span>Portfólio experimental</span>
        <span>Front-end visual</span>
      </div>

      <h1 className="hero-title" id="hero-title" ref={titleRef}>
        Kalyd.dev
      </h1>

      <div className="hero-copy-exp" data-reveal>
        <p>
          Crio <InteractiveWord word="experiências" /> <InteractiveWord word="digitais" /> para marcas que querem <InteractiveWord word="presença" />, <InteractiveWord word="movimento" /> e <InteractiveWord word="impacto" />.
        </p>
        <div className="hero-links">
          <a href="#work" data-cursor="link">Ver projetos</a>
          <a href="https://wa.me/5588992140332" data-cursor="whatsapp" target="_blank" rel="noreferrer">Conversar</a>
        </div>
      </div>
    </section>
  );
}
