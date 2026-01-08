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
    initMobileMenu();
    initThemeToggle();
    initProjectFilters();
    initSkillsChart();
    initContactForm();
});

// ===========================
// MOBILE MENU
// ===========================
const initMobileMenu = () => {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');

    if (!mobileMenuBtn || !navLinks) return;

    const closeMenu = () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    };

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');

        // Lock/unlock body scroll
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMenu();
        }
    });
};

// ===========================
// DARK MODE TOGGLE
// ===========================
const initThemeToggle = () => {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    if (!themeToggle) return;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        html.setAttribute('data-theme', 'dark');
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
};

// ===========================
// PROJECT FILTERS
// ===========================
const initProjectFilters = () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card-new');

    if (filterBtns.length === 0 || projectCards.length === 0) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
};

// ===========================
// SKILLS RADAR CHART
// ===========================
const initSkillsChart = () => {
    const canvas = document.getElementById('skillsChart');
    if (!canvas || typeof Chart === 'undefined') return;

    const ctx = canvas.getContext('2d');

    // Get theme colors
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? '#f1f5f9' : '#0f172a';
    const gridColor = isDark ? 'rgba(241, 245, 249, 0.1)' : 'rgba(15, 23, 42, 0.1)';

    // Use config data if available
    const skillsData = window.PORTFOLIO_SKILLS_DATA || {
        labels: ['JavaScript', 'Problem Solving', 'HTML/CSS', 'Git', 'Python', 'Backend Concepts'],
        data: [75, 70, 80, 65, 55, 45]
    };

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: skillsData.labels,
            datasets: [{
                label: 'Current Level',
                data: skillsData.data,
                backgroundColor: 'rgba(99, 102, 241, 0.2)',
                borderColor: 'rgba(99, 102, 241, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(99, 102, 241, 1)',
                pointBorderColor: '#fff',
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20,
                        color: textColor,
                        backdropColor: 'transparent'
                    },
                    grid: {
                        color: gridColor
                    },
                    pointLabels: {
                        color: textColor,
                        font: {
                            size: 12,
                            weight: '500'
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
};

// ===========================
// CONTACT FORM
// ===========================
const initContactForm = () => {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        const submitBtn = form.querySelector('.contact-submit');
        const originalText = submitBtn.innerHTML;

        // Show loading state
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;

        // Form will submit naturally to Formspree
        // Reset button after a delay (in case form stays on page)
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 3000);
    });
};

// ===========================
// TYPING EFFECT
// ===========================
const initTypingEffect = () => {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    // Use config data if available, otherwise use defaults
    const words = window.PORTFOLIO_TYPING_TEXTS || ["JavaScript", "Problem Solving", "Backend Dev", "Engineering"];
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
