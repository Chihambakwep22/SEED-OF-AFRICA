#!/bin/bash

# Thale-Quants - Backend Setup Script

echo "🌱 Thale-Quants - Backend Setup"
echo "=================================="

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.9 or higher."
    exit 1
fi

# Create virtual environment
echo "📦 Creating virtual environment..."
python3 -m venv venv

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install -r requirements.txt

# Copy .env file
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
fi

# Run migrations
echo "🗄️ Running migrations..."
python manage.py migrate

# Create superuser
echo "👤 Creating superuser (press Ctrl+C to skip)..."
python manage.py createsuperuser || true

echo ""
echo "✅ Backend setup complete!"
echo ""
echo "To start the development server, run:"
echo "  source venv/bin/activate  # On Windows: venv\Scripts\activate"
echo "  python manage.py runserver"
echo ""
echo "Admin dashboard: http://localhost:8000/admin"