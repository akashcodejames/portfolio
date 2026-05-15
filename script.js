/* ========================================
   Modern Portfolio JavaScript
   ======================================== */

// ========================================
// Scroll Progress Bar
// ========================================
const scrollBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const winH = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  scrollBar.style.width = ((window.pageYOffset / winH) * 100) + '%';
});

// ========================================
// Mobile Sidebar (Hamburger)
// ========================================
const hamburger   = document.getElementById('hamburgerBtn');
const sidebar     = document.getElementById('sidebar');
const overlay     = document.getElementById('sidebarOverlay');
const closeBtn    = document.getElementById('sidebarClose');

function openSidebar() {
  sidebar.classList.add('open');
  overlay.classList.add('open');
  hamburger.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('open');
  hamburger.classList.remove('open');
  document.body.style.overflow = '';
}

if (hamburger) hamburger.addEventListener('click', openSidebar);
if (closeBtn)  closeBtn.addEventListener('click', closeSidebar);
if (overlay)   overlay.addEventListener('click', closeSidebar);

// Close sidebar on nav link click (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', closeSidebar);
});

// ========================================
// Fetch Live GitHub Stats – Agentic Job Apply
// ========================================
async function fetchGitHubStats() {
  try {
    const res = await fetch('https://api.github.com/repos/akashcodejames/Agentic_Job_Apply');
    if (!res.ok) return;
    const data = await res.json();

    // Stars
    const starsEl = document.querySelector('#gh-stars span');
    if (starsEl) { starsEl.textContent = data.stargazers_count ?? 0; }
    document.getElementById('gh-stars')?.classList.replace('loading', 'loaded');

    // Forks
    const forksEl = document.querySelector('#gh-forks span');
    if (forksEl) { forksEl.textContent = data.forks_count ?? 0; }
    document.getElementById('gh-forks')?.classList.replace('loading', 'loaded');

    // Language
    const langEl = document.querySelector('#gh-lang span');
    if (langEl) { langEl.textContent = data.language ?? 'Python'; }
    document.getElementById('gh-lang')?.classList.replace('loading', 'loaded');

    // Last updated
    const updEl = document.querySelector('#gh-updated span');
    if (updEl && data.updated_at) {
      const d = new Date(data.updated_at);
      updEl.textContent = 'Last updated: ' + d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    }
  } catch (e) {
    // Silently fail – static content is still shown
    ['gh-stars','gh-forks','gh-lang'].forEach(id => {
      document.getElementById(id)?.classList.replace('loading','loaded');
    });
    const updEl = document.querySelector('#gh-updated span');
    if (updEl) updEl.textContent = 'View on GitHub →';
  }
}
fetchGitHubStats();

// ========================================
// Scroll Animation Observer
// ========================================
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 100);
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});

// ========================================
// Active Navigation Link on Scroll
// ========================================
window.addEventListener('scroll', () => {
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');
  let current = '';

  sections.forEach(section => {
    if (window.pageYOffset >= section.offsetTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
});

// ========================================
// Typing Effect – Hero
// ========================================
const typingText = document.querySelector('.typing-text');
if (typingText) {
  const roles = [
    'Backend Developer & Python Engineer',
    'Flask & FastAPI Specialist',
    'LangGraph Automation Architect',
    'Docker & Kubernetes Expert',
    'AI/ML Solutions Builder'
  ];
  let roleIndex = 0, charIndex = 0, isDeleting = false, typingSpeed = 100;

  function type() {
    const current = roles[roleIndex];
    typingText.textContent = isDeleting
      ? current.substring(0, charIndex - 1)
      : current.substring(0, charIndex + 1);

    isDeleting ? charIndex-- : charIndex++;
    typingSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === current.length) {
      typingSpeed = 2000; isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500;
    }
    setTimeout(type, typingSpeed);
  }
  setTimeout(type, 1000);
}

// ========================================
// Counter Animation – Hero Stats
// ========================================
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    el.textContent = Math.floor(start);
    if (start >= target) { el.textContent = target; clearInterval(timer); }
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-number[data-target]').forEach(el => {
        animateCounter(el, parseInt(el.dataset.target));
      });
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ========================================
// Smooth Scroll
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    }
  });
});

// ========================================
// Parallax on Floating Icons
// ========================================
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  document.querySelectorAll('.floating-code, .floating-database, .floating-cloud, .floating-robot')
    .forEach((el, i) => {
      el.style.transform = `translateY(${-(scrolled * (0.08 + i * 0.04))}px)`;
    });
});

// Project card hover is handled purely by CSS (gentle scale)

// ========================================
// Skill Tag Ripple
// ========================================
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('mouseenter', () => {
    const r = document.createElement('span');
    Object.assign(r.style, {
      position: 'absolute', borderRadius: '50%',
      background: 'rgba(255,255,255,0.4)', width: '20px', height: '20px',
      animation: 'ripple 0.6s ease-out'
    });
    tag.style.position = 'relative';
    tag.appendChild(r);
    setTimeout(() => r.remove(), 600);
  });
});

// ========================================
// Page Load Fade-in
// ========================================
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 50);
});

// ========================================
// Keyboard: ESC scrolls to top
// ========================================
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeSidebar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

// ========================================
// Console Easter Egg
// ========================================
console.log('%c👋 Hello, Developer!', 'color:#667eea;font-size:24px;font-weight:bold;');
console.log('%c🤖 This portfolio fetches live GitHub stats!', 'color:#ffbf00;font-size:14px;');
console.log('%c📧 akashyadavazm8@gmail.com', 'color:#4facfe;font-size:14px;');
console.log('%c💼 https://github.com/akashcodejames', 'color:#f5576c;font-size:14px;');

document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ Portfolio initialized!');
});
