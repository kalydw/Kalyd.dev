import { useEffect } from 'react';
import gsap from 'gsap';
import Lenis from 'lenis';

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 0.9,
      smoothWheel: true
    });

    const tick = (time) => lenis.raf(time * 1000);
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
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
}
