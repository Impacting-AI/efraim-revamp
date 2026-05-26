const header = document.querySelector('[data-header]');
let scrollTicking = false;

const updateHeader = () => {
  header?.classList.toggle('header--scrolled', window.scrollY > 80);
  scrollTicking = false;
};

window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    scrollTicking = true;
    setTimeout(updateHeader, 16);
  }
}, { passive: true });

updateHeader();

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reducedMotion) {
  document.querySelectorAll('.fade-in').forEach(el => el.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const targetId = link.getAttribute('href');

    if (!targetId || targetId === '#') {
      return;
    }

    const target = document.querySelector(targetId);

    if (target) {
      event.preventDefault();
      target.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'start'
      });
    }
  });
});
