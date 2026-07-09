import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useExperienceStore } from '../store/experienceStore.js';
import { getIsLowPower } from '../utils/performance.js';
import { pointer } from '../utils/pointer.js';
import { subscribeFrame } from '../utils/rafBus.js';

export default function ProjectPreview() {
  const previewRef = useRef(null);
  const positionRef = useRef({ x: pointer.x, y: pointer.y });
  const hoveredProject = useExperienceStore((state) => state.hoveredProject);

  const getSafePosition = () => {
    const width = 340;
    const height = 245;
    const x = Math.min(Math.max(pointer.x + 28, 18), window.innerWidth - width - 18);
    const y = Math.min(Math.max(pointer.y - 92, 18), window.innerHeight - height - 18);

    return { x, y };
  };

  useEffect(() => {
    if (!previewRef.current) return;

    if (hoveredProject && !getIsLowPower()) {
      const next = getSafePosition();
      positionRef.current = next;
      previewRef.current.style.transform = `translate3d(${next.x}px, ${next.y}px, 0)`;
    }

    gsap.to(previewRef.current, {
      autoAlpha: hoveredProject ? 1 : 0,
      scale: hoveredProject ? 1 : 0.97,
      duration: 0.18,
      ease: 'power2.out'
    });
  }, [hoveredProject]);

  useEffect(() => {
    if (!previewRef.current || !hoveredProject || getIsLowPower()) return undefined;

    const unsubscribeFrame = subscribeFrame(() => {
      if (!previewRef.current) return;

      const next = getSafePosition();
      positionRef.current.x += (next.x - positionRef.current.x) * 0.16;
      positionRef.current.y += (next.y - positionRef.current.y) * 0.16;
      previewRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0)`;
    });

    return unsubscribeFrame;
  }, [hoveredProject]);

  return (
    <aside
      className="floating-preview"
      ref={previewRef}
      style={{ '--preview-accent': hoveredProject?.accent || '#8b5cf6' }}
      aria-hidden="true"
    >
      {hoveredProject && (
        <>
          <img src={hoveredProject.cover} alt="" loading="lazy" decoding="async" />
          <div>
            <strong>{hoveredProject.title}</strong>
            <p>{hoveredProject.summary}</p>
          </div>
        </>
      )}
    </aside>
  );
}
