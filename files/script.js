// nav scroll state
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// active nav link + reveal on scroll
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a[data-nav]');
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = e.target.id;
      navItems.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => { if (['why-wonju','medical-growth','semiconductor','converge','future'].includes(s.id)) navObserver.observe(s); });

// growth chart bars animate on view
const chart = document.getElementById('growthChart');
if (chart) {
  const bars = chart.querySelectorAll('.chart-bar');
  const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        bars.forEach(b => {
          const h = parseFloat(b.dataset.h);
          b.setAttribute('height', h);
          b.setAttribute('y', 160 - h);
        });
        chartObserver.disconnect();
      }
    });
  }, { threshold: 0.4 });
  chartObserver.observe(chart);
  bars.forEach(b => b.style.transition = 'height .9s cubic-bezier(.2,.7,.3,1), y .9s cubic-bezier(.2,.7,.3,1)');
}

// hero pulse line subtle draw animation
const pulsePath = document.getElementById('pulsePath');
if (pulsePath) {
  const len = pulsePath.getTotalLength();
  pulsePath.style.strokeDasharray = len;
  pulsePath.style.strokeDashoffset = len;
  requestAnimationFrame(() => {
    pulsePath.style.transition = 'stroke-dashoffset 2.4s cubic-bezier(.2,.7,.3,1)';
    pulsePath.style.strokeDashoffset = 0;
  });
}
