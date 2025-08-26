# VS Code Portfolio Template

A modern, interactive portfolio website that mimics the VS Code interface. Perfect for developers who want to showcase their skills in a unique and engaging way.

## 🚀 Features

- **VS Code Interface**: Authentic VS Code look and feel
- **Interactive Terminal**: Functional terminal with custom commands
- **File Explorer**: Navigate through different sections like files
- **Responsive Design**: Works on all devices
- **Theme Support**: Light and dark themes
- **Smooth Animations**: Professional micro-interactions
- **SEO Optimized**: Built with best practices

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Vite** for fast development
- **Lucide React** for icons
- **Framer Motion** for animations

## 📋 Prerequisites

- Node.js 16+ 
- npm or yarn

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/vscode-portfolio-template.git
   cd vscode-portfolio-template
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Customize your portfolio**
   - Edit `src/data/template-config.ts` with your information
   - Add your profile image to `public/assets/`
   - Add your resume PDF to `public/assets/`

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## ⚙️ Customization Guide

### 1. Personal Information

Edit `src/data/template-config.ts`:

```typescript
export const personalInfo: PersonalInfo = {
  name: "YOUR NAME",
  title: "Your Professional Title",
  email: "your.email@example.com",
  phone: "+1 (555) 123-4567",
  location: "Your City, State",
  profileImage: "your-profile-image.jpg",
  // ... more fields
};
```

### 2. Work Experience

Add your work experience:

```typescript
export const experiences: Experience[] = [
  {
    company: "Your Company",
    location: "City, Country",
    totalPeriod: "MM/YYYY - Present",
    link: "https://company-website.com",
    logo: "https://company-logo-url.com/logo.png",
    roles: [
      {
        title: "Your Role",
        period: "MM/YYYY - Present",
        description: "Your achievements and responsibilities",
        technologies: ["Tech1", "Tech2", "Tech3"]
      }
    ]
  }
];
```

### 3. Skills

Customize your skills with appropriate icons:

```typescript
export const flattenedSkills: Skill[] = [
  { 
    name: "JavaScript", 
    score: 7, // 1-8 scale
    badgeLight: "https://cdn.simpleicons.org/javascript/F7DF1E",
    badgeDark: "https://cdn.simpleicons.org/javascript/F7DF1E",
    category: "Programming Languages" 
  }
  // Add more skills...
];
```

### 4. Projects

Add your projects:

```typescript
export const projects: Project[] = [
  {
    name: "Project Name",
    description: "Project description",
    technologies: ["React", "TypeScript", "Node.js"],
    github: "https://github.com/username/repo",
    demo: "https://your-demo.com",
    image: "https://project-image-url.com"
  }
];
```

### 5. Assets

Place these files in `public/assets/`:
- `your-profile-image.jpg` - Your profile picture
- `your-resume.pdf` - Your resume PDF

## Theming

The template supports both light and dark themes. Colors are defined using CSS variables in `src/styles/index.css`. You can customize:

- Primary colors
- Accent colors  
- Background colors
- Text colors
- Border colors
For detailed understanding of theme usage please refer to the [theme reference](/docs/THEME.md) .


## 📱 Responsive Design

The template is fully responsive with breakpoints for:
- Mobile (< 640px)
- Tablet (640px - 1024px)  
- Desktop (> 1024px)

## 🔧 Terminal Commands

The interactive terminal supports these commands:
- `help` - Show available commands
- `about` - Open About section
- `work` - Open Work Experience
- `projects` - Open Projects
- `skills` - Open Skills
- `contact` - Open Contact
- `resume` - downloads Resume
- `clear` - Clear terminal
- `ls` - List files
- `whoami` - Show user info

## 📊 Analytics

Add Google Analytics by updating the `gtagId` in `template-config.ts`:

```typescript
export const analytics = {
  gtagId: "G-XXXXXXXXXX" // Your GA4 ID
};
```

## 🚀 Deployment

### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify

### Vercel
1. Connect your GitHub repository
2. Vercel will automatically build and deploy

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:
   ```json
   "scripts": {
     "deploy": "gh-pages -d dist"
   }
   ```
3. Run: `npm run build && npm run deploy`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

[MIT License](/docs/LICENSE) - feel free to use this template for your portfolio!

## Acknowledgments

- Inspired by VS Code's interface
- Icons from Lucide React
- Skill badges from Simple Icons

## Support

If you have questions or need help customizing the template:
- Open an issue on GitHub
---

**Built with ☕ and code for the dev community**

Show your support by giving this project a ⭐!
