const projectFilters = ['Todos', 'Landing Page', 'Institucional', 'Sistema/Web App', 'Imobiliário'];
const projects = window.kalydProjects || [];

const createProjectVisual = (project) => {
  if (project.image) {
    return `
      <div class="project-card-visual project-screenshot">
        <img src="${project.image}" alt="${project.imageAlt}" loading="lazy" />
      </div>
    `;
  }

  return `
    <div class="project-card-visual project-fallback" aria-hidden="true">
      <span>${project.category}</span>
      <strong>${project.name}</strong>
      <small>${project.tags.slice(0, 3).join(' • ')}</small>
    </div>
  `;
};

const createProjectCard = (project, index = 0, compact = false) => `
  <article class="portfolio-card anim slide-up ${index ? `d${Math.min(index, 3)}` : ''}" data-project-card="${project.id}" tabindex="0">
    ${createProjectVisual(project)}
    <div class="portfolio-card-body">
      <p class="project-type">${project.category}</p>
      <h3>${project.name}</h3>
      <p>${project.shortDescription}</p>
      <div class="project-tags" aria-label="Tags do projeto ${project.name}">
        ${project.tags.slice(0, compact ? 4 : 6).map((tag) => `<span>${tag}</span>`).join('')}
      </div>
      <div class="portfolio-card-actions">
        <button class="button button-secondary" type="button" data-project-summary="${project.id}">Ver resumo</button>
        <a class="button button-primary" href="projeto.html?id=${project.id}">Ver detalhes</a>
      </div>
    </div>
  </article>
`;

const renderFeaturedProjects = () => {
  const container = document.querySelector('[data-featured-projects]');

  if (!container) {
    return;
  }

  container.innerHTML = projects
    .filter((project) => project.featured)
    .slice(0, 3)
    .map((project, index) => createProjectCard(project, index, true))
    .join('');
};

const renderPortfolio = (activeFilter = 'Todos') => {
  const grid = document.querySelector('[data-project-grid]');

  if (!grid) {
    return;
  }

  const filteredProjects =
    activeFilter === 'Todos'
      ? projects
      : projects.filter((project) => project.filters.includes(activeFilter) || project.category === activeFilter);

  grid.innerHTML = filteredProjects.map((project, index) => createProjectCard(project, index)).join('');
};

const renderFilters = () => {
  const container = document.querySelector('[data-project-filters]');

  if (!container) {
    return;
  }

  container.innerHTML = projectFilters
    .map((filter, index) => `
      <button class="filter-button ${index === 0 ? 'active' : ''}" type="button" data-filter="${filter}">
        ${filter}
      </button>
    `)
    .join('');

  container.addEventListener('click', (event) => {
    const button = event.target.closest('[data-filter]');

    if (!button) {
      return;
    }

    container.querySelectorAll('[data-filter]').forEach((filterButton) => filterButton.classList.remove('active'));
    button.classList.add('active');
    renderPortfolio(button.dataset.filter);
  });
};

const openProjectModal = (projectId) => {
  const modal = document.querySelector('[data-project-modal]');
  const project = window.findKalydProject?.(projectId);

  if (!modal || !project) {
    return;
  }

  modal.querySelector('[data-project-modal-category]').textContent = project.category;
  modal.querySelector('[data-project-modal-title]').textContent = project.name;
  modal.querySelector('[data-project-modal-description]').textContent = project.description;
  modal.querySelector('[data-project-modal-tags]').innerHTML = project.tags.map((tag) => `<span>${tag}</span>`).join('');
  modal.querySelector('[data-project-modal-link]').href = `projeto.html?id=${project.id}`;
  modal.querySelector('[data-project-modal-external]').href = project.link;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  modal.querySelector('[data-project-modal-close]')?.focus();
};

const closeProjectModal = () => {
  const modal = document.querySelector('[data-project-modal]');

  if (!modal) {
    return;
  }

  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
};

document.addEventListener('click', (event) => {
  const target = event.target instanceof Element ? event.target : null;
  const summaryButton = target?.closest('[data-project-summary]');
  const card = target?.closest('[data-project-card]');

  if (summaryButton) {
    openProjectModal(summaryButton.dataset.projectSummary);
    return;
  }

  if (target?.closest('a, button')) {
    return;
  }

  if (card) {
    openProjectModal(card.dataset.projectCard);
  }
});

document.addEventListener('keydown', (event) => {
  const target = event.target instanceof Element ? event.target : null;
  const card = target?.closest('[data-project-card]');

  if (card && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault();
    openProjectModal(card.dataset.projectCard);
    return;
  }

  if (event.key === 'Escape') {
    closeProjectModal();
  }
});

document.querySelectorAll('[data-project-modal-close]').forEach((button) => {
  button.addEventListener('click', closeProjectModal);
});

renderFeaturedProjects();
renderFilters();
renderPortfolio();
