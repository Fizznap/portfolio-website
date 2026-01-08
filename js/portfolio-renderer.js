// ===========================
// PORTFOLIO RENDERER
// Updates DOM with loaded data
// ===========================

class PortfolioRenderer {
    constructor() {
        this.data = window.PortfolioData;
    }

    async init() {
        // Wait for data to load
        if (!this.data.loaded) {
            await this.data.load();
        }

        // Check if we're in preview mode
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('preview')) {
            this.showPreviewBanner();
        }

        // Render all sections
        this.updateMeta();
        this.renderHero();
        this.renderAbout();
        this.renderSkillsChart();
        this.renderProjects();
        this.renderJourney();
        this.renderContact();
        this.renderSocialLinks();

        console.log('Portfolio rendered from JSON data');
    }

    updateMeta() {
        const meta = this.data.getMeta();
        if (meta.siteTitle) {
            document.title = meta.siteTitle;
        }
        if (meta.siteDescription) {
            const descMeta = document.querySelector('meta[name="description"]');
            if (descMeta) descMeta.content = meta.siteDescription;
        }
    }

    renderHero() {
        const hero = this.data.getHero();
        if (!hero.name) return;

        // Update name
        const nameEl = document.querySelector('.hero-name-highlight');
        if (nameEl) nameEl.textContent = hero.name;

        // Update badge
        const badgeEl = document.querySelector('.hero-badge span:last-child');
        if (badgeEl && hero.badge) {
            badgeEl.textContent = hero.badge;
        }

        // Update description
        const descEl = document.querySelector('.hero-description-short');
        if (descEl && hero.description) {
            descEl.textContent = hero.description;
        }

        // Update quote
        const quoteEl = document.querySelector('.scroll-quote');
        if (quoteEl && hero.quote) {
            quoteEl.textContent = `"${hero.quote}"`;
        }

        // Update portrait
        if (hero.image?.url) {
            const portrait = document.querySelector('.portrait-img');
            if (portrait) {
                portrait.src = hero.image.url;
                portrait.alt = hero.image.alt || 'Portrait';
            }
        }

        // Expose typing sequences for the typing effect
        if (hero.typingSequences && hero.typingSequences.length > 0) {
            window.PORTFOLIO_TYPING_TEXTS = hero.typingSequences;
        }
    }

    renderAbout() {
        const about = this.data.getAbout();
        if (!about.title) return;

        const titleEl = document.querySelector('.about-title');
        if (titleEl) titleEl.textContent = about.title;

        const subtitleEl = document.querySelector('.about-subtitle');
        if (subtitleEl && about.subtitle) {
            subtitleEl.textContent = about.subtitle;
        }
    }

    renderSkillsChart() {
        const skills = this.data.getSkills();
        if (!skills.items || skills.items.length === 0) return;

        // Expose skills data for chart initialization
        window.PORTFOLIO_SKILLS_DATA = {
            labels: skills.items.map(s => s.name),
            data: skills.items.map(s => s.level)
        };
    }

    renderProjects() {
        const projects = this.data.getProjects();
        if (!projects.items || projects.items.length === 0) return;

        const container = document.querySelector('.projects-grid-new');
        if (!container) return;

        container.innerHTML = '';

        projects.items.forEach(project => {
            const tagsHTML = project.tags.map(tag => {
                let tagClass = 'tag';
                const lowerTag = tag.toLowerCase();
                if (lowerTag.includes('python')) tagClass += ' tag-python';
                else if (['html', 'css', 'javascript', 'web'].some(t => lowerTag.includes(t))) tagClass += ' tag-web';
                else if (['react', 'expo', 'app'].some(t => lowerTag.includes(t))) tagClass += ' tag-app';
                return `<span class="${tagClass}">${tag}</span>`;
            }).join('');

            const aiTag = project.aiAssisted
                ? '<span class="tag tag-ai">AI-Assisted</span>'
                : '<span class="tag tag-manual">Manual Build</span>';

            const linkText = project.links?.demo && project.links.demo !== '#' ? 'View Site →' : 'View Code →';
            const linkUrl = project.links?.github || '#';

            const html = `
                <div class="project-card-new" data-category="${project.category || 'web'}">
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
                            ${project.meta || 'Project'}
                        </span>
                    </div>
                    <a href="${linkUrl}" class="project-btn">${linkText}</a>
                </div>
            `;
            container.innerHTML += html;
        });

        // Re-initialize project filters
        this.reinitFilters();
    }

    reinitFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card-new');

        if (filterBtns.length === 0 || projectCards.length === 0) return;

        filterBtns.forEach(btn => {
            // Remove existing listeners by cloning
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);

            newBtn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                newBtn.classList.add('active');

                const filter = newBtn.dataset.filter;
                document.querySelectorAll('.project-card-new').forEach(card => {
                    if (filter === 'all' || card.dataset.category === filter) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }

    renderJourney() {
        const journey = this.data.getJourney();
        if (!journey.milestones || journey.milestones.length === 0) return;

        const container = document.querySelector('.journey-cards');
        if (!container) return;

        container.innerHTML = '';

        journey.milestones.forEach(milestone => {
            const statusClass = milestone.status === 'current' ? 'status-current' :
                milestone.status === 'ongoing' ? 'status-ongoing' : '';
            const statusText = milestone.status === 'current' ? 'Current' :
                milestone.status === 'ongoing' ? 'Ongoing' : '';

            const html = `
                <div class="journey-card">
                    <div class="journey-year">${milestone.year}</div>
                    <h3 class="journey-card-title">${milestone.title}</h3>
                    <p class="journey-card-org">${milestone.org}</p>
                    <p class="journey-card-desc">${milestone.description}</p>
                    ${statusText ? `<span class="journey-status ${statusClass}">${statusText}</span>` : ''}
                </div>
            `;
            container.innerHTML += html;
        });
    }

    renderContact() {
        const contact = this.data.getContact();
        if (!contact.formspreeId || contact.formspreeId === 'YOUR_FORM_ID') return;

        const form = document.getElementById('contact-form');
        if (form) {
            form.action = `https://formspree.io/f/${contact.formspreeId}`;
        }
    }

    renderSocialLinks() {
        const social = this.data.getSocial();
        if (!social) return;

        // Update GitHub link
        const githubLink = document.querySelector('.footer-social a[href*="github"]');
        if (githubLink && social.github) {
            githubLink.href = social.github;
        }

        // Update LinkedIn link
        const linkedinLink = document.querySelector('.footer-social a[href*="linkedin"]');
        if (linkedinLink && social.linkedin) {
            linkedinLink.href = social.linkedin;
        }

        // Update email link
        const emailLink = document.querySelector('.footer-social a[href*="mailto"]');
        if (emailLink && social.email) {
            emailLink.href = `mailto:${social.email}`;
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
        banner.innerHTML = '👁️ Preview Mode — <a href="admin/index.html" style="color: white; text-decoration: underline;">Return to Admin</a>';
        document.body.prepend(banner);
        document.body.style.paddingTop = '40px';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    // Small delay to ensure other scripts have initialized
    setTimeout(async () => {
        const renderer = new PortfolioRenderer();
        await renderer.init();
    }, 100);
});
