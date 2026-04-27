@echo off
REM Seed of Africa - Complete Development Environment Setup for Windows

setlocal enabledelayedexpansion

echo 🌱 Seed of Africa - Full Stack Setup
echo ====================================
echo.

REM Check Python
echo [1/4] Checking Python...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python not found
    exit /b 1
)
echo ✓ Python found

REM Check Node
echo.
echo [2/4] Checking Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js not found
    exit /b 1
)
echo ✓ Node.js found

REM Setup Backend
echo.
echo [3/4] Setting up backend...
cd backend
call setup.bat
cd ..

REM Setup Frontend
echo.
echo [4/4] Setting up frontend...
cd frontend
call setup.bat
cd ..

echo.
echo ✅ Full stack setup complete!
echo.
echo Next steps:
echo 1. Terminal 1 - Backend:
echo    cd backend
echo    venv\Scripts\activate.bat
echo    python manage.py runserver
echo.
echo 2. Terminal 2 - Frontend:
echo    cd frontend
echo    npm run dev
echo.
echo 3. Open browser:
echo    Frontend: http://localhost:3000
echo    Backend Admin: http://localhost:8000/admin
