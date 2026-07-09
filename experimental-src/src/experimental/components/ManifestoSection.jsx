import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { getIsLowPower } from '../utils/performance.js';

const lines = [
  'Não faço apenas páginas.',
  'Construo presença.',
  'Movimento.',
  'Clareza.',
  'Sites que fazem uma marca parecer maior.'
];

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function ManifestoSection() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const isLowPower = getIsLowPower();
    const spans = gsap.utils.toArray('.manifesto-line span');

    gsap.from(spans, {
      yPercent: isLowPower ? 28 : 115,
      autoAlpha: 0,
      duration: isLowPower ? 0.42 : 0.9,
      stagger: isLowPower ? 0.04 : 0.11,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 66%',
        once: true
      }
    });
  }, { scope: sectionRef });

  return (
    <section className="manifesto section" id="manifesto" ref={sectionRef} aria-labelledby="manifesto-title">
      <p className="section-kicker" data-reveal>Manifesto</p>
      <div className="manifesto-stack" id="manifesto-title">
        {lines.map((line) => (
          <p className="manifesto-line" key={line}>
            <span>{line}</span>
          </p>
        ))}
      </div>
    </section>
  );
}
