// ===========================
// PORTFOLIO ADMIN PANEL
// ===========================

class PortfolioAdmin {
    constructor() {
        this.currentData = null;
        this.init();
    }

    async init() {
        // Load existing data
        await this.loadData();

        // Populate forms
        this.populateForms();

        // Setup event listeners
        this.setupEventListeners();
    }

    async loadData() {
        try {
            const response = await fetch('../data/content.json');
            if (!response.ok) throw new Error('Failed to load');
            this.currentData = await response.json();
        } catch (error) {
            console.error('Failed to load data:', error);
            // Start with empty structure
            this.currentData = this.getEmptyData();
        }
    }

    getEmptyData() {
        return {
            meta: { siteTitle: '', siteDescription: '', updatedAt: '' },
            hero: { name: '', badge: '', typingSequences: [], description: '', quote: '' },
            about: { title: '', subtitle: '' },
            skills: { items: [] },
            projects: { items: [] },
            journey: { milestones: [] },
            social: { github: '', linkedin: '', email: '' },
            contact: { formspreeId: '' }
        };
    }

    populateForms() {
        // Hero section
        const hero = this.currentData.hero || {};
        document.getElementById('hero-name').value = hero.name || '';
        document.getElementById('hero-badge').value = hero.badge || '';
        document.getElementById('hero-description').value = hero.description || '';
        document.getElementById('hero-typing').value = (hero.typingSequences || []).join('\n');
        document.getElementById('hero-quote').value = hero.quote || '';

        // About section
        const about = this.currentData.about || {};
        document.getElementById('about-title').value = about.title || '';
        document.getElementById('about-subtitle').value = about.subtitle || '';

        // Social links
        const social = this.currentData.social || {};
        document.getElementById('social-github').value = social.github || '';
        document.getElementById('social-linkedin').value = social.linkedin || '';
        document.getElementById('social-email').value = social.email || '';

        // Contact
        const contact = this.currentData.contact || {};
        document.getElementById('formspree-id').value = contact.formspreeId || '';

        // Dynamic sections
        this.renderSkills();
        this.renderProjects();
        this.renderJourney();
    }

    renderSkills() {
        const container = document.getElementById('skills-list');
        const skills = this.currentData.skills?.items || [];

        container.innerHTML = '';

        skills.forEach((skill, index) => {
            const html = `
                <div class="skill-item" data-index="${index}">
                    <input type="text" class="form-input skill-name" value="${skill.name}" placeholder="Skill name">
                    <input type="number" class="form-input skill-level" min="0" max="100" value="${skill.level}">
                    <button class="array-item-remove" data-type="skill" data-index="${index}">×</button>
                </div>
            `;
            container.innerHTML += html;
        });

        this.attachRemoveListeners('skill');
        this.attachInputListeners();
    }

