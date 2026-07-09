export function getIsLowPower() {
  if (typeof window === 'undefined') return true;

  const isMobile = window.matchMedia('(max-width: 780px)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return isMobile || prefersReducedMotion;
}

