// Nav scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Burger menu
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Active nav link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const observerNav = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });
sections.forEach(s => observerNav.observe(s));

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const observerReveal = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observerReveal.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
reveals.forEach(el => observerReveal.observe(el));

// About counters start when the proof badges enter the viewport.
const aboutStats = document.querySelector('.about-stats');
if (aboutStats && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.about-count').forEach(counter => {
        const target = Number(counter.dataset.count) || 0;
        const started = performance.now();
        const duration = 1100;
        const tick = now => {
          const progress = Math.min((now - started) / duration, 1);
          counter.textContent = Math.round(target * (1 - Math.pow(1 - progress, 3)));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
      statsObserver.unobserve(entry.target);
    });
  }, { threshold: 0.35 });
  statsObserver.observe(aboutStats);
} else if (aboutStats) {
  aboutStats.querySelectorAll('.about-count').forEach(counter => {
    counter.textContent = counter.dataset.count || '0';
  });
}

// Small differential scroll speeds add depth without affecting touch layouts.
const aboutSection = document.getElementById('apropos');
if (aboutSection && window.matchMedia('(min-width: 900px) and (prefers-reduced-motion: no-preference)').matches) {
  let aboutFrame = 0;
  const updateAboutParallax = () => {
    aboutFrame = 0;
    const bounds = aboutSection.getBoundingClientRect();
    const offset = Math.max(-10, Math.min(10, (innerHeight * 0.5 - (bounds.top + bounds.height * 0.5)) * 0.018));
    aboutSection.style.setProperty('--about-story-shift', `${-offset}px`);
    aboutSection.style.setProperty('--about-proof-shift', `${offset}px`);
  };
  addEventListener('scroll', () => {
    if (!aboutFrame) aboutFrame = requestAnimationFrame(updateAboutParallax);
  }, { passive: true });
  updateAboutParallax();
}

// Portfolio filter
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    portfolioItems.forEach(item => {
      if (filter === 'all' || item.dataset.cat === filter) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDesc = document.getElementById('lightboxDesc');
const lightboxClose = document.getElementById('lightboxClose');

portfolioItems.forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    lightboxImg.src = img.src.replace('w=500&h=500', 'w=1200&h=1200');
    lightboxImg.alt = img.alt;
    lightboxTitle.textContent = item.dataset.title || '';
    lightboxDesc.textContent = item.dataset.desc || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// Form submit
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const original = btn.innerHTML;
  btn.innerHTML = '<i class="fa-solid fa-check"></i> Message envoyé !';
  btn.style.background = 'linear-gradient(135deg, #25d366, #128c7e)';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = original;
    btn.style.background = '';
    btn.disabled = false;
    e.target.reset();
  }, 3000);
});

// Subtle parallax on orbs
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  const o1 = document.querySelector('.orb-1');
  const o2 = document.querySelector('.orb-2');
  if (o1) o1.style.transform = `translate(${y * 0.02}px, ${y * 0.03}px)`;
  if (o2) o2.style.transform = `translate(${-y * 0.015}px, ${y * 0.02}px)`;
}, { passive: true });
