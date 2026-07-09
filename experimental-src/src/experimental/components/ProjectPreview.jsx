import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useExperienceStore } from '../store/experienceStore.js';

export default function ProjectPreview() {
  const previewRef = useRef(null);
  const hoveredProject = useExperienceStore((state) => state.hoveredProject);
  const mousePosition = useExperienceStore((state) => state.mousePosition);

  useEffect(() => {
    if (!previewRef.current) return;

    gsap.to(previewRef.current, {
      autoAlpha: hoveredProject ? 1 : 0,
      scale: hoveredProject ? 1 : 0.96,
      duration: 0.2,
      ease: 'power2.out'
    });
  }, [hoveredProject]);

  useEffect(() => {
    if (!previewRef.current || !hoveredProject) return;

    gsap.to(previewRef.current, {
      x: mousePosition.x + 26,
      y: mousePosition.y - 90,
      duration: 0.26,
      ease: 'power3.out'
    });
  }, [hoveredProject, mousePosition]);

  return (
    <aside className="floating-preview" ref={previewRef} aria-hidden="true">
      {hoveredProject && (
        <>
          <img src={hoveredProject.image} alt="" />
          <div>
            <strong>{hoveredProject.name}</strong>
            <p>{hoveredProject.description}</p>
          </div>
        </>
      )}
    </aside>
  );
}
