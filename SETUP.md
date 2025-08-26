# Portfolio Setup Guide

Follow these steps to customize your VS Code portfolio template:

## 🚀 Quick Setup

### 1. Clone and Install
```bash
git clone <your-repo-url>
cd vscode-portfolio-template
npm install
```

### 2. Add Your Assets
Place these files in the `public/assets/` folder:
- **Profile Image**: `your-profile-image.jpg` (recommended: 400x400px)
- **Resume PDF**: `your-resume.pdf`
- **Project Images**: Any project screenshots (optional)

### 3. Customize Your Information
Edit `src/data/template-config.ts` and update:

#### Personal Information
```typescript
export const personalInfo: PersonalInfo = {
  name: "YOUR FULL NAME",
  title: "Your Professional Title | Your Specialization",
  email: "your.email@example.com",
  phone: "+1 (555) 123-4567",
  location: "Your City, State/Country",
  profileImage: "your-profile-image.jpg",
  // ... rest of the fields
};
```

#### Social Links
```typescript
export const socialLinks: SocialLinks = {
  github: "https://github.com/yourusername",
  linkedin: "https://www.linkedin.com/in/yourprofile/",
  // twitter and portfolio are optional
};
```

#### Work Experience
```typescript
export const experiences: Experience[] = [
  {
    company: "Your Company Name",
    location: "City, Country",
    totalPeriod: "MM/YYYY - Present",
    link: "https://company-website.com",
    logo: "https://company-logo-url.com/logo.png",
    roles: [
      {
        title: "Your Job Title",
        period: "MM/YYYY - Present",
        description: "● Your key achievements\n● Use bullet points\n● Include metrics",
        technologies: ["Tech1", "Tech2", "Framework1"]
      }
    ]
  }
];
```

#### Skills
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

### 4. Test Your Changes
```bash
npm run dev
```

### 5. Build for Production
```bash
npm run build
```

## 📝 Customization Tips

### Skill Scoring System
- **1-2**: Heard of it / Explored
- **3-4**: Tinkered / Learning  
- **5-6**: Beginner / Comfortable
- **7-8**: Proficient / Advanced

### Finding Skill Icons
Use [Simple Icons](https://simpleicons.org/) for consistent skill badges:
```typescript
badgeLight: "https://cdn.simpleicons.org/[icon-name]/[color]?viewbox=auto"
```

### Company Logos
- Use direct image URLs or upload to `public/assets/`
- Recommended size: 120x120px
- Format: PNG with transparent background

### Project Images
- Use screenshots or mockups
- Recommended size: 800x400px
- Host on GitHub, Imgur, or include in `public/assets/`

## 🎨 Theme Customization

Edit `src/styles/globals.css` to customize colors:
```css
:root {
  --vscode-accent: #your-color;
  --vscode-bg-primary: #your-bg-color;
  /* ... other variables */
}
```

## 📊 Analytics Setup

1. Create a Google Analytics 4 property
2. Get your Measurement ID (G-XXXXXXXXXX)
3. Update in `template-config.ts`:
```typescript
export const analytics = {
  gtagId: "G-XXXXXXXXXX"
};
```

## 🚀 Deployment

### Netlify
1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`

### Vercel
1. Import your GitHub repository
2. Framework preset: Vite
3. Deploy automatically

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add script to package.json:
   ```json
   "scripts": {
     "deploy": "gh-pages -d dist"
   }
   ```
3. Run: `npm run build && npm run deploy`

## 🔧 Advanced Customization

### Adding New Sections
1. Create component in `src/sections/`
2. Add to file structure in `template-config.ts`
3. Update terminal commands
4. Add navigation in `App.tsx`

### Custom Terminal Commands
Add to `terminalCommands` object in `template-config.ts`:
```typescript
export const terminalCommands = {
  // ... existing commands
  'custom-command': ['Custom output message']
};
```

### Contact Form Setup
The contact form uses Google Forms. To set up:
1. Create a Google Form
2. Get the form URL and entry IDs
3. Update `GOOGLE_FORM_URL` and `FORM_ENTRIES` in `ContactSection.tsx`

## 🐛 Troubleshooting

### Images Not Loading
- Check file paths in `public/assets/`
- Ensure correct file names in `template-config.ts`
- Use absolute URLs for external images

### Build Errors
- Run `npm run lint` to check for errors
- Ensure all required fields are filled in `template-config.ts`
- Check console for specific error messages

### Terminal Not Working
- Verify terminal commands in `template-config.ts`
- Check for JavaScript errors in browser console
- Ensure proper ANSI color codes in command outputs

## 📞 Support

If you need help:
1. Check this setup guide
2. Look at the example configuration
3. Open an issue on GitHub
4. Join our Discord community

---

**Happy coding! 🚀**