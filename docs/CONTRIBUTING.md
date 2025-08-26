# Contributing to VS Code Portfolio Template

Thank you for your interest in contributing! This guide will help you get started.

## 🚀 Getting Started

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/yourusername/vscode-portfolio-template.git
   cd vscode-portfolio-template
   ```
3. **Install dependencies**
   ```bash
   npm install
   ```
4. **Start development server**
   ```bash
   npm run dev
   ```

## 🛠️ Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow existing naming conventions
- Use Tailwind CSS for styling
- Keep components small and focused
- Add proper TypeScript types

### File Structure
```
src/
├── components/          # Reusable UI components
├── sections/           # Main portfolio sections
├── data/              # Configuration and data
├── utils/             # Utility functions
├── styles/            # Global styles
└── animations/        # Animation components
```

### Component Guidelines
- Use functional components with hooks
- Add proper TypeScript interfaces
- Include responsive design
- Follow accessibility best practices
- Add meaningful IDs for testing

### Styling Guidelines
- Use Tailwind CSS classes
- Follow mobile-first approach
- Use CSS variables for theming
- Maintain consistent spacing
- Support both light and dark themes

## 🎯 Areas for Contribution

### High Priority
- [ ] Additional theme options
- [ ] More terminal commands
- [ ] Accessibility improvements
- [ ] Performance optimizations
- [ ] Mobile experience enhancements

### Medium Priority
- [ ] Additional sections (blog, testimonials)
- [ ] Animation improvements
- [ ] SEO enhancements
- [ ] PWA features
- [ ] Internationalization

### Low Priority
- [ ] Additional deployment guides
- [ ] More customization options
- [ ] Integration with CMS
- [ ] Advanced analytics

## 🐛 Bug Reports

When reporting bugs, please include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS information
- Screenshots if applicable

Use this template:
```markdown
**Bug Description**
A clear description of the bug.

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What you expected to happen.

**Screenshots**
Add screenshots if applicable.

**Environment**
- OS: [e.g. macOS, Windows, Linux]
- Browser: [e.g. Chrome, Firefox, Safari]
- Version: [e.g. 22]
```

## ✨ Feature Requests

For feature requests, please:
- Check if it already exists
- Describe the use case
- Explain the expected behavior
- Consider implementation complexity

## 📝 Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, documented code
   - Add tests if applicable
   - Update documentation

3. **Test your changes**
   ```bash
   npm run lint
   npm run build
   ```

4. **Commit your changes**
   ```bash
   git commit -m "feat: add new feature description"
   ```
   
   Use conventional commits:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation
   - `style:` for formatting
   - `refactor:` for code refactoring
   - `test:` for adding tests

5. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

### PR Guidelines
- Provide clear description
- Reference related issues
- Include screenshots for UI changes
- Ensure all checks pass
- Request review from maintainers

## 🧪 Testing

### Manual Testing
- Test on different screen sizes
- Verify theme switching works
- Check terminal functionality
- Test all navigation methods
- Verify responsive design

### Browser Testing
Test on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📚 Documentation

When adding features:
- Update README.md if needed
- Update SETUP.md for configuration
- Add inline code comments
- Update TypeScript interfaces

## 🎨 Design Guidelines

### Visual Consistency
- Follow VS Code design language
- Use consistent spacing (8px grid)
- Maintain proper contrast ratios
- Support both themes equally

### Animation Guidelines
- Use subtle, purposeful animations
- Respect user preferences (prefers-reduced-motion)
- Keep animations under 300ms for interactions
- Use easing functions consistently

## 🚀 Release Process

1. Update version in package.json
2. Update CHANGELOG.md
3. Create release notes
4. Tag the release
5. Deploy to demo site

## 💬 Community

- Join our Discord server
- Follow on Twitter
- Star the repository
- Share with other developers

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors will be:
- Added to README.md
- Mentioned in release notes
- Given credit in documentation

---

**Thank you for contributing! 🎉**