# Deployment Guide

## Pre-Deployment Checklist

- [ ] Update `SECRET_KEY` in Django settings
- [ ] Set `DEBUG=False` in production
- [ ] Configure `ALLOWED_HOSTS` with production domain
- [ ] Setup PostgreSQL database
- [ ] Configure static files storage (AWS S3 or similar)
- [ ] Setup email service (SendGrid, AWS SES, etc.)
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS_ALLOWED_ORIGINS
- [ ] Setup logging and monitoring
- [ ] Create admin user
- [ ] Run all tests

## Backend Deployment

### Option 1: Heroku

1. Install Heroku CLI
2. Create `Procfile`:
```
web: gunicorn seedofafrica.wsgi
```

3. Deploy:
```bash
heroku create thale-quants
git push heroku main
heroku run python manage.py migrate
```

### Option 2: AWS EC2

1. Launch EC2 instance (Ubuntu 20.04)
2. Install dependencies:
```bash
sudo apt update
sudo apt install python3 python3-pip python3-venv postgresql nginx
```

3. Clone repository and setup:
```bash
git clone <repo>
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
```

4. Configure Gunicorn
5. Setup Nginx as reverse proxy
6. Enable SSL with Let's Encrypt

### Option 3: Docker + Cloud Run

1. Build image:
```bash
docker build -t thale-quants-backend .
```

2. Push to Cloud Registry:
```bash
docker tag thale-quants-backend:latest gcr.io/project-id/thale-quants-backend:latest
docker push gcr.io/project-id/thale-quants-backend:latest
```

3. Deploy to Cloud Run

## Frontend Deployment

### Option 1: Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
cd frontend
vercel
```

3. Set environment variables in Vercel dashboard

### Option 2: Netlify

1. Build:
```bash
npm run build
```

2. Drag and drop `dist/` folder to Netlify

Or use GitHub integration for automatic deployments

### Option 3: AWS S3 + CloudFront

1. Build:
```bash
npm run build
```

2. Upload to S3:
```bash
aws s3 sync dist/ s3://my-bucket/ --delete
```

3. Setup CloudFront distribution

## Database Setup

### PostgreSQL on Production

1. Create database:
```bash
createdb seedofafrica
createuser seeduser
```

2. Update `.env`:
```
DATABASE_URL=postgresql://seeduser:password@localhost:5432/seedofafrica
```

3. Run migrations:
```bash
python manage.py migrate
```

## Static Files

### Using AWS S3

1. Install django-storages:
```bash
pip install django-storages boto3
```

2. Configure in `settings.py`:
```python
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
STATICFILES_STORAGE = 'storages.backends.s3boto3.S3StaticStorage'
```

## Environment Variables

**Backend (.env):**
```
SECRET_KEY=your-secret-key
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
DATABASE_URL=postgresql://user:password@host:5432/db
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_STORAGE_BUCKET_NAME=your-bucket
```

**Frontend (.env.production):**
```
VITE_API_URL=https://api.yourdomain.com
```

## SSL/HTTPS

### Let's Encrypt (Free)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot certonly --nginx -d yourdomain.com
```

## Monitoring & Logging

1. Setup error tracking: Sentry
2. Setup monitoring: New Relic or DataDog
3. Setup logging: CloudWatch or ELK Stack

## Performance Optimization

1. Enable GZIP compression
2. Setup CDN for static files
3. Use database connection pooling
4. Implement caching strategies
5. Optimize images
6. Minify frontend assets

## CI/CD Pipeline

### GitHub Actions Example

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run tests
        run: cd backend && python manage.py test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Heroku
        env:
          HEROKU_API_KEY: ${{ secrets.HEROKU_API_KEY }}
        run: |
          git push https://heroku:$HEROKU_API_KEY@git.heroku.com/thale-quants.git main
```

## Backup Strategy

1. Database backups (daily)
2. Media files backup (daily)
3. Code repository backups (git)
4. Test restore procedures regularly

## Security Considerations

1. Use environment variables for secrets
2. Enable CSRF protection
3. Use security headers
4. Implement rate limiting
5. Regular security audits
6. Keep dependencies updated
7. Use HTTPS everywhere
8. Implement CORS properly
9. Validate all inputs
10. Use parameterized queries
