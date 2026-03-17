// ===== HEADER SCROLL =====
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== HERO SLIDER =====
function initSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  if (!slides.length) return;

  let current = 0;
  let interval;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
  }

  function next() { goTo(current + 1); }

  function startAutoplay() {
    interval = setInterval(next, 5000);
  }

  function stopAutoplay() {
    clearInterval(interval);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      stopAutoplay();
      goTo(i);
      startAutoplay();
    });
  });

  startAutoplay();
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.classList.contains('stat-card')) {
          entry.target.classList.add('animated');
          animateCounter(entry.target);
        }
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.fade-up, .stat-card').forEach(el => {
    observer.observe(el);
  });
}

// ===== COUNTER ANIMATION =====
function animateCounter(card) {
  const numEl = card.querySelector('.stat-number');
  if (!numEl || numEl.dataset.animated) return;
  numEl.dataset.animated = 'true';

  const target = parseInt(numEl.dataset.target) || 0;
  if (target === 0) return;

  let start = 0;
  const duration = 2000;
  const startTime = performance.now();

  function update(time) {
    const elapsed = time - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(start + (target - start) * eased);
    numEl.textContent = value.toLocaleString('ru-RU');
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

// ===== MOBILE MENU =====
function initMobileMenu() {
  const burger = document.querySelector('.burger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!burger || !mobileNav) return;

  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Toggle submenus in mobile
  mobileNav.querySelectorAll('.mobile-nav-toggle').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const sub = toggle.nextElementSibling;
      if (sub) sub.style.display = sub.style.display === 'block' ? 'none' : 'block';
      toggle.classList.toggle('open');
    });
  });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initSlider();
  initScrollAnimations();
  initMobileMenu();
});
