import { useEffect } from 'react';
import { useExperienceStore } from '../store/experienceStore.js';

export function useMousePosition() {
  const setMousePosition = useExperienceStore((state) => state.setMousePosition);

  useEffect(() => {
    const hasReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSmallScreen = window.matchMedia('(max-width: 760px)').matches;

    if (hasReducedMotion || isSmallScreen) return undefined;

    const handlePointerMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [setMousePosition]);
}
