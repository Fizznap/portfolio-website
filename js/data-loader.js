// ===========================
// PORTFOLIO DATA LOADER
// Static JSON Reader with Preview Support
// ===========================

class PortfolioData {
    constructor() {
        this.data = null;
        this.loaded = false;
    }

    async load() {
        try {
            // Check for preview mode
            const urlParams = new URLSearchParams(window.location.search);
            const preview = urlParams.get('preview');

            if (preview) {
                // Try to load from localStorage first (admin preview)
                const previewData = localStorage.getItem('portfolioPreview');
                if (previewData) {
                    this.data = JSON.parse(previewData);
                    this.loaded = true;
                    console.log('Loaded preview data from localStorage');
                    return this.data;
                }
            }

            // Load from JSON file
            const response = await fetch('./data/content.json');
            if (!response.ok) {
                throw new Error(`Failed to load content: ${response.status}`);
            }

            this.data = await response.json();
            this.loaded = true;

            console.log('Portfolio data loaded successfully');
            return this.data;
        } catch (error) {
            console.error('Error loading portfolio data:', error);

            // Fallback to embedded data (for development)
            this.data = this.getFallbackData();
            this.loaded = true;

            return this.data;
        }
    }

    getFallbackData() {
        // Minimal fallback data
        return {
            hero: {
                name: "Developer",
                badge: "Computer Science",
                typingSequences: ["JavaScript", "Problem Solving"],
                description: "Building with fundamentals",
                quote: "Learning in progress"
            },
            about: {
                title: "About",
                subtitle: "Currently learning web development fundamentals."
            },
            projects: {
                items: []
            },
            skills: {
                items: []
            },
            journey: {
                milestones: []
            }
        };
    }

    // Getter methods for different sections
    getMeta() {
        return this.data?.meta || {};
    }

    getHero() {
        return this.data?.hero || {};
    }

    getAbout() {
        return this.data?.about || {};
    }

    getFocus() {
        return this.data?.focus || {};
    }

    getLearning() {
        return this.data?.learning || {};
    }

    getSkills() {
        return this.data?.skills || {};
    }

    getProjects() {
        return this.data?.projects || {};
    }

    getJourney() {
        return this.data?.journey || {};
    }

    getSocial() {
        return this.data?.social || {};
    }

    getContact() {
        return this.data?.contact || {};
    }
}

// Create global instance
window.PortfolioData = new PortfolioData();
