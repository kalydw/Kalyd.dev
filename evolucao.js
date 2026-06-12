const stageButtons = document.querySelectorAll('[data-stage-button]');
const themeButtons = document.querySelectorAll('[data-theme-button]');
const copyTargets = document.querySelectorAll('[data-copy]');
const imageTargets = document.querySelectorAll('[data-copy-src]');
const revealItems = document.querySelectorAll('.final-reveal');
const carouselSlides = document.querySelectorAll('.carousel-slide');
const carouselPrev = document.querySelector('[data-carousel-prev]');
const carouselNext = document.querySelector('[data-carousel-next]');
const stageLink = document.querySelector('[data-stage-link]');
let carouselIndex = 0;

const stages = {
  basic: {
    color: '#004cff',
    copy: {
      'brand-mark': 'K',
      brand: 'Kalyd.dev',
      eyebrow: 'Desenvolvimento front-end',
      'hero-title': 'Sites modernos que ajudam marcas a vender melhor.',
      'hero-text': 'Crio landing pages, portfolios e interfaces responsivas com visual profissional, boa performance e foco em transformar visitantes em clientes.',
      'primary-action': 'Solicitar orcamento',
      'secondary-action': 'Ver projetos',
      'panel-status': 'Disponivel para freelas',
      'panel-label': 'Landing page',
      'panel-title': 'Clareza, velocidade e conversao',
      'panel-text': 'Design responsivo com CTA forte, secoes objetivas e animacoes sutis.',
      strip: 'Especializado em transformar ideias simples em paginas bonitas, rapidas e faceis de entender.',
      'services-title': 'Servicos para negocios que precisam aparecer melhor online.',
      'project-kicker': 'Projetos selecionados',
      'project-title': 'Exemplos de paginas pensadas para impressionar e converter.',
      'project-intro': 'Use estes cards como base para trocar por projetos reais, screenshots e links quando quiser.',
      'project-type': 'Landing page comercial',
      'project-name': 'Studio Prime',
      'project-description': 'Uma pagina para servico premium, com hero direto, prova social e CTA visivel para orcamento.',
      'tag-one': 'Hero',
      'tag-two': 'CTA',
      'tag-three': 'Responsivo',
      'process-title': 'Um processo simples para tirar seu site do papel.',
      'contact-title': 'Quer um site com cara profissional para seu negocio?',
      'contact-text': 'Me chame com uma ideia, referencia ou objetivo. Eu ajudo a transformar isso em uma pagina bonita e responsiva.',
      'contact-action': 'Entrar em contato'
    },
    images: {
      'project-image': ''
    },
    link: './index.html#contato'
  },
  animated: {
    color: '#ff4fd8',
    copy: {
      'brand-mark': 'K',
      brand: 'Kalyd.dev',
      eyebrow: 'Portfolio em evolucao',
      'hero-title': 'A pagina ganhou movimento, brilho e um pouco de exagero.',
      'hero-text': 'Aqui a estrutura ja ficou mais viva: cards pulando, cores fortes, botoes mais marcados e uma tentativa clara de deixar tudo mais interativo.',
      'primary-action': 'Ver animacoes',
      'secondary-action': 'Comparar versoes',
      'panel-status': 'Versao experimental',
      'panel-label': 'Animacoes',
      'panel-title': 'Movimento, brilho e energia',
      'panel-text': 'Uma fase de testes com efeitos visuais mais chamativos, ainda sem o acabamento final.',
      strip: 'Essa versao mostra quando a interface deixa de ser estatica e comeca a parecer uma experiencia.',
      'services-title': 'A mesma base, agora com mais personalidade visual.',
      'project-kicker': 'Meio do caminho',
      'project-title': 'A pagina comeca a ter vida, mas ainda pede mais direcao.',
      'project-intro': 'Ela ja tem interacao e movimento, mas ainda nao apresenta um projeto real com tanta forca.',
      'project-type': 'Versao animada',
      'project-name': 'Portfolio com efeitos',
      'project-description': 'Uma etapa intermediaria com cores vibrantes, cards animados e uma energia mais divertida.',
      'tag-one': 'Hover',
      'tag-two': 'Glow',
      'tag-three': 'Motion',
      'process-title': 'Do layout estatico para uma experiencia com movimento.',
      'contact-title': 'Ja parece mais vivo, mas ainda da para evoluir.',
      'contact-text': 'O proximo passo foi trocar exemplos genericos por um projeto real e refinar as animacoes.',
      'contact-action': 'Ver versao final'
    },
    images: {
      'project-image': ''
    },
    link: '#final'
  },
  final: {
    color: '#d6ff5f',
    copy: {
      'brand-mark': 'K',
      brand: 'Kalyd.dev',
      eyebrow: 'Desenvolvimento front-end',
      'hero-title': 'Crio sites e interfaces web com visual profissional.',
      'hero-text': 'Desenvolvo landing pages, portfolios e aplicacoes responsivas como o FMEDCHOICES, uma plataforma de estudos para estudantes de medicina na Argentina.',
      'primary-action': 'Ver FMEDCHOICES',
      'secondary-action': 'Solicitar orcamento',
      'panel-status': 'Disponivel para freelas',
      'panel-label': 'Projeto real',
      'panel-title': 'FMEDCHOICES',
      'panel-text': 'Landing page e dashboard para organizar estudos, choices, pomodoro e flashcards.',
      strip: 'Especializado em transformar ideias de produto em paginas bonitas, rapidas e faceis de usar.',
      'services-title': 'Servicos para negocios que precisam aparecer melhor online.',
      'project-kicker': 'Projeto em destaque',
      'project-title': 'FMEDCHOICES, uma plataforma feita para estudantes de medicina.',
      'project-intro': 'Meu principal projeto ate agora: uma experiencia completa com landing page, area interna, modulos de estudo e foco em estudantes da Argentina, especialmente da UBA.',
      'project-type': 'Produto digital completo',
      'project-name': 'FMEDCHOICES',
      'project-description': 'Plataforma de estudos criada para estudantes de medicina na Argentina, com foco na UBA. O projeto combina landing page comercial, dashboard do estudante, Choices, Pomodoro, Flashcards, Biblioteca, Ranking, planos e area de login.',
      'tag-one': 'Dashboard',
      'tag-two': 'Choices',
      'tag-three': 'Flashcards',
      'process-title': 'Um processo simples para tirar seu site do papel.',
      'contact-title': 'Quer um site com cara profissional para seu negocio?',
      'contact-text': 'Me chame com uma ideia, referencia ou objetivo. Eu ajudo a transformar isso em uma pagina bonita, responsiva e pronta para atrair clientes.',
      'contact-action': 'Entrar em contato'
    },
    images: {
      'project-image': 'https://medarena.vercel.app/_next/image?url=%2Fimages%2Fhero-mockup.png&w=1200&q=85'
    },
    link: './index.html#contato'
  }
};

