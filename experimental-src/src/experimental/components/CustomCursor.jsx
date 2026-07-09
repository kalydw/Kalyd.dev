import { useEffect, useRef } from 'react';
import { useExperienceStore } from '../store/experienceStore.js';
import { getIsLowPower } from '../utils/performance.js';
import { pointer } from '../utils/pointer.js';
import { subscribeFrame } from '../utils/rafBus.js';

const labels = {
  default: '',
  link: '',
  project: 'Ver',
  whatsapp: 'Chamar',
  hidden: ''
};

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const cursorMode = useExperienceStore((state) => state.cursorMode);
  const setCursorMode = useExperienceStore((state) => state.setCursorMode);

  useEffect(() => {
    if (getIsLowPower()) {
      setCursorMode('hidden');
      return undefined;
    }

    let currentX = pointer.x;
    let currentY = pointer.y;

    const unsubscribeFrame = subscribeFrame(() => {
      if (!cursorRef.current) return;

      currentX += (pointer.x - currentX) * 0.22;
      currentY += (pointer.y - currentY) * 0.22;
      cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate3d(-50%, -50%, 0)`;
    });

    const handleOver = (event) => {
      const target = event.target.closest('[data-cursor], a, button');
      if (!target) return;
      setCursorMode(target.dataset.cursor || 'link');
    };

    const handleOut = (event) => {
      const target = event.target.closest('[data-cursor], a, button');
      if (!target) return;
      if (event.relatedTarget && target.contains(event.relatedTarget)) return;
      setCursorMode('default');
    };

    document.addEventListener('pointerover', handleOver);
    document.addEventListener('pointerout', handleOut);

    return () => {
      unsubscribeFrame();
      document.removeEventListener('pointerover', handleOver);
      document.removeEventListener('pointerout', handleOut);
    };
  }, [setCursorMode]);

  return (
    <span className={`cursor-dot cursor-${cursorMode}`} ref={cursorRef} aria-hidden="true">
      <span>{labels[cursorMode]}</span>
    </span>
  );
}
