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

  useEffect(() => {
    if (!previewRef.current) return;

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

      positionRef.current.x += (pointer.x + 26 - positionRef.current.x) * 0.16;
      positionRef.current.y += (pointer.y - 90 - positionRef.current.y) * 0.16;
      previewRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0)`;
    });

    return unsubscribeFrame;
  }, [hoveredProject]);

  return (
    <aside className="floating-preview" ref={previewRef} aria-hidden="true">
      {hoveredProject && (
        <>
          <img src={hoveredProject.image} alt="" loading="lazy" decoding="async" />
          <div>
            <strong>{hoveredProject.name}</strong>
            <p>{hoveredProject.description}</p>
          </div>
        </>
      )}
    </aside>
  );
}
