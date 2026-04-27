# Seed of Africa - Backend

Django REST API backend for the Seed of Africa ESD platform.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create .env file from .env.example and update values

4. Run migrations:
```bash
python manage.py migrate
```

5. Create superuser:
```bash
python manage.py createsuperuser
```

6. Run development server:
```bash
python manage.py runserver
```

Server runs at `http://localhost:8000`
Admin dashboard at `http://localhost:8000/admin`

## API Endpoints

- `/api/contact/` - Contact messages (POST to submit)
- `/api/services/` - Services list
- `/api/case-studies/` - Case studies
- `/api/blog-posts/` - Blog posts
- `/api/resources/` - Downloadable resources
- `/api/team-members/` - Team information
- `/api/testimonials/` - Client testimonials

## Environment Variables

- `SECRET_KEY` - Django secret key (change in production)
- `DEBUG` - Debug mode (False in production)
- `ALLOWED_HOSTS` - Comma-separated list of allowed hosts
- `DATABASE_URL` - Database connection string (optional, defaults to SQLite)
