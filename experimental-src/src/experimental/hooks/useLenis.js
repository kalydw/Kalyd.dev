import { useEffect } from 'react';
import Lenis from 'lenis';
import { getIsLowPower } from '../utils/performance.js';
import { subscribeFrame } from '../utils/rafBus.js';

export function useLenis() {
  useEffect(() => {
    if (getIsLowPower()) return undefined;

    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 0.9,
      smoothWheel: true
    });

    const unsubscribeFrame = subscribeFrame((time) => lenis.raf(time));

    const scrollToHash = (hash) => {
      const target = hash ? document.querySelector(hash) : null;
      if (target) {
        lenis.scrollTo(target, { offset: -90 });
      }
    };

    const handleAnchorClick = (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (!link) return;

      event.preventDefault();
      const hash = link.getAttribute('href');
      history.pushState(null, '', hash);
      scrollToHash(hash);
    };

    document.addEventListener('click', handleAnchorClick);
    window.setTimeout(() => scrollToHash(window.location.hash), 120);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      unsubscribeFrame();
      lenis.destroy();
    };
  }, []);
}
