const detailSections = document.querySelectorAll('[data-project-detail]');
const notFound = document.querySelector('[data-project-not-found]');
const params = new URLSearchParams(window.location.search);
const project = window.findKalydProject?.(params.get('id'));

const setText = (selector, value) => {
  const element = document.querySelector(selector);

  if (element) {
    element.textContent = value;
  }
};

const renderList = (selector, items) => {
  const element = document.querySelector(selector);

  if (!element) {
    return;
  }

  element.innerHTML = items.map((item) => `<li>${item}</li>`).join('');
};

if (!project) {
  detailSections.forEach((section) => section.setAttribute('hidden', ''));
  notFound?.removeAttribute('hidden');
} else {
  document.title = `${project.name} | Projeto Kalyd.dev`;
  setText('[data-project-category]', project.category);
  setText('[data-project-title]', project.name);
  setText('[data-project-description]', project.description);
  setText('[data-project-challenge]', project.challenge);
  setText('[data-project-solution]', project.solution);
  setText('[data-project-result]', project.result);

  const externalLink = document.querySelector('[data-project-external]');
  if (externalLink) {
    externalLink.href = project.link;
  }

  const visual = document.querySelector('[data-project-visual]');
  if (visual) {
    visual.innerHTML = project.image
      ? `<img src="${project.image}" alt="${project.imageAlt}" />`
      : `<div class="project-fallback"><span>${project.category}</span><strong>${project.name}</strong><small>${project.tags.slice(0, 3).join(' • ')}</small></div>`;
  }

  const tags = document.querySelector('[data-project-tags]');
  if (tags) {
    tags.innerHTML = project.tags.map((tag) => `<span>${tag}</span>`).join('');
  }

  const metrics = document.querySelector('[data-project-metrics]');
  if (metrics) {
    metrics.innerHTML = project.metrics
      .map(([value, label], index) => `
        <div class="stat anim slide-up ${index ? `d${Math.min(index, 3)}` : ''}">
          <strong>${value}</strong>
          <span>${label}</span>
        </div>
      `)
      .join('');
  }

  renderList('[data-project-features]', project.features);
}
