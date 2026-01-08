// ===========================
// SCROLL ANIMATIONS
// ===========================

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar effects
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.08)';
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.boxShadow = 'none';
        navbar.style.background = 'rgba(255, 255, 255, 0.8)';
    }
});

// ===========================
// SCROLL REVEAL SYSTEM
// ===========================

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
});

// Initialize all reveal animations
const initRevealAnimations = () => {
    // Section titles
    document.querySelectorAll('.section-title, .section-title-center').forEach(el => {
        el.classList.add('scroll-reveal');
        revealObserver.observe(el);
    });

    // Focus cards - staggered
    document.querySelectorAll('.focus-card').forEach((el, i) => {
        el.classList.add('scroll-reveal', `reveal-delay-${(i % 4) + 1}`);
        revealObserver.observe(el);
    });

    // Project cards - staggered
    document.querySelectorAll('.project-card').forEach((el, i) => {
        el.classList.add('scroll-reveal', `reveal-delay-${(i % 3) + 1}`);
        revealObserver.observe(el);
    });

    // Proof columns
    document.querySelectorAll('.proof-column').forEach((el, i) => {
        el.classList.add(i === 0 ? 'scroll-reveal-left' : 'scroll-reveal-right');
        revealObserver.observe(el);
    });

    // Timeline items - staggered
    document.querySelectorAll('.timeline-item').forEach((el, i) => {
        el.classList.add('scroll-reveal', `reveal-delay-${(i % 5) + 1}`);
        revealObserver.observe(el);
    });

    // Connect cards
    document.querySelectorAll('.connect-card').forEach((el, i) => {
        el.classList.add('scroll-reveal', `reveal-delay-${i + 1}`);
        revealObserver.observe(el);
    });

    // Text blocks
    document.querySelectorAll('.behind-text, .proof-header, .featured-header, .journey-subtitle, .philosophy-text').forEach(el => {
        el.classList.add('scroll-reveal');
        revealObserver.observe(el);
    });
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initRevealAnimations();
    initTypingEffect();
    initScrollProgress();
    initBackToTop();
    initCounterAnimation();
});

// ===========================
// TYPING EFFECT
// ===========================
const initTypingEffect = () => {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const words = ["JavaScript", "Problem Solving", "Backend Dev", "Engineering"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    const type = () => {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typeSpeed);
    };

    type();
};

// ===========================
// SCROLL PROGRESS
// ===========================
const initScrollProgress = () => {
    const progressBar = document.getElementById('scrollProgressBar');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

// ===========================
// BACK TO TOP
// ===========================
const initBackToTop = () => {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

// ===========================
// COUNTER ANIMATION
// ===========================
const initCounterAnimation = () => {
    const stats = document.querySelectorAll('.stat-value');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                if (!target) return;

                let count = 0;
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps

                const updateCount = () => {
                    count += increment;
                    if (count < target) {
                        entry.target.innerText = Math.ceil(count);
                        requestAnimationFrame(updateCount);
                    } else {
                        entry.target.innerText = target;
                    }
                };

                updateCount();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
};
