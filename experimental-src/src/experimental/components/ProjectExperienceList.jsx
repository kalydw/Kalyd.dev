import { projects } from '../data.js';
import { useExperienceStore } from '../store/experienceStore.js';
import ProjectPreview from './ProjectPreview.jsx';

export default function ProjectExperienceList() {
  const hoveredProject = useExperienceStore((state) => state.hoveredProject);
  const setHoveredProject = useExperienceStore((state) => state.setHoveredProject);
  const setCursorMode = useExperienceStore((state) => state.setCursorMode);
  const setBackgroundMode = useExperienceStore((state) => state.setBackgroundMode);
  const resetInteraction = useExperienceStore((state) => state.resetInteraction);

  const handleEnter = (project) => {
    setHoveredProject(project);
    setCursorMode('project');
    setBackgroundMode(project.id);
  };

  return (
    <section className="work section" id="work" aria-labelledby="work-title">
      <div className="section-heading" data-reveal>
        <div>
          <p className="section-kicker">Projetos selecionados</p>
          <h2 id="work-title">Projetos que mostram direção, produto e acabamento.</h2>
        </div>
        <p>
          Passe pelos projetos para ver a página reagir. A ideia é transformar o portfólio em uma experiência viva, sem perder clareza.
        </p>
      </div>

      <div className="work-stage">
        <p className="project-ghost" aria-hidden="true">
          {hoveredProject?.name || 'Kalyd.dev'}
        </p>

        <div className="work-list" data-reveal>
          {projects.map((project, index) => (
            <a
              className={`work-item ${hoveredProject && hoveredProject.id !== project.id ? 'is-muted' : ''}`}
              href={project.url}
              key={project.id}
              data-cursor="project"
              onMouseEnter={() => handleEnter(project)}
              onFocus={() => handleEnter(project)}
              onMouseLeave={resetInteraction}
              onBlur={resetInteraction}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{project.name}</h3>
              <p>{project.type}</p>
              <strong>{project.year}</strong>
            </a>
          ))}
        </div>
        <ProjectPreview />
      </div>
    </section>
  );
}
