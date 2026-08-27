/* script.js — Abdisa Abdella Engineering Portfolio */

const navLinks      = document.querySelectorAll('.nav-links a');
const sections      = document.querySelectorAll('section[id]');
const progressItems = document.querySelectorAll('.progress-item');
const revealEls     = document.querySelectorAll('.reveal');
const navToggle     = document.getElementById('navToggle');
const navMobile     = document.getElementById('navMobile');

const sectionToNav = {
  'intro':      'intro',
  'skills':     'skills',
  'projects':   'projects',
  'experience': 'projects',
  'knee-brace': 'projects',
  'robot':      'projects',
  'garden':     'projects',
  'research':   'projects',
  'golf':       'projects',
  'goals':      'goals',
  'contact':    'contact',
};

function onScroll() {
  const scrollY   = window.scrollY;
  const navHeight = document.getElementById('navbar').offsetHeight;
  let activeId    = null;

  sections.forEach(section => {
    const top    = section.offsetTop - navHeight - 80;
    const bottom = top + section.offsetHeight;
    if (scrollY >= top && scrollY < bottom) activeId = section.getAttribute('id');
  });

  if (!activeId) return;

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').replace('#', '') === sectionToNav[activeId]) {
      link.classList.add('active');
    }
  });

  progressItems.forEach(item => {
    item.classList.toggle('active', item.getAttribute('data-section') === activeId);
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Scroll reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

revealEls.forEach(el => observer.observe(el));

// Mobile toggle
navToggle.addEventListener('click', () => {
  const open = navMobile.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});
navMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMobile.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const id = anchor.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const navH = document.getElementById('navbar').offsetHeight;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navH, behavior: 'smooth' });
  });
});
