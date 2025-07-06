# Contributing to Reddit Clone

Thank you for your interest in contributing to the Reddit Clone project! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js (v12.18.3 or higher)
- npm (v6.14.6 or higher)
- PostgreSQL database
- Git

### Development Setup

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/projetdev-reddit.git
   cd projetdev-reddit
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   # Create config/dev.env with your database credentials
   npm run db-migrate-dev up
   npm run dev
   ```

3. **Set up the frontend**
   ```bash
   cd ../frontend
   npm install
   npm start
   ```

## 📝 Code Style Guidelines

### JavaScript/Node.js
- Use ES6+ features
- Follow consistent naming conventions (camelCase for variables/functions, PascalCase for classes)
- Add JSDoc comments for functions and classes
- Use meaningful variable and function names
- Keep functions small and focused

### React Components
- Use functional components with hooks
- Follow the existing component structure
- Add PropTypes for component props
- Use meaningful component names
- Keep components focused on a single responsibility

### Database
- Use parameterized queries to prevent SQL injection
- Follow the existing migration pattern
- Add comments to complex queries
- Use meaningful table and column names

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 🔧 Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clear, documented code
   - Add tests for new functionality
   - Update documentation if needed

3. **Test your changes**
   - Run the test suite
   - Test manually in the browser
   - Ensure no linting errors

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

5. **Push and create a pull request**
   ```bash
   git push origin feature/your-feature-name
   ```

## 📋 Pull Request Guidelines

### Before submitting a PR:
- [ ] Code follows the project's style guidelines
- [ ] All tests pass
- [ ] Documentation is updated
- [ ] No console errors or warnings
- [ ] Feature is tested manually

### PR Description should include:
- Brief description of changes
- Screenshots (if UI changes)
- Testing instructions
- Any breaking changes

## 🐛 Bug Reports

When reporting bugs, please include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Browser/OS information
- Screenshots (if applicable)

## 💡 Feature Requests

When suggesting features:
- Clear description of the feature
- Use case and benefits
- Mockups or examples (if applicable)
- Implementation suggestions (optional)

## 📚 Documentation

- Keep README.md updated
- Add comments to complex code
- Update API documentation when endpoints change
- Document environment variables

## 🔒 Security

- Never commit sensitive information (passwords, API keys)
- Use environment variables for configuration
- Follow security best practices
- Report security issues privately

## 🤝 Code Review

- Be respectful and constructive
- Focus on the code, not the person
- Provide specific, actionable feedback
- Ask questions when something is unclear

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project.

## 🆘 Getting Help

If you need help:
- Check existing issues and discussions
- Ask questions in the project discussions
- Create an issue for bugs or feature requests

Thank you for contributing to Reddit Clone! 🎉 