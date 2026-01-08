// ===========================
// PORTFOLIO ADMIN PANEL
// ===========================

// ⚠️ CHANGE THIS PASSWORD!
const ADMIN_PASSWORD = 'admin123';

class PortfolioAdmin {
    constructor() {
        this.config = this.loadConfig();
        this.isAuthenticated = false;
        this.initAuth();
    }

    // ===========================
    // AUTHENTICATION
    // ===========================
    initAuth() {
        const passwordGate = document.getElementById('passwordGate');
        const adminContainer = document.getElementById('adminContainer');
        const loginBtn = document.getElementById('loginBtn');
        const passwordInput = document.getElementById('adminPassword');
        const passwordError = document.getElementById('passwordError');

        // Check if already authenticated this session
        if (sessionStorage.getItem('adminAuth') === 'true') {
            this.isAuthenticated = true;
            passwordGate.classList.add('hidden');
            this.initPanel();
            return;
        }

        adminContainer.classList.add('locked');

        loginBtn.addEventListener('click', () => {
            this.attemptLogin(passwordInput, passwordError, passwordGate, adminContainer);
        });

        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.attemptLogin(passwordInput, passwordError, passwordGate, adminContainer);
            }
        });
    }

    attemptLogin(passwordInput, passwordError, passwordGate, adminContainer) {
        if (passwordInput.value === ADMIN_PASSWORD) {
            this.isAuthenticated = true;
            sessionStorage.setItem('adminAuth', 'true');
            passwordGate.classList.add('hidden');
            adminContainer.classList.remove('locked');
            this.initPanel();
        } else {
            passwordError.style.display = 'block';
            passwordInput.value = '';
            passwordInput.focus();
        }
    }

    // ===========================
    // INITIALIZATION
    // ===========================
    initPanel() {
        this.renderEditors();
        this.initEventListeners();
        this.initNavigation();
    }

    loadConfig() {
        const saved = localStorage.getItem('portfolioConfig');
        if (saved) {
            return JSON.parse(saved);
        }

        // Default configuration
        return {
            hero: {
                name: "Smit Shinde",
                badge: "Computer Science Engineering",
                typingTexts: ["JavaScript", "Problem Solving", "Backend Dev", "Engineering"],
                description: "Focused on understanding how things work under the hood, not chasing trends. Learning in public, building in private.",
                quote: "This portfolio documents learning in progress — not finished claims."
            },
            about: {
                title: "Foundations First",
                subtitle: "Computer Science Engineering undergraduate focused on building a strong foundation before specialization."
            },
            projects: [
                {
                    id: 1,
                    title: "To-Do List Application",
                    description: "A desktop to-do app built with Python and Tkinter. Focused on understanding GUI programming and event-driven logic.",
                    category: "python",
                    tags: ["Python", "Tkinter"],
                    aiAssisted: false,
                    link: "#"
                },
                {
                    id: 2,
                    title: "PingTab — ISP Website",
                    description: "A website for a local broadband service. Used AI assistance to understand how real-world websites are structured.",
                    category: "web",
                    tags: ["HTML", "CSS", "JavaScript"],
                    aiAssisted: true,
                    link: "#"
                },
                {
                    id: 3,
                    title: "Swift Sync — Learning in Public UI",
                    description: "Personal productivity and habit-tracking app with AI-assisted development. Exploring modern UI patterns, state management, and learning openly.",
                    category: "app",
                    tags: ["React Native", "Expo"],
                    aiAssisted: true,
                    link: "#"
                }
            ],
            skills: [
                { name: "JavaScript", level: 75 },
                { name: "Problem Solving", level: 70 },
                { name: "HTML/CSS", level: 80 },
                { name: "Git", level: 65 },
                { name: "Python", level: 55 },
                { name: "Backend Concepts", level: 45 }
            ],
            journey: [
                {
                    id: 1,
                    year: "2024",
                    title: "B.Tech Computer Science",
                    org: "Universal Skilltech University",
                    description: "Building strong foundations in programming and computer science. Focused on JavaScript fundamentals and Data Structures.",
                    status: "current"
                },
                {
                    id: 2,
                    year: "2025",
                    title: "Campus Ambassador",
                    org: "Kreo",
                    description: "Student outreach initiatives. Built discipline, consistency, and responsibility through coordination work.",
                    status: "current"
                },
                {
                    id: 3,
                    year: "2023",
                    title: "Self-Initiated Learning",
                    org: "JavaScript & Problem Solving",
                    description: "Focused self-study on core JavaScript concepts, execution context, closures, and problem-solving patterns.",
                    status: "ongoing"
                }
            ],
            settings: {
                githubUrl: "https://github.com/Fizznap",
                linkedinUrl: "https://www.linkedin.com/in/fizznap",
                email: "smit@example.com",
                formspreeId: "YOUR_FORM_ID"
            }
        };
    }

    // ===========================
    // RENDER EDITORS
    // ===========================
    renderEditors() {
        // Hero
        document.getElementById('heroName').value = this.config.hero.name;
        document.getElementById('heroBadge').value = this.config.hero.badge;
        document.getElementById('heroTyping').value = this.config.hero.typingTexts.join(', ');
        document.getElementById('heroDescription').value = this.config.hero.description;
        document.getElementById('heroQuote').value = this.config.hero.quote;

        // About
        document.getElementById('aboutTitle').value = this.config.about.title;
        document.getElementById('aboutSubtitle').value = this.config.about.subtitle;

        // Settings
        document.getElementById('githubUrl').value = this.config.settings.githubUrl;
        document.getElementById('linkedinUrl').value = this.config.settings.linkedinUrl;
        document.getElementById('emailAddress').value = this.config.settings.email;
        document.getElementById('formspreeId').value = this.config.settings.formspreeId;

        // Dynamic sections
        this.renderProjects();
        this.renderSkills();
        this.renderJourney();
    }

    renderProjects() {
        const container = document.getElementById('projectsContainer');
        container.innerHTML = '';

        this.config.projects.forEach((project, index) => {
            const html = `
                <div class="item-editor" data-index="${index}">
                    <div class="item-editor-header">
                        <h4>Project ${index + 1}</h4>
                        <button class="btn btn-danger btn-sm remove-project">Remove</button>
                    </div>
                    <div class="editor-grid">
                        <div class="form-group">
                            <label>Title</label>
                            <input type="text" class="form-control project-title" value="${project.title}">
                        </div>
                        <div class="form-group">
                            <label>Category</label>
                            <select class="form-control project-category">
                                <option value="python" ${project.category === 'python' ? 'selected' : ''}>Python</option>
                                <option value="web" ${project.category === 'web' ? 'selected' : ''}>Web Dev</option>
                                <option value="app" ${project.category === 'app' ? 'selected' : ''}>App</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Description</label>
                            <textarea class="form-control textarea-control project-desc">${project.description}</textarea>
                        </div>
                        <div class="form-group">
                            <label>Tags (comma separated)</label>
                            <input type="text" class="form-control project-tags" value="${project.tags.join(', ')}">
                        </div>
                        <div class="form-group">
                            <label>Link URL</label>
                            <input type="text" class="form-control project-link" value="${project.link}">
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

        // Add remove listeners
        container.querySelectorAll('.remove-project').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.closest('.item-editor').dataset.index;
                this.config.projects.splice(index, 1);
                this.renderProjects();
            });
        });
    }

    renderSkills() {
        const container = document.getElementById('skillsContainer');
        container.innerHTML = '';

        this.config.skills.forEach((skill, index) => {
            const html = `
                <div class="item-editor" data-index="${index}">
                    <div class="item-editor-header">
                        <h4>Skill ${index + 1}</h4>
                        <button class="btn btn-danger btn-sm remove-skill">Remove</button>
                    </div>
                    <div class="editor-grid">
                        <div class="form-group">
                            <label>Skill Name</label>
                            <input type="text" class="form-control skill-name" value="${skill.name}">
                        </div>
                        <div class="form-group">
                            <label>Level (0-100)</label>
                            <input type="number" class="form-control skill-level" min="0" max="100" value="${skill.level}">
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += html;
        });

        container.querySelectorAll('.remove-skill').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.closest('.item-editor').dataset.index;
                this.config.skills.splice(index, 1);
                this.renderSkills();
            });
        });
    }

    renderJourney() {
        const container = document.getElementById('journeyContainer');
        container.innerHTML = '';

        this.config.journey.forEach((item, index) => {
            const html = `
                <div class="item-editor" data-index="${index}">
                    <div class="item-editor-header">
                        <h4>Journey ${index + 1}</h4>
                        <button class="btn btn-danger btn-sm remove-journey">Remove</button>
                    </div>
                    <div class="editor-grid">
                        <div class="form-group">
                            <label>Year</label>
                            <input type="text" class="form-control journey-year" value="${item.year}">
                        </div>
                        <div class="form-group">
                            <label>Title</label>
                            <input type="text" class="form-control journey-title" value="${item.title}">
                        </div>
                        <div class="form-group">
                            <label>Organization</label>
                            <input type="text" class="form-control journey-org" value="${item.org}">
                        </div>
                        <div class="form-group">
                            <label>Description</label>
                            <textarea class="form-control textarea-control journey-desc">${item.description}</textarea>
                        </div>
                        <div class="form-group">
                            <label>Status</label>
                            <select class="form-control journey-status">
                                <option value="current" ${item.status === 'current' ? 'selected' : ''}>Current</option>
                                <option value="ongoing" ${item.status === 'ongoing' ? 'selected' : ''}>Ongoing</option>
                                <option value="completed" ${item.status === 'completed' ? 'selected' : ''}>Completed</option>
                            </select>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += html;
        });

        container.querySelectorAll('.remove-journey').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.closest('.item-editor').dataset.index;
                this.config.journey.splice(index, 1);
                this.renderJourney();
            });
        });
    }

    // ===========================
    // EVENT LISTENERS
    // ===========================
    initEventListeners() {
        // Save all
        document.getElementById('saveAll').addEventListener('click', () => {
            this.saveAllChanges();
        });

        // Add buttons
        document.getElementById('addProject').addEventListener('click', () => {
            this.config.projects.push({
                id: Date.now(),
                title: "New Project",
                description: "Project description...",
                category: "web",
                tags: ["Tag1"],
                aiAssisted: false,
                link: "#"
            });
            this.renderProjects();
        });

        document.getElementById('addSkill').addEventListener('click', () => {
            this.config.skills.push({ name: "New Skill", level: 50 });
            this.renderSkills();
        });

        document.getElementById('addJourney').addEventListener('click', () => {
            this.config.journey.push({
                id: Date.now(),
                year: "2024",
                title: "New Entry",
                org: "Organization",
                description: "Description...",
                status: "current"
            });
            this.renderJourney();
        });

        // Preview
        document.getElementById('previewBtn').addEventListener('click', () => {
            this.saveAllChanges();
            window.open('index.html?preview=true', '_blank');
        });

        // Export
        document.getElementById('exportBtn').addEventListener('click', () => {
            this.exportConfig();
        });
    }

    initNavigation() {
        const navLinks = document.querySelectorAll('.admin-nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    // ===========================
    // SAVE & EXPORT
    // ===========================
    saveAllChanges() {
        // Update hero
        this.config.hero.name = document.getElementById('heroName').value;
        this.config.hero.badge = document.getElementById('heroBadge').value;
        this.config.hero.typingTexts = document.getElementById('heroTyping').value.split(',').map(s => s.trim());
        this.config.hero.description = document.getElementById('heroDescription').value;
        this.config.hero.quote = document.getElementById('heroQuote').value;

        // Update about
        this.config.about.title = document.getElementById('aboutTitle').value;
        this.config.about.subtitle = document.getElementById('aboutSubtitle').value;

        // Update settings
        this.config.settings.githubUrl = document.getElementById('githubUrl').value;
        this.config.settings.linkedinUrl = document.getElementById('linkedinUrl').value;
        this.config.settings.email = document.getElementById('emailAddress').value;
        this.config.settings.formspreeId = document.getElementById('formspreeId').value;

        // Update projects from DOM
        const projectEditors = document.querySelectorAll('#projectsContainer .item-editor');
        this.config.projects = Array.from(projectEditors).map((editor, i) => ({
            id: this.config.projects[i]?.id || Date.now() + i,
            title: editor.querySelector('.project-title').value,
            description: editor.querySelector('.project-desc').value,
            category: editor.querySelector('.project-category').value,
            tags: editor.querySelector('.project-tags').value.split(',').map(s => s.trim()),
            aiAssisted: editor.querySelector('.project-ai').checked,
            link: editor.querySelector('.project-link').value
        }));

        // Update skills from DOM
        const skillEditors = document.querySelectorAll('#skillsContainer .item-editor');
        this.config.skills = Array.from(skillEditors).map(editor => ({
            name: editor.querySelector('.skill-name').value,
            level: parseInt(editor.querySelector('.skill-level').value) || 50
        }));

        // Update journey from DOM
        const journeyEditors = document.querySelectorAll('#journeyContainer .item-editor');
        this.config.journey = Array.from(journeyEditors).map((editor, i) => ({
            id: this.config.journey[i]?.id || Date.now() + i,
            year: editor.querySelector('.journey-year').value,
            title: editor.querySelector('.journey-title').value,
            org: editor.querySelector('.journey-org').value,
            description: editor.querySelector('.journey-desc').value,
            status: editor.querySelector('.journey-status').value
        }));

        // Save to localStorage
        localStorage.setItem('portfolioConfig', JSON.stringify(this.config));

        // Update UI
        document.getElementById('lastSaved').textContent = new Date().toLocaleTimeString();
        this.showToast('Changes saved successfully!');
    }

    exportConfig() {
        const dataStr = JSON.stringify(this.config, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

        const link = document.createElement('a');
        link.setAttribute('href', dataUri);
        link.setAttribute('download', 'portfolio-config.json');
        link.click();
    }

    showToast(message) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Initialize admin panel
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioAdmin();
});
