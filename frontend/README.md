# Seed of Africa - Frontend

React + Vite frontend for the Seed of Africa ESD platform.

## Project Structure

```
frontend/
├── src/
│   ├── components/        # Reusable components
│   ├── pages/            # Page components
│   ├── styles/           # CSS files
│   ├── App.jsx           # Main app component
│   └── main.jsx          # Entry point
├── index.html
├── vite.config.js
└── package.json
```

## Pages

- **Home** - Landing page with hero, services, metrics, case studies
- **For Enterprises** - Enterprise solutions overview
- **For Entrepreneurs** - Entrepreneur program details
- **Knowledge Hub** - Templates, webinars, blog posts
- **About Us** - Company information and team
- **Contact** - Contact form and consultation booking

## Components

- `Navbar` - Navigation with mobile menu
- `Footer` - Footer with links and social media
- `HeroSection` - Hero banner with CTA
- `WhoWeServe` - Service card section
- `CoreAdvantages` - Three pillars display
- `ImpactMetrics` - Impact statistics
- `CaseStudies` - Success stories
- `CTASection` - Call to action

## Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Run development server:
```bash
npm run dev
```

Server runs at `http://localhost:3000`

3. Build for production:
```bash
npm run build
```

## Features

- Responsive design (mobile, tablet, desktop)
- Modern UI with gradients and animations
- Contact form integration with backend
- Dynamic routing with React Router
- CSS Grid and Flexbox layouts
- Smooth scrolling and transitions
