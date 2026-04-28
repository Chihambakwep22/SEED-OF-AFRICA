@echo off
REM Thale-Quants - Backend Setup Script for Windows

echo 🌱 Thale-Quants - Backend Setup
echo ==================================

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python is not installed. Please install Python 3.9 or higher.
    exit /b 1
)

REM Create virtual environment
echo 📦 Creating virtual environment...
python -m venv venv

REM Activate virtual environment
echo 🔧 Activating virtual environment...
call venv\Scripts\activate.bat

REM Install dependencies
echo 📥 Installing dependencies...
pip install -r requirements.txt

REM Copy .env file
if not exist .env (
    echo 📝 Creating .env file from .env.example...
    copy .env.example .env
)

REM Run migrations
echo 🗄️ Running migrations...
python manage.py migrate

REM Create superuser
echo 👤 Creating superuser (press Ctrl+C to skip)...
python manage.py createsuperuser

echo.
echo ✅ Backend setup complete!
echo.
echo To start the development server, run:
echo   venv\Scripts\activate.bat
echo   python manage.py runserver
echo.
echo Admin dashboard: http://localhost:8000/admin