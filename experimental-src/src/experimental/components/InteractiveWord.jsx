import { useExperienceStore } from '../store/experienceStore.js';

export default function InteractiveWord({ word }) {
  const setHoveredWord = useExperienceStore((state) => state.setHoveredWord);
  const setBackgroundMode = useExperienceStore((state) => state.setBackgroundMode);
  const setCursorMode = useExperienceStore((state) => state.setCursorMode);

  const handleEnter = () => {
    setHoveredWord(word);
    setBackgroundMode(word);
    setCursorMode('link');
  };

  const handleLeave = () => {
    setHoveredWord(null);
    setBackgroundMode('idle');
    setCursorMode('default');
  };

  return (
    <span
      className="interactive-word"
      data-cursor="link"
      onMouseEnter={handleEnter}
      onFocus={handleEnter}
      onMouseLeave={handleLeave}
      onBlur={handleLeave}
      tabIndex="0"
    >
      {word}
    </span>
  );
}