const savedTheme = localStorage.getItem('evolution-theme') || 'default';

const applyTheme = (theme) => {
  document.body.dataset.theme = theme;
  localStorage.setItem('evolution-theme', theme);

  themeButtons.forEach((button) => {
    const isActive = button.dataset.themeButton === theme;

    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
};

const playFlow = (button, stage) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const rect = button.getBoundingClientRect();
  const flow = document.createElement('span');

  flow.className = 'comparison-flow';
  flow.style.setProperty('--flow-x', `${rect.left + rect.width / 2}px`);
  flow.style.setProperty('--flow-y', `${rect.top + rect.height / 2}px`);
  flow.style.setProperty('--flow-color', getComputedStyle(document.body).getPropertyValue('--accent').trim());

  document.body.appendChild(flow);
  flow.addEventListener('animationend', () => flow.remove(), { once: true });
};

const applyStage = (stage, button) => {
  if (document.body.dataset.stage === stage) {
    return;
  }

  playFlow(button, stage);
  document.body.classList.add('is-switching');

  window.setTimeout(() => {
    document.body.dataset.stage = stage;

    copyTargets.forEach((target) => {
      target.textContent = stages[stage].copy[target.dataset.copy];
    });

    imageTargets.forEach((target) => {
      const src = stages[stage].images[target.dataset.copySrc];
      target.src = src;
      target.alt = src ? 'Mockup do FMEDCHOICES' : '';
    });

    if (stageLink) {
      stageLink.setAttribute('href', stages[stage].link);
    }

    stageButtons.forEach((stageButton) => {
      const isActive = stageButton.dataset.stageButton === stage;

      stageButton.classList.toggle('active', isActive);
      stageButton.setAttribute('aria-pressed', String(isActive));
    });

    document.body.classList.remove('is-switching');
    refreshRevealState();
  }, 180);
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle('visible', entry.isIntersecting);
  });
}, {
  threshold: 0.16,
  rootMargin: '0px 0px -80px 0px'
});

