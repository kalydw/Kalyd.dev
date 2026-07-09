import { useEffect } from 'react';
import { useExperienceStore } from '../store/experienceStore.js';

const sectionIds = ['home', 'manifesto', 'work', 'about', 'skills', 'contact'];

export function useScrollProgress() {
  const setActiveSection = useExperienceStore((state) => state.setActiveSection);

  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      document.documentElement.style.setProperty('--scroll-progress', String(Math.min(Math.max(progress, 0), 1)));

      const active = sectionIds.findLast((id) => {
        const section = document.getElementById(id);
        return section ? section.getBoundingClientRect().top <= window.innerHeight * 0.38 : false;
      });

      if (active) setActiveSection(active);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [setActiveSection]);
}
