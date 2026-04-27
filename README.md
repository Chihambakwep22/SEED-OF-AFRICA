# Seed of Africa - Full Stack Project

AI-Powered Enterprise & Supplier Development Platform for the Future of Africa

## Project Structure

```
SEED OF AFRICA/
├── frontend/              # React + Vite application
│   ├── src/
│   │   ├── components/   # Reusable React components
│   │   ├── pages/        # Page components
│   │   ├── styles/       # CSS styling
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
├── backend/               # Django REST API
│   ├── core/             # Main app with models, views, serializers
│   ├── seedofafrica/     # Project settings and configuration
│   ├── manage.py
│   ├── requirements.txt
│   ├── .env.example
│   └── README.md
└── README.md             # This file
```

## Quick Start

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Backend runs at: `http://localhost:8000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:3000`

## Key Features

### For Enterprises
- AI-Enhanced ESD Strategy & Compliance
- Intelligent Supplier Scouting & Vetting
- High-Fidelity M&E and Impact Reporting
- Live Impact Dashboards
- Supplier Database Access

### For Entrepreneurs
- AI-Driven Incubation & Acceleration
- Virtual Strategic Mentorship
- Masterclasses with NQF Certification
- Business Model Canvas Tools
- Smart Operational Excellence Systems

### Content Management
- Blog Post Management
- Case Study Tracking
- Resource Library
- Team Directory
- Client Testimonials

## Technology Stack

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Styling**: CSS3 (Grid, Flexbox, Custom Properties)

### Backend
- **Framework**: Django 4.2
- **API**: Django REST Framework
- **Database**: SQLite (development), PostgreSQL (production)
- **CORS**: django-cors-headers
- **Authentication**: Django Auth

## API Endpoints

### Contact
- `POST /api/contact/` - Submit contact form
- `GET /api/contact/` - List submissions (admin)

### Content
- `GET /api/services/` - List services
- `GET /api/case-studies/` - List case studies
- `GET /api/blog-posts/` - List blog posts
- `GET /api/resources/` - List resources
- `GET /api/team-members/` - List team
- `GET /api/testimonials/` - List testimonials

## Environment Setup

Create `.env` file in backend directory:
```
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
```

## Admin Dashboard

Access Django admin at: `http://localhost:8000/admin`

Manage:
- Contact messages
- Services and offerings
- Case studies
- Blog posts
- Resources
- Team members
- Testimonials

## Database Models

- **ContactMessage** - Contact form submissions
- **Service** - Services offered
- **CaseStudy** - Success stories
- **BlogPost** - Blog content
- **Resource** - Downloadable templates and guides
- **TeamMember** - Team information
- **Testimonial** - Client testimonials

## Responsive Design

Website is fully responsive:
- Mobile (< 768px)
- Tablet (768px - 1024px)
- Desktop (> 1024px)

## Color Scheme

- Primary: #1a472a (Dark Green)
- Primary Light: #2d6a3f
- Secondary: #f0ad4e (Gold)
- Accent: #00a8e8 (Blue)
- Text Dark: #1a1a1a
- Text Light: #666

## Deployment

### Render (Recommended)
- Use Blueprint deploy from repository root with [render.yaml](render.yaml).
- This provisions:
	- Django API service from [backend](backend)
	- Static React frontend from [frontend](frontend)
	- PostgreSQL database
- Set `EMAIL_HOST_PASSWORD` in Render dashboard after first deploy.
- Frontend is configured to call backend via `VITE_API_URL` in Blueprint.
- Backend health endpoint: `/api/health/`.

### Frontend
- Build: `npm run build`
- Deploy to: Vercel, Netlify, or AWS S3
- Environment: Update API proxy in vite.config.js

### Backend
- Database: Migrate to PostgreSQL for production
- Static files: Configure AWS S3 or similar
- Security: Set SECRET_KEY, DEBUG=False, ALLOWED_HOSTS properly
- CORS: Update CORS_ALLOWED_ORIGINS for production domain

## Development

### Running Tests

Backend:
```bash
cd backend
python manage.py test
```

### Making Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### Creating Admin User

```bash
python manage.py createsuperuser
```

## License

© 2024 Seed of Africa. All rights reserved.
