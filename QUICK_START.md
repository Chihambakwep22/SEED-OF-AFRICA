# 🚀 Quick Reference Guide - Seed of Africa

## ⚡ 30-Second Start

### Option 1: Full Automated Setup
```bash
cd "/home/princealex/Desktop/SEED OF AFRICA"
chmod +x setup.sh dev-start.sh
./setup.sh        # Setup everything
./dev-start.sh    # Start both servers
```

### Option 2: Docker (Fastest)
```bash
cd "/home/princealex/Desktop/SEED OF AFRICA"
docker-compose up
# Frontend: http://localhost:3000
# Backend Admin: http://localhost:8000/admin
```

### Option 3: Manual (Step-by-step)
**Terminal 1 - Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser  # Create admin user
python manage.py runserver
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## 🌐 Access URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8000/api |
| Django Admin | http://localhost:8000/admin |

## 📝 First Steps After Setup

1. **Create Admin User** (if not done)
   ```bash
   python manage.py createsuperuser
   ```

2. **Access Admin Dashboard**
   - Go to http://localhost:8000/admin
   - Login with admin credentials

3. **Add Initial Content**
   - Services
   - Case studies
   - Blog posts
   - Team members
   - Resources

4. **Test Contact Form**
   - Go to http://localhost:3000/contact
   - Submit a message
   - Check http://localhost:8000/admin to see submission

## 📁 Project Structure at a Glance

```
SEED OF AFRICA/
├── frontend/          # React app (port 3000)
│   ├── src/
│   │   ├── components/    # 8 reusable components
│   │   ├── pages/         # 6 pages
│   │   ├── styles/        # CSS files
│   │   ├── api/           # API client
│   │   └── App.jsx        # Main component
│   └── package.json
├── backend/           # Django API (port 8000)
│   ├── core/              # Main app
│   │   ├── models.py      # 7 database models
│   │   ├── views.py       # 7 ViewSets
│   │   ├── serializers.py # API serializers
│   │   └── admin.py       # Admin config
│   └── manage.py
└── Documentation files
```

## 🛠️ Common Commands

### Backend
```bash
cd backend

# Activate venv
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate     # Windows

# Start server
python manage.py runserver

# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create admin user
python manage.py createsuperuser

# Run tests
python manage.py test
```

### Frontend
```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Environment Setup

### Backend (.env)
```
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:8000/api
```

## 📊 Database Models

1. **ContactMessage** - Contact form submissions
2. **Service** - Services and offerings
3. **CaseStudy** - Success stories
4. **BlogPost** - Blog content
5. **Resource** - Downloadable files
6. **TeamMember** - Team directory
7. **Testimonial** - Client testimonials

## 🎯 API Endpoints

```
GET  /api/services/
GET  /api/services/by_category/?category=enterprise_esd
GET  /api/case-studies/
GET  /api/case-studies/featured/
GET  /api/blog-posts/
GET  /api/blog-posts/featured/
GET  /api/resources/
GET  /api/resources/by_type/?type=template
POST /api/resources/{id}/download/
GET  /api/team-members/
GET  /api/testimonials/
POST /api/contact/  # Submit form
```

See `API_DOCUMENTATION.md` for full details.

## 🎨 Customization Quick Tips

### Change Colors
Edit `frontend/src/styles/index.css`:
```css
:root {
  --primary-color: #1a472a;      /* Dark Green */
  --secondary-color: #f0ad4e;    /* Gold */
  --accent-color: #00a8e8;       /* Blue */
  /* ... more colors ... */
}
```

### Add New Page
1. Create `frontend/src/pages/NewPage.jsx`
2. Create `frontend/src/styles/NewPage.css`
3. Import in `App.jsx`
4. Add route in `App.jsx`

### Add New API Endpoint
1. Create Model in `backend/core/models.py`
2. Create Serializer in `backend/core/serializers.py`
3. Create ViewSet in `backend/core/views.py`
4. Register in router in `backend/core/urls.py`
5. Add admin config in `backend/core/admin.py`
6. Run migrations

## 🚨 Troubleshooting

| Issue | Solution |
|-------|----------|
| `ModuleNotFoundError: No module named 'django'` | Install requirements: `pip install -r requirements.txt` |
| `Port 8000 already in use` | Kill process: `lsof -ti:8000 \| xargs kill -9` |
| `Port 3000 already in use` | Kill process: `lsof -ti:3000 \| xargs kill -9` |
| `CORS error` | Check `CORS_ALLOWED_ORIGINS` in `settings.py` |
| `Module not found (frontend)` | Run `npm install` in frontend directory |
| `Database error` | Run `python manage.py migrate` |

## 📚 Documentation Files

- **README.md** - Main documentation
- **PROJECT_SUMMARY.md** - Detailed overview
- **API_DOCUMENTATION.md** - API reference
- **DEPLOYMENT_GUIDE.md** - Production deployment
- **CONTRIBUTING.md** - Development guidelines
- **DELIVERY_SUMMARY.md** - Complete file listing

## 🚀 Deployment

Quick deployment options:

### Option 1: Docker + Cloud Run
```bash
docker build -t seed-of-africa .
# Push to container registry and deploy
```

### Option 2: Heroku
```bash
heroku create seed-of-africa
git push heroku main
```

### Option 3: Traditional VPS
- Backend: EC2 + Gunicorn + Nginx
- Frontend: S3 + CloudFront
- Database: RDS PostgreSQL

See `DEPLOYMENT_GUIDE.md` for detailed steps.

## 💡 Pro Tips

1. **Use Django Admin** to manage content instead of API
   - Go to http://localhost:8000/admin
   - Much faster than building forms

2. **Leverage API Client**
   - All API calls in `frontend/src/api/client.js`
   - Easy to maintain and update

3. **Responsive Testing**
   - Chrome DevTools (F12) → Toggle device toolbar
   - Test at 375px, 768px, and 1920px

4. **Git Workflow**
   - Branch for each feature
   - Commit messages with type: `[FEAT] description`

5. **Environment Variables**
   - Never commit `.env` files
   - Use `.env.example` as template

## ❓ Need Help?

1. Check documentation files
2. Review code comments
3. Check Django admin panel
4. Test API endpoints with Postman
5. Check browser console for errors
6. Check terminal for backend errors

## ✅ Success Checklist

- [ ] Both servers running without errors
- [ ] Frontend loads at http://localhost:3000
- [ ] Admin panel accessible at http://localhost:8000/admin
- [ ] Contact form submits successfully
- [ ] Admin sees contact submission in dashboard
- [ ] Can add new services/case studies from admin

## 📞 Contact

For issues or questions:
- Check CONTRIBUTING.md
- Review API_DOCUMENTATION.md
- Reference PROJECT_SUMMARY.md

---

**You're all set! Happy coding! 🌱**

Start with: `./setup.sh` or `setup.bat` (Windows)
