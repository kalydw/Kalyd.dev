import { projects } from '../data.js';
import { useExperienceStore } from '../store/experienceStore.js';
import { getIsLowPower } from '../utils/performance.js';
import { pointer } from '../utils/pointer.js';
import ProjectPreview from './ProjectPreview.jsx';

const featuredProjects = projects.filter((project) => project.featured).slice(0, 5);
const archiveProjects = projects.filter((project) => !project.featured);

export default function ProjectExperienceList() {
  const hoveredProject = useExperienceStore((state) => state.hoveredProject);
  const setHoveredProject = useExperienceStore((state) => state.setHoveredProject);
  const setCursorMode = useExperienceStore((state) => state.setCursorMode);
  const setBackgroundMode = useExperienceStore((state) => state.setBackgroundMode);
  const resetInteraction = useExperienceStore((state) => state.resetInteraction);

  const handleEnter = (project, event) => {
    pointer.x = event.clientX || pointer.x;
    pointer.y = event.clientY || pointer.y;
    setHoveredProject(project);
    setCursorMode('project');
    setBackgroundMode(project.slug);
  };

  const handleLeave = () => {
    resetInteraction();
  };

  const handleClick = (project, event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    if (!project.url) {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    setHoveredProject(project);
    setCursorMode('hidden');
    setBackgroundMode(project.slug);

    document.documentElement.classList.add('portal-navigating');

    window.setTimeout(() => {
      window.location.href = project.url;
    }, getIsLowPower() ? 80 : 420);
  };

  return (
    <section className="work section" id="work" aria-labelledby="work-title">
      <div className="section-heading" data-reveal>
        <div>
          <p className="section-kicker">Projetos em destaque</p>
          <h2 id="work-title">Projetos que mostram direção, produto e acabamento.</h2>
        </div>
        <p>
          Os principais trabalhos ficam em destaque com o Project Portal. Projetos menores entram no arquivo, mantendo a página forte e preparada para crescer.
        </p>
      </div>

      <div className={`work-stage ${hoveredProject ? 'is-portal-open' : ''}`} style={{ '--project-accent': hoveredProject?.accent || '#8b5cf6' }}>
        <p className="project-ghost" aria-hidden="true">
          {hoveredProject?.title || 'Kalyd.dev'}
        </p>

        <div className="work-list" data-reveal>
          {featuredProjects.map((project, index) => (
            <a
              className={`work-item ${hoveredProject?.slug === project.slug ? 'is-active' : ''} ${hoveredProject && hoveredProject.slug !== project.slug ? 'is-muted' : ''}`}
              href={project.url}
              key={project.slug}
              data-cursor="project"
              onMouseEnter={(event) => handleEnter(project, event)}
              onFocus={(event) => handleEnter(project, event)}
              onMouseLeave={handleLeave}
              onBlur={handleLeave}
              onClick={(event) => handleClick(project, event)}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{project.title}</h3>
                <ul className="work-modules" aria-label={`Módulos de ${project.title}`}>
                  {project.modules.slice(0, 3).map((module) => (
                    <li key={module}>{module}</li>
                  ))}
                </ul>
              </div>
              <p>{project.type}</p>
              <strong>{project.year}</strong>
            </a>
          ))}
        </div>
        <ProjectPreview />
      </div>

      {archiveProjects.length > 0 && (
        <div className="project-archive" data-reveal>
          <div className="archive-heading">
            <p className="section-kicker">Arquivo de projetos</p>
            <h3>Outros trabalhos e módulos do portfólio.</h3>
          </div>

          <div className="archive-grid">
            {archiveProjects.map((project) => (
              <a className="archive-card" href={project.url} key={project.slug} data-cursor="link">
                <span>{project.year}</span>
                <h4>{project.title}</h4>
                <p>{project.summary}</p>
                <div className="archive-tags">
                  {project.tags.slice(0, 3).map((tag) => (
                    <small key={tag}>{tag}</small>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