    renderProjects() {
        const container = document.getElementById('projects-list');
        const projects = this.currentData.projects?.items || [];

        container.innerHTML = '';

        projects.forEach((project, index) => {
            const html = `
                <div class="array-item" data-index="${index}">
                    <div class="array-item-header">
                        <h3>${project.title || 'Untitled Project'}</h3>
                        <button class="array-item-remove" data-type="project" data-index="${index}">Remove</button>
                    </div>
                    <div class="form-grid">
                        <div class="form-group">
                            <label class="form-label">Title</label>
                            <input type="text" class="form-input project-title" value="${project.title || ''}">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Category</label>
                            <select class="form-input project-category">
                                <option value="python" ${project.category === 'python' ? 'selected' : ''}>Python</option>
                                <option value="web" ${project.category === 'web' ? 'selected' : ''}>Web Dev</option>
                                <option value="app" ${project.category === 'app' ? 'selected' : ''}>App</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Description</label>
                            <textarea class="form-input form-textarea project-desc">${project.description || ''}</textarea>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Tags (comma separated)</label>
                            <input type="text" class="form-input project-tags" value="${(project.tags || []).join(', ')}">
                        </div>
                        <div class="form-group">
                            <label class="form-label">GitHub Link</label>
                            <input type="text" class="form-input project-github" value="${project.links?.github || '#'}">
                        </div>
                        <div class="form-group">
                            <div class="checkbox-group">
                                <input type="checkbox" class="project-ai" ${project.aiAssisted ? 'checked' : ''}>
                                <label>AI-Assisted Project</label>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += html;
        });

        this.attachRemoveListeners('project');
        this.attachInputListeners();
    }

    renderJourney() {
        const container = document.getElementById('journey-list');
        const milestones = this.currentData.journey?.milestones || [];

        container.innerHTML = '';

        milestones.forEach((item, index) => {
            const html = `
                <div class="array-item" data-index="${index}">
                    <div class="array-item-header">
                        <h3>${item.title || 'New Milestone'}</h3>
                        <button class="array-item-remove" data-type="journey" data-index="${index}">Remove</button>
                    </div>
                    <div class="form-grid">
                        <div class="form-group">
                            <label class="form-label">Year</label>
                            <input type="text" class="form-input journey-year" value="${item.year || ''}">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Title</label>
                            <input type="text" class="form-input journey-title" value="${item.title || ''}">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Organization</label>
                            <input type="text" class="form-input journey-org" value="${item.org || ''}">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Description</label>
                            <textarea class="form-input form-textarea journey-desc">${item.description || ''}</textarea>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Status</label>
                            <select class="form-input journey-status">
                                <option value="" ${!item.status ? 'selected' : ''}>None</option>
                                <option value="current" ${item.status === 'current' ? 'selected' : ''}>Current</option>
                                <option value="ongoing" ${item.status === 'ongoing' ? 'selected' : ''}>Ongoing</option>
                            </select>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += html;
        });

        this.attachRemoveListeners('journey');
        this.attachInputListeners();
    }

