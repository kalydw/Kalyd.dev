import { useExperienceStore } from '../store/experienceStore.js';

export default function InteractiveWord({ word }) {
  const setHoveredWord = useExperienceStore((state) => state.setHoveredWord);
  const setBackgroundMode = useExperienceStore((state) => state.setBackgroundMode);
  const setCursorMode = useExperienceStore((state) => state.setCursorMode);
  const resetInteraction = useExperienceStore((state) => state.resetInteraction);

  return (
    <span
      className="interactive-word"
      data-cursor="link"
      onMouseEnter={() => {
        setHoveredWord(word);
        setBackgroundMode(word);
        setCursorMode('link');
      }}
      onMouseLeave={resetInteraction}
    >
      {word}
    </span>
  );
}
