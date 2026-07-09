import { useEffect } from 'react';
import { useExperienceStore } from '../store/experienceStore.js';
import { getIsLowPower } from '../utils/performance.js';
import { pointer } from '../utils/pointer.js';
import { setPreviewPosition, tickPreviewPosition } from '../utils/previewPosition.js';
import { subscribeFrame } from '../utils/rafBus.js';

export default function ProjectPreview() {
  const hoveredProject = useExperienceStore((state) => state.hoveredProject);
  const isVisible = Boolean(hoveredProject) && !getIsLowPower();

  useEffect(() => {
    if (!isVisible) return undefined;

    setPreviewPosition(pointer.x, pointer.y, { immediate: false });

    const unsubscribeFrame = subscribeFrame(() => {
      setPreviewPosition(pointer.x, pointer.y);
      tickPreviewPosition(0.22);
    });

    return unsubscribeFrame;
  }, [isVisible]);

  return (
    <aside
      className={`floating-preview ${isVisible ? 'is-visible' : ''}`}
      style={{ '--preview-accent': hoveredProject?.accent || '#8b5cf6' }}
      aria-hidden="true"
    >
      <div className="floating-preview-frame">
        {hoveredProject && (
          <>
            <img src={hoveredProject.cover} alt="" loading="lazy" decoding="async" />
            <div className="floating-preview-copy">
              <strong>{hoveredProject.title}</strong>
              <p>{hoveredProject.summary}</p>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
