(() => {
  const header = document.querySelector('[data-header]');
  const navToggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');

  const updateHeader = () => {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 10);
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = String(new Date().getFullYear());
  });

  // Replace these placeholders when the public repository/demo destinations are known.
  const githubUrl = '#';
  const tryUrl = '#try';
  document.querySelectorAll('[data-try-link]').forEach(link => {
    link.setAttribute('href', tryUrl);
  });

  document.querySelectorAll('[data-github-link]').forEach(link => {
    link.setAttribute('href', githubUrl);
    if (githubUrl === '#') {
      link.addEventListener('click', event => {
        event.preventDefault();
        document.getElementById('try')?.scrollIntoView({ behavior: 'smooth' });
      });
    } else {
      link.setAttribute('rel', 'noopener');
    }
  });
})();
