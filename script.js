/* ========================================
   Modern Portfolio JavaScript
   Interactive Features & Animations
   ======================================== */

// ========================================
// Scroll Animation Observer
// ========================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

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

// Observe all fade-in elements
document.addEventListener('DOMContentLoaded', () => {
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(el => observer.observe(el));
});

// ========================================
// Active Navigation Link on Scroll
// ========================================

window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ========================================
// Typing Effect for Hero Section
// ========================================

const typingText = document.querySelector('.typing-text');
if (typingText) {
  const roles = [
    'Backend Developer & Python Engineer',
    'Flask & FastAPI Specialist',
    'Docker & Kubernetes Expert',
    'AI/ML Solutions Architect',
    'Full-Stack Problem Solver'
  ];
  
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      typingText.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingText.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at end
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500;
    }
    
    setTimeout(type, typingSpeed);
  }
  
  // Start typing effect after a brief delay
  setTimeout(type, 1000);
}

// ========================================
// Smooth Scroll for Navigation Links
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ========================================
// Add Parallax Effect to Floating Icons
// ========================================

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const floatingElements = document.querySelectorAll('.floating-code, .floating-database, .floating-cloud');
  
  floatingElements.forEach((element, index) => {
    const speed = 0.1 + (index * 0.05);
    const yPos = -(scrolled * speed);
    element.style.transform = `translateY(${yPos}px)`;
  });
});

// ========================================
// Project Card Tilt Effect
// ========================================

const projectCards = document.querySelectorAll('.project');

projectCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// ========================================
// Skill Tag Animation on Hover
// ========================================

const skillTags = document.querySelectorAll('.skill-tag');

skillTags.forEach(tag => {
  tag.addEventListener('mouseenter', () => {
    // Create ripple effect
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.5)';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.animation = 'ripple 0.6s ease-out';
    
    tag.style.position = 'relative';
    tag.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// ========================================
// Counter Animation for Stats
// ========================================

function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    start += increment;
    element.textContent = Math.floor(start);
    
    if (start >= target) {
      element.textContent = target;
      clearInterval(timer);
    }
  }, 16);
}

// ========================================
// Add Loading Animation
// ========================================

window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});

// ========================================
// Console Easter Egg
// ========================================

console.log('%c👋 Hello, Developer!', 'color: #667eea; font-size: 24px; font-weight: bold;');
console.log('%c🚀 Welcome to my portfolio!', 'color: #ffbf00; font-size: 16px;');
console.log('%cBuilt with passion using HTML, CSS, and JavaScript.', 'color: #94a3b8; font-size: 14px;');
console.log('%c📧 Want to collaborate? Reach out at akashyadavazm8@gmail.com', 'color: #4facfe; font-size: 14px;');
console.log('%c💼 GitHub: https://github.com/akashcodejames', 'color: #f5576c; font-size: 14px;');

// ========================================
// Lazy Loading for Images
// ========================================

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });
  
  const lazyImages = document.querySelectorAll('img[data-src]');
  lazyImages.forEach(img => imageObserver.observe(img));
}

// ========================================
// Scroll Progress Indicator (Optional)
// ========================================

function createScrollIndicator() {
  const indicator = document.createElement('div');
  indicator.style.position = 'fixed';
  indicator.style.top = '0';
  indicator.style.left = '0';
  indicator.style.height = '4px';
  indicator.style.background = 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)';
  indicator.style.zIndex = '9999';
  indicator.style.transition = 'width 0.1s ease';
  
  document.body.appendChild(indicator);
  
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    indicator.style.width = scrolled + '%';
  });
}

// Uncomment to enable scroll progress indicator
// createScrollIndicator();

// ========================================
// Performance Monitoring (Development)
// ========================================

if (window.performance && window.performance.timing) {
  window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    
    if (pageLoadTime > 0) {
      console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
    }
  });
}

// ========================================
// Accessibility: Keyboard Navigation
// ========================================

document.addEventListener('keydown', (e) => {
  // ESC key to scroll to top
  if (e.key === 'Escape') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
});

// ========================================
// Add subtle animation to contact cards
// ========================================

const contactCards = document.querySelectorAll('.contact-card');

contactCards.forEach((card, index) => {
  card.style.animationDelay = `${index * 0.1}s`;
});

// ========================================
// Initialize all features on DOMContentLoaded
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ Portfolio initialized successfully!');
  
  // Add smooth reveal animation to main sections
  const mainSections = document.querySelectorAll('section');
  mainSections.forEach((section, index) => {
    section.style.animationDelay = `${index * 0.1}s`;
  });
});
