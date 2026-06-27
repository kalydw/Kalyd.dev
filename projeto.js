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
  setText('[data-project-description]', project.fullDescription || project.description);
  setText('[data-project-status]', project.status);
  setText('[data-project-type]', project.type);
  setText('[data-project-about]', project.fullDescription || project.description);
  setText('[data-project-objective]', project.objective);
  setText('[data-project-challenge]', project.challenge);
  setText('[data-project-solution]', project.solution);
  setText('[data-project-result]', project.result);

  const externalLink = document.querySelector('[data-project-external]');
  if (externalLink) {
    externalLink.href = project.onlineUrl || project.link;
  }

  const visual = document.querySelector('[data-project-visual]');
  const coverImage = project.coverImage || project.image;

  if (visual) {
    visual.innerHTML = coverImage
      ? `<img src="${coverImage}" alt="${project.imageAlt}" />`
      : `
        <div class="project-fallback">
          <div class="fallback-browser"><span></span><span></span><span></span></div>
          <div class="fallback-hero"></div>
          <div class="fallback-stack"><span></span><span></span><span></span></div>
          <small>${project.category}</small>
        </div>
      `;
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

  renderList('[data-project-features]', project.developed || project.features);

  const gallery = document.querySelector('[data-project-gallery]');
  if (gallery) {
    const images = project.gallery || [];

    gallery.innerHTML = images.length
      ? images
          .map((image, index) => `
            <figure class="gallery-card anim slide-up ${index ? `d${Math.min(index, 3)}` : ''}">
              <img src="${image.src}" alt="${image.alt}" loading="lazy" />
              <figcaption>${image.label}</figcaption>
            </figure>
          `)
          .join('')
      : `
        <div class="gallery-card gallery-fallback anim slide-up">
          <div class="project-fallback">
            <div class="fallback-browser"><span></span><span></span><span></span></div>
            <div class="fallback-hero"></div>
            <div class="fallback-stack"><span></span><span></span><span></span></div>
            <small>${project.category}</small>
          </div>
        </div>
      `;

    requestAnimationFrame(() => {
      gallery.querySelectorAll('.anim').forEach((item) => item.classList.add('visible'));
    });
  }
}
