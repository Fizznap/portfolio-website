// ===========================
// PORTFOLIO DATA RENDERER
// ===========================
// This file loads configuration from the admin panel and updates the portfolio dynamically

class PortfolioRenderer {
    constructor() {
        this.config = this.loadConfig();
        this.isPreview = new URLSearchParams(window.location.search).get('preview') === 'true';

        if (this.config && Object.keys(this.config).length > 0) {
            this.init();
        }
    }

    loadConfig() {
        // Check if we're in preview mode or if config exists
        const saved = localStorage.getItem('portfolioConfig');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error('Failed to parse portfolio config:', e);
                return null;
            }
        }
        return null;
    }

    init() {
        // Only update if we have valid config
        this.updateHero();
        this.updateAbout();
        this.updateProjects();
        this.updateSkillsChart();
        this.updateJourney();
        this.updateSettings();

        if (this.isPreview) {
            this.showPreviewBanner();
        }
    }

    updateHero() {
        const hero = this.config.hero;
        if (!hero) return;

        // Update name
        const nameElement = document.querySelector('.hero-name-highlight');
        if (nameElement) {
            nameElement.textContent = hero.name;
        }

        // Update badge
        const badgeElement = document.querySelector('.hero-badge span:last-child');
        if (badgeElement && hero.badge) {
            badgeElement.textContent = hero.badge;
        }

        // Update description
        const descElement = document.querySelector('.hero-description-short');
        if (descElement && hero.description) {
            descElement.textContent = hero.description;
        }

        // Update quote
        const quoteElement = document.querySelector('.scroll-quote');
        if (quoteElement && hero.quote) {
            quoteElement.textContent = `"${hero.quote}"`;
        }

        // Update typing texts (expose to global for the typing effect)
        if (hero.typingTexts && hero.typingTexts.length > 0) {
            window.PORTFOLIO_TYPING_TEXTS = hero.typingTexts;
        }
    }

    updateAbout() {
        const about = this.config.about;
        if (!about) return;

        const titleElement = document.querySelector('.about-title');
        if (titleElement && about.title) {
            titleElement.textContent = about.title;
        }

        const subtitleElement = document.querySelector('.about-subtitle');
        if (subtitleElement && about.subtitle) {
            subtitleElement.textContent = about.subtitle;
        }
    }

    updateProjects() {
        const projects = this.config.projects;
        if (!projects || projects.length === 0) return;

        const container = document.querySelector('.projects-grid-new');
        if (!container) return;

        container.innerHTML = '';

        projects.forEach(project => {
            const tagsHTML = project.tags.map(tag => {
                let tagClass = 'tag';
                if (tag.toLowerCase().includes('python')) tagClass += ' tag-python';
                else if (tag.toLowerCase().includes('web') || tag.toLowerCase().includes('html') || tag.toLowerCase().includes('css')) tagClass += ' tag-web';
                else if (tag.toLowerCase().includes('react') || tag.toLowerCase().includes('app')) tagClass += ' tag-app';
                return `<span class="${tagClass}">${tag}</span>`;
            }).join('');

            const aiTag = project.aiAssisted ? '<span class="tag tag-ai">AI-Assisted</span>' : '<span class="tag tag-manual">Manual Build</span>';

            const categoryClass = project.category || 'web';

            const html = `
                <div class="project-card-new" data-category="${categoryClass}">
                    <div class="project-tags">
                        ${tagsHTML}
                        ${aiTag}
                    </div>
                    <h3 class="project-name">${project.title}</h3>
                    <p class="project-desc">${project.description}</p>
                    <div class="project-meta">
                        <span class="meta-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                            ${project.aiAssisted ? 'AI-Assisted' : 'Fundamentals'}
                        </span>
                    </div>
                    <a href="${project.link}" class="project-btn">${project.link !== '#' ? 'View Project →' : 'Coming Soon →'}</a>
                </div>
            `;
            container.innerHTML += html;
        });

        // Re-initialize project filters if function exists
        if (typeof initProjectFilters === 'function') {
            initProjectFilters();
        }
    }

    updateSkillsChart() {
        const skills = this.config.skills;
        if (!skills || skills.length === 0) return;

        // Update global skills data that the chart can use
        window.PORTFOLIO_SKILLS_DATA = {
            labels: skills.map(s => s.name),
            data: skills.map(s => s.level)
        };

        // If chart already exists, we need to reinitialize
        // This will be picked up by the initSkillsChart function
    }

    updateJourney() {
        const journey = this.config.journey;
        if (!journey || journey.length === 0) return;

        const container = document.querySelector('.journey-cards');
        if (!container) return;

        container.innerHTML = '';

        journey.forEach(item => {
            const statusClass = item.status === 'current' ? 'status-current' :
                item.status === 'ongoing' ? 'status-ongoing' : '';
            const statusText = item.status === 'current' ? 'Current' :
                item.status === 'ongoing' ? 'Ongoing' : '';

            const html = `
                <div class="journey-card">
                    <div class="journey-year">${item.year}</div>
                    <h3 class="journey-card-title">${item.title}</h3>
                    <p class="journey-card-org">${item.org}</p>
                    <p class="journey-card-desc">${item.description}</p>
                    ${statusText ? `<span class="journey-status ${statusClass}">${statusText}</span>` : ''}
                </div>
            `;
            container.innerHTML += html;
        });
    }

    updateSettings() {
        const settings = this.config.settings;
        if (!settings) return;

        // Update social links
        const githubLink = document.querySelector('.footer-social a[href*="github"]');
        if (githubLink && settings.githubUrl) {
            githubLink.href = settings.githubUrl;
        }

        const linkedinLink = document.querySelector('.footer-social a[href*="linkedin"]');
        if (linkedinLink && settings.linkedinUrl) {
            linkedinLink.href = settings.linkedinUrl;
        }

        const emailLink = document.querySelector('.footer-social a[href*="mailto"]');
        if (emailLink && settings.email) {
            emailLink.href = `mailto:${settings.email}`;
        }

        // Update contact form action
        const contactForm = document.getElementById('contact-form');
        if (contactForm && settings.formspreeId && settings.formspreeId !== 'YOUR_FORM_ID') {
            contactForm.action = `https://formspree.io/${settings.formspreeId}`;
        }
    }

    showPreviewBanner() {
        const banner = document.createElement('div');
        banner.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: linear-gradient(90deg, #6366f1, #8b5cf6);
            color: white;
            padding: 12px;
            text-align: center;
            font-weight: 600;
            z-index: 10000;
            font-size: 14px;
        `;
        banner.innerHTML = '👁️ Preview Mode — <a href="admin-panel.html" style="color: white; text-decoration: underline;">Return to Admin</a>';
        document.body.prepend(banner);

        // Adjust page for banner
        document.body.style.paddingTop = '40px';
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure other scripts have initialized
    setTimeout(() => {
        new PortfolioRenderer();
    }, 100);
});
