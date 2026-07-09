import { useEffect } from 'react';
import { getIsLowPower } from '../utils/performance.js';
import { pointer } from '../utils/pointer.js';

export function useMousePosition() {
  useEffect(() => {
    if (getIsLowPower()) return undefined;

    const handlePointerMove = (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);
}
