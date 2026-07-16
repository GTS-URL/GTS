/* ============================================================
   EKATVA EM SCHOOL — PORTAL SCRIPTS
   ============================================================ */

// 1. MOBILE MENU TOGGLE
const menuToggle = document.querySelector('.menu-toggle');
const siteNav    = document.querySelector('.site-nav');

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.classList.toggle('active', isOpen);
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.classList.remove('active');
    });
  });

  document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !siteNav.contains(e.target)) {
      siteNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.classList.remove('active');
    }
  });
}

// 2. HEADER SHADOW ON SCROLL
const header = document.querySelector('.site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}

// 3. SCROLL-REVEAL ANIMATIONS
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

if ('IntersectionObserver' in window && revealEls.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach((el) => revealObserver.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('visible'));
}

// 4. ACTIVE NAV LINK ON SCROLL
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.site-nav a[href^="#"]');

if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { threshold: 0.35 }
  );
  sections.forEach((s) => sectionObserver.observe(s));
}

// 5. ADMISSION FORM HANDLER (exposed globally for inline onsubmit)
function handleEnquiry(e) {
  e.preventDefault();
  const form = e.target;
  const btn  = form.querySelector('button[type="submit"]');
  const orig = btn.textContent;

  btn.textContent = 'Submitting…';
  btn.disabled    = true;

  setTimeout(() => {
    btn.textContent           = '✓ Enquiry Submitted!';
    btn.style.background      = 'linear-gradient(135deg, #2d6a4f, #40916c)';
    btn.style.boxShadow       = '0 8px 24px rgba(45, 106, 79, 0.35)';

    setTimeout(() => {
      form.reset();
      btn.textContent      = orig;
      btn.style.background = '';
      btn.style.boxShadow  = '';
      btn.disabled         = false;
    }, 3500);
  }, 900);
}
