# Portfolio Website

A static portfolio built with vanilla HTML/CSS/JS featuring a local-first admin panel for content management.

## ✨ Features

- **Fast Static Site** - No build step required, pure HTML/CSS/JS
- **JSON-Based Content** - All content stored in `data/content.json`
- **Local Admin Panel** - Edit content via browser at `admin/index.html`
- **Dark/Light Mode** - Theme toggle with localStorage persistence
- **Mobile Responsive** - Full-screen mobile navigation with animated hamburger
- **Skills Radar Chart** - Chart.js visualization
- **Project Filtering** - Filter projects by category
- **Contact Form** - Formspree integration ready
- **Smooth Animations** - Scroll reveals and hover effects

## 📁 Project Structure

```
portfolio/
├── index.html          # Main portfolio page
├── styles.css          # All styles
├── script.js           # Core functionality
├── cursor_styles.css   # Custom cursor styles
├── data/
│   └── content.json    # Portfolio content (edit this!)
├── js/
│   ├── data-loader.js      # Loads JSON content
│   └── portfolio-renderer.js # Updates DOM from data
├── admin/
│   ├── index.html      # Admin panel UI
│   └── admin.js        # Admin functionality
└── README.md
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Open in browser**
   - Simply open `index.html` in your browser
   - No server required for local development

3. **Edit content**
   - Open `admin/index.html` to use the visual editor
   - Or directly edit `data/content.json`

## ✏️ Content Management

### Using the Admin Panel

1. Open `admin/index.html` in your browser
2. Edit your content in the form fields
3. Click "Preview" to see changes
4. Click "Save & Download JSON" to get updated `content.json`
5. Replace the file in `data/` directory
6. Commit and deploy

### Editing JSON Directly

Edit `data/content.json` with your content:

```json
{
  "hero": {
    "name": "Your Name",
    "badge": "Your Title",
    "typingSequences": ["Skill 1", "Skill 2", "Skill 3"]
  },
  "projects": {
    "items": [...]
  }
}
```

## 🎨 Customization

### Colors

Edit CSS variables in `styles.css`:

```css
:root {
    --primary-accent: #6366F1;
    --secondary-accent: #FACC15;
    --text-primary: #0F172A;
    /* ... more variables */
}
```

### Dark Mode

Dark mode variables are in `[data-theme="dark"]` selector in `styles.css`.

### Fonts

Using Google Fonts (Inter and Space Grotesk) - update in `<head>` of `index.html`.

## 📧 Contact Form Setup

1. Create a free account at [Formspree](https://formspree.io)
2. Get your form endpoint ID
3. Update in Admin Panel → Settings → Formspree ID
4. Or edit `data/content.json`:
   ```json
   "contact": {
     "formspreeId": "f/xxxxxxxx"
   }
   ```

## 🌐 Deployment

Deploy to any static hosting:

- **GitHub Pages** - Push to `main` branch, enable in repo settings
- **Netlify** - Drag and drop or connect repo
- **Vercel** - Import from GitHub
- **Cloudflare Pages** - Connect repo

## 📝 Development

No build process required. Edit files directly:

- `styles.css` - All styling
- `script.js` - Interactive features
- `data/content.json` - Content data
- `js/*.js` - Data loading/rendering

### Preview Mode

Add `?preview=true` to the URL to load content from localStorage (used by admin panel for live preview).

## 📄 License

MIT License - feel free to use for your own portfolio!

---

Made with ❤️ by Smit Shinde