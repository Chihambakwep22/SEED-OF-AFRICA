# Contributing Guidelines

## Code Style

### Frontend (React/JavaScript)
- Use ES6+ syntax
- Functional components with hooks
- CamelCase for component names
- camelCase for functions and variables
- UPPER_CASE for constants
- JSDoc comments for complex functions

Example:
```javascript
/**
 * Fetch case studies from API
 * @returns {Promise<Array>} Array of case studies
 */
const fetchCaseStudies = async () => {
  // implementation
}
```

### Backend (Django/Python)
- Follow PEP 8
- Use type hints
- Meaningful variable names
- Docstrings for all functions/classes
- Use ModelForm for forms

Example:
```python
def get_featured_case_studies() -> QuerySet:
    """
    Retrieve all featured case studies.
    
    Returns:
        QuerySet: Filtered case studies
    """
    return CaseStudy.objects.filter(featured=True)
```

## Git Workflow

1. Create feature branch: `git checkout -b feature/feature-name`
2. Make changes and commit: `git commit -m "Add feature description"`
3. Push to branch: `git push origin feature/feature-name`
4. Create Pull Request with description

## Commit Messages

Format:
```
[Type] Brief description

Detailed explanation if needed
```

Types:
- `[FEAT]` - New feature
- `[FIX]` - Bug fix
- `[DOCS]` - Documentation
- `[STYLE]` - Code style changes
- `[REFACTOR]` - Code refactoring
- `[TEST]` - Test additions/changes
- `[CHORE]` - Maintenance tasks

Example:
```
[FEAT] Add case study filtering by ROI

- Added filter parameter to case studies endpoint
- Updated frontend to show filter options
- Added tests for new functionality
```

## Adding New Features

### Frontend
1. Create component in `src/components/` or page in `src/pages/`
2. Create corresponding CSS file in `src/styles/`
3. Update router in `App.jsx` if adding new page
4. Use API client from `src/api/client.js`
5. Add error handling and loading states

### Backend
1. Add model in `core/models.py`
2. Create serializer in `core/serializers.py`
3. Create ViewSet in `core/views.py`
4. Register in router in `core/urls.py`
5. Add admin configuration in `core/admin.py`
6. Create migrations: `python manage.py makemigrations`
7. Write tests in `core/tests.py`

## Database Changes

When modifying models:
```bash
# Create migration
python manage.py makemigrations

# Review migration
cat core/migrations/XXXX_*.py

# Apply migration
python manage.py migrate

# Rollback if needed
python manage.py migrate core XXXX
```

## Testing

### Backend
```bash
# Run all tests
python manage.py test

# Run specific test
python manage.py test core.tests.ContactMessageTest

# With coverage
coverage run --source='core' manage.py test
coverage report
```

### Frontend
```bash
# Build check (catches errors)
npm run build

# Manual testing
npm run dev
```

## Code Review Checklist

### Frontend
- [ ] Component is functional
- [ ] Props are typed/documented
- [ ] CSS is responsive
- [ ] Error handling is in place
- [ ] API calls use client library
- [ ] No console errors/warnings

### Backend
- [ ] Model has docstrings
- [ ] Serializer includes validation
- [ ] ViewSet has proper permissions
- [ ] Tests cover happy path
- [ ] Tests cover edge cases
- [ ] No SQL injection vulnerabilities

## Performance Tips

### Frontend
- Use React.memo for expensive components
- Implement lazy loading with React.lazy()
- Minimize bundle size
- Use CSS Grid/Flexbox efficiently
- Optimize images

### Backend
- Use select_related() for foreign keys
- Use prefetch_related() for many-to-many
- Cache frequently accessed data
- Limit database queries per request
- Use indexes on filtered fields

## Security Checklist

- [ ] No hardcoded secrets
- [ ] Input validation on all forms
- [ ] CSRF protection enabled
- [ ] SQL injection prevention (using ORM)
- [ ] XSS prevention (React auto-escapes)
- [ ] CORS properly configured
- [ ] HTTPS enabled in production
- [ ] Environment variables for sensitive data

## Documentation

When adding features, update:
- Code comments
- README files
- API_DOCUMENTATION.md (if API change)
- PROJECT_SUMMARY.md (if significant change)

## Deployment

Before merging to main:
- [ ] Tests pass
- [ ] No console errors
- [ ] Frontend builds successfully
- [ ] Backend has no linting errors
- [ ] Documentation is updated
- [ ] Breaking changes are documented

## Release Process

1. Update version in package.json and settings
2. Update CHANGELOG
3. Create git tag: `git tag v1.0.0`
4. Push tag: `git push origin v1.0.0`
5. Create release notes on GitHub

## Environment Setup for Contributors

1. Fork repository
2. Clone fork: `git clone https://github.com/your-username/seed-of-africa.git`
3. Add upstream: `git remote add upstream https://github.com/seedofafrica/seed-of-africa.git`
4. Create branch from upstream: `git checkout -b feature/my-feature`
5. Keep branch updated: `git fetch upstream && git rebase upstream/main`

## Reporting Issues

### Bug Report Template
```
## Description
Brief description of the bug

## Steps to Reproduce
1. Step one
2. Step two
3. Step three

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Screenshots/Logs
If applicable

## Environment
- OS: (Windows/Mac/Linux)
- Browser: (Chrome/Firefox/Safari)
- Python version: X.X.X
- Node version: X.X.X
```

### Feature Request Template
```
## Description
Clear description of requested feature

## Use Case
Why this feature is needed

## Proposed Solution
How you envision it working

## Alternatives
Other approaches considered
```

## Questions?

- Check existing issues and PRs
- Read documentation
- Ask in discussions section
- Email: contribute@seedofafrica.co.za

---

Thank you for contributing to Seed of Africa! 🌱
