import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useExperienceStore } from '../store/experienceStore.js';

const labels = {
  default: '',
  link: '',
  project: 'Ver',
  whatsapp: 'Chamar',
  hidden: ''
};

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const labelRef = useRef(null);
  const cursorMode = useExperienceStore((state) => state.cursorMode);
  const mousePosition = useExperienceStore((state) => state.mousePosition);
  const setCursorMode = useExperienceStore((state) => state.setCursorMode);

  useEffect(() => {
    const isSmallScreen = window.matchMedia('(max-width: 760px)').matches;
    const hasReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isSmallScreen || hasReducedMotion) {
      setCursorMode('hidden');
      return undefined;
    }

    const handleOver = (event) => {
      const target = event.target.closest('[data-cursor], a, button');
      if (!target) return;
      setCursorMode(target.dataset.cursor || 'link');
    };

    const handleOut = (event) => {
      const target = event.target.closest('[data-cursor], a, button');
      if (!target) return;
      setCursorMode('default');
    };

    document.addEventListener('pointerover', handleOver);
    document.addEventListener('pointerout', handleOut);

    return () => {
      document.removeEventListener('pointerover', handleOver);
      document.removeEventListener('pointerout', handleOut);
    };
  }, [setCursorMode]);

  useEffect(() => {
    if (!cursorRef.current) return;

    gsap.to(cursorRef.current, {
      x: mousePosition.x,
      y: mousePosition.y,
      duration: 0.18,
      ease: 'power2.out'
    });
  }, [mousePosition]);

  return (
    <span className={`cursor-dot cursor-${cursorMode}`} ref={cursorRef} aria-hidden="true">
      <span ref={labelRef}>{labels[cursorMode]}</span>
    </span>
  );
}
