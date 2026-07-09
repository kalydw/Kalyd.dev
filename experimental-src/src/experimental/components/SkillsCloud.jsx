import { skills } from '../data.js';
import { useExperienceStore } from '../store/experienceStore.js';

export default function SkillsCloud() {
  const setHoveredWord = useExperienceStore((state) => state.setHoveredWord);
  const setBackgroundMode = useExperienceStore((state) => state.setBackgroundMode);
  const setCursorMode = useExperienceStore((state) => state.setCursorMode);
  const resetInteraction = useExperienceStore((state) => state.resetInteraction);

  const handleEnter = (skill) => {
    setHoveredWord(skill);
    setBackgroundMode(skill);
    setCursorMode('link');
  };

  return (
    <section className="skills section" id="skills" aria-labelledby="skills-title" data-reveal>
      <p className="section-kicker">Habilidades</p>
      <h2 id="skills-title">Base técnica para criar interfaces mais fluidas.</h2>
      <div className="skill-marquee" aria-label="Habilidades técnicas">
        {skills.map((skill) => (
          <span
            key={skill}
            data-cursor="link"
            onMouseEnter={() => handleEnter(skill)}
            onFocus={() => handleEnter(skill)}
            onMouseLeave={resetInteraction}
            onBlur={resetInteraction}
            tabIndex="0"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