    attachRemoveListeners(type) {
        document.querySelectorAll(`[data-type="${type}"]`).forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.removeItem(type, index);
            });
        });
    }

    attachInputListeners() {
        // Re-attach input listeners for live updates
        document.querySelectorAll('.form-input').forEach(input => {
            input.removeEventListener('input', this.handleInput);
            input.addEventListener('input', () => this.updateDataFromForms());
        });
    }

    removeItem(type, index) {
        if (type === 'skill') {
            this.currentData.skills.items.splice(index, 1);
            this.renderSkills();
        } else if (type === 'project') {
            this.currentData.projects.items.splice(index, 1);
            this.renderProjects();
        } else if (type === 'journey') {
            this.currentData.journey.milestones.splice(index, 1);
            this.renderJourney();
        }
    }

    setupEventListeners() {
        // Save button
        document.getElementById('save-btn').addEventListener('click', () => {
            this.saveToJSON();
        });

        // Preview button
        document.getElementById('preview-btn').addEventListener('click', () => {
            this.previewChanges();
        });

        // Add buttons
        document.getElementById('add-skill').addEventListener('click', () => {
            if (!this.currentData.skills) this.currentData.skills = { items: [] };
            this.currentData.skills.items.push({ name: 'New Skill', level: 50 });
            this.renderSkills();
        });

        document.getElementById('add-project').addEventListener('click', () => {
            if (!this.currentData.projects) this.currentData.projects = { items: [] };
            this.currentData.projects.items.push({
                id: `project-${Date.now()}`,
                title: 'New Project',
                description: 'Project description...',
                category: 'web',
                tags: ['HTML', 'CSS'],
                meta: 'Project',
                aiAssisted: false,
                links: { github: '#' }
            });
            this.renderProjects();
        });

        document.getElementById('add-journey').addEventListener('click', () => {
            if (!this.currentData.journey) this.currentData.journey = { milestones: [] };
            this.currentData.journey.milestones.push({
                year: new Date().getFullYear().toString(),
                title: 'New Milestone',
                org: 'Organization',
                description: 'Description...',
                status: 'current'
            });
            this.renderJourney();
        });
    }

    updateDataFromForms() {
        // Hero
        if (!this.currentData.hero) this.currentData.hero = {};
        this.currentData.hero.name = document.getElementById('hero-name').value;
        this.currentData.hero.badge = document.getElementById('hero-badge').value;
        this.currentData.hero.description = document.getElementById('hero-description').value;
        this.currentData.hero.typingSequences = document.getElementById('hero-typing').value
            .split('\n').filter(line => line.trim());
        this.currentData.hero.quote = document.getElementById('hero-quote').value;

        // About
        if (!this.currentData.about) this.currentData.about = {};
        this.currentData.about.title = document.getElementById('about-title').value;
        this.currentData.about.subtitle = document.getElementById('about-subtitle').value;

        // Social
        if (!this.currentData.social) this.currentData.social = {};
        this.currentData.social.github = document.getElementById('social-github').value;
        this.currentData.social.linkedin = document.getElementById('social-linkedin').value;
        this.currentData.social.email = document.getElementById('social-email').value;

        // Contact
        if (!this.currentData.contact) this.currentData.contact = {};
        this.currentData.contact.formspreeId = document.getElementById('formspree-id').value;

        // Skills from DOM
        const skillItems = document.querySelectorAll('.skill-item');
        if (!this.currentData.skills) this.currentData.skills = { items: [] };
        this.currentData.skills.items = Array.from(skillItems).map(item => ({
            name: item.querySelector('.skill-name').value,
            level: parseInt(item.querySelector('.skill-level').value) || 50
        }));

        // Projects from DOM
        const projectItems = document.querySelectorAll('#projects-list .array-item');
        if (!this.currentData.projects) this.currentData.projects = { items: [] };
        this.currentData.projects.items = Array.from(projectItems).map((item, i) => ({
            id: this.currentData.projects.items[i]?.id || `project-${Date.now()}-${i}`,
            title: item.querySelector('.project-title').value,
            description: item.querySelector('.project-desc').value.trim(),
            category: item.querySelector('.project-category').value,
            tags: item.querySelector('.project-tags').value.split(',').map(t => t.trim()).filter(t => t),
            meta: this.currentData.projects.items[i]?.meta || 'Project',
            aiAssisted: item.querySelector('.project-ai').checked,
            links: { github: item.querySelector('.project-github').value }
        }));

        // Journey from DOM
        const journeyItems = document.querySelectorAll('#journey-list .array-item');
        if (!this.currentData.journey) this.currentData.journey = { milestones: [] };
        this.currentData.journey.milestones = Array.from(journeyItems).map(item => ({
            year: item.querySelector('.journey-year').value,
            title: item.querySelector('.journey-title').value,
            org: item.querySelector('.journey-org').value,
            description: item.querySelector('.journey-desc').value.trim(),
            status: item.querySelector('.journey-status').value || null
        }));

        // Update meta timestamp
        if (!this.currentData.meta) this.currentData.meta = {};
        this.currentData.meta.updatedAt = new Date().toISOString().split('T')[0];
    }

    saveToJSON() {
        // Update data from all forms
        this.updateDataFromForms();

        // Format JSON
        const jsonStr = JSON.stringify(this.currentData, null, 2);

        // Download as file
        this.downloadJSON(jsonStr);

        // Also save to localStorage for preview
        localStorage.setItem('portfolioPreview', jsonStr);

        this.showStatus('✅ JSON downloaded! Move to data/ folder and commit to deploy.');
    }

    downloadJSON(jsonStr) {
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'content.json';
        a.click();
        URL.revokeObjectURL(url);
    }

    previewChanges() {
        // Save to localStorage
        this.updateDataFromForms();
        localStorage.setItem('portfolioPreview', JSON.stringify(this.currentData));

        // Open portfolio with preview parameter
        window.open('../index.html?preview=true', '_blank');
    }

    showStatus(message) {
        const bar = document.getElementById('status-bar');
        const messageEl = document.getElementById('status-message');

        messageEl.textContent = message;
        bar.classList.add('show');

        setTimeout(() => {
            bar.classList.remove('show');
        }, 4000);
    }
}

// Initialize admin panel
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioAdmin();
});