const checkRevealVisibility = () => {
  if (document.body.dataset.stage !== 'final') {
    return;
  }

  revealItems.forEach((item) => {
    const rect = item.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight * 0.86 && rect.bottom > 0;

    if (isVisible) {
      item.classList.add('visible');
    }
  });
};

const refreshRevealState = () => {
  if (document.body.dataset.stage !== 'final') {
    revealItems.forEach((item) => item.classList.add('visible'));
    return;
  }

  revealItems.forEach((item) => {
    item.classList.remove('visible');
    revealObserver.unobserve(item);
    revealObserver.observe(item);
  });

  window.setTimeout(checkRevealVisibility, 40);
};

const updateCarousel = (direction) => {
  carouselIndex = (carouselIndex + direction + carouselSlides.length) % carouselSlides.length;

  carouselSlides.forEach((slide, index) => {
    slide.classList.toggle('active', index === carouselIndex);
  });
};

stageButtons.forEach((button) => {
  button.setAttribute('aria-pressed', String(button.classList.contains('active')));
  button.addEventListener('click', () => applyStage(button.dataset.stageButton, button));
});

themeButtons.forEach((button) => {
  button.addEventListener('click', () => applyTheme(button.dataset.themeButton));
});

carouselPrev?.addEventListener('click', () => updateCarousel(-1));
carouselNext?.addEventListener('click', () => updateCarousel(1));
stageLink?.addEventListener('click', (event) => {
  if (document.body.dataset.stage !== 'animated') {
    return;
  }

  event.preventDefault();
  applyStage('final', document.querySelector('[data-stage-button="final"]'));
});
window.addEventListener('scroll', checkRevealVisibility, { passive: true });

applyTheme(savedTheme);
refreshRevealState();

const pageTransition = document.createElement('span');
pageTransition.className = 'page-transition';
pageTransition.setAttribute('aria-hidden', 'true');
document.body.classList.add('page-enter');
document.body.appendChild(pageTransition);

requestAnimationFrame(() => {
  document.body.classList.remove('page-enter');
  document.body.classList.add('page-ready');
});

const pageTransitionTargets = ['index.html', 'sobre.html', 'evolucao.html'];
const hasReducedPageMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const shouldUsePageTransition = (link) => {
  if (!link || link.target === '_blank' || link.hasAttribute('download')) {
    return false;
  }

  const href = link.getAttribute('href');

  if (
    !href ||
    href.startsWith('#') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.includes('wa.me') ||
    href.includes('whatsapp')
  ) {
    return false;
  }

  let url;

  try {
    url = new URL(href, window.location.href);
  } catch {
    return false;
  }

  if (url.origin !== window.location.origin) {
    return false;
  }

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const targetPage = url.pathname.split('/').pop() || 'index.html';

  return currentPage !== targetPage && pageTransitionTargets.includes(targetPage);
};

document.addEventListener('click', (event) => {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return;
  }

  const link = event.target instanceof Element ? event.target.closest('a') : null;

  if (!shouldUsePageTransition(link)) {
    return;
  }

  event.preventDefault();

  if (hasReducedPageMotion()) {
    window.location.href = link.href;
    return;
  }

  document.body.classList.add('page-leaving');
  pageTransition.classList.add('active');

  window.setTimeout(() => {
    window.location.href = link.href;
  }, 460);
});

window.addEventListener('pageshow', () => {
  document.body.classList.remove('page-leaving');
  pageTransition.classList.remove('active');
});
