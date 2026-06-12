const animatedItems = document.querySelectorAll('.anim');
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.site-nav');
const modal = document.querySelector('[data-modal]');
const modalOpenButton = document.querySelector('[data-modal-open]');
const modalCloseButtons = document.querySelectorAll('[data-modal-close]');
const themeButtons = document.querySelectorAll('[data-theme-button]');
const headerHideButton = document.querySelector('[data-header-hide]');
const headerShowButton = document.querySelector('[data-header-show]');
const savedTheme = localStorage.getItem('site-theme') || 'default';
const themeFlowColors = {
  default: '#d6ff5f',
  purple: '#c084fc',
  red: '#e53935',
  'dark-purple': '#7c3cff'
};

const playThemeFlow = (button, theme) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const rect = button.getBoundingClientRect();
  const flow = document.createElement('span');

  flow.className = 'theme-flow-overlay';
  flow.style.setProperty('--theme-flow-x', `${rect.left + rect.width / 2}px`);
  flow.style.setProperty('--theme-flow-y', `${rect.top + rect.height / 2}px`);
  flow.style.setProperty('--theme-flow-color', themeFlowColors[theme] || themeFlowColors.default);

  document.body.appendChild(flow);
  flow.addEventListener('animationend', () => flow.remove(), { once: true });
};

const applyTheme = (theme) => {
  document.body.dataset.theme = theme;
  localStorage.setItem('site-theme', theme);
  localStorage.setItem('evolution-theme', theme);

  themeButtons.forEach((button) => {
    const isActive = button.dataset.themeButton === theme;

    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
};

applyTheme(savedTheme);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle('visible', entry.isIntersecting);
  });
}, {
  threshold: 0.16,
  rootMargin: '0px 0px -70px 0px'
});

animatedItems.forEach((item) => observer.observe(item));

const closeMenu = () => {
  menuButton?.setAttribute('aria-expanded', 'false');
  menu?.classList.remove('open');
  document.body.classList.remove('menu-open');
};

const openModal = () => {
  modal?.classList.add('open');
  modal?.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  closeMenu();
  modal?.querySelector('input[name="nome"]')?.focus();
};

const closeModal = () => {
  modal?.classList.remove('open');
  modal?.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  modalOpenButton?.focus();
};

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';

  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menu?.classList.toggle('open', !isOpen);
  document.body.classList.toggle('menu-open', !isOpen);
});

menu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

modalOpenButton?.addEventListener('click', openModal);
modalCloseButtons.forEach((button) => button.addEventListener('click', closeModal));

headerHideButton?.addEventListener('click', () => {
  closeMenu();
  document.body.classList.add('header-hidden');
});

headerShowButton?.addEventListener('click', () => {
  document.body.classList.remove('header-hidden');
});

themeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const theme = button.dataset.themeButton;

    playThemeFlow(button, theme);
    applyTheme(theme);
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal?.classList.contains('open')) {
    closeModal();
  }
});

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
