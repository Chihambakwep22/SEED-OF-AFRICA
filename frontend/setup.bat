@echo off
REM Seed of Africa - Frontend Setup Script for Windows

echo 🌱 Seed of Africa - Frontend Setup
echo ===================================

REM Check if Node is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 16 or higher.
    exit /b 1
)

REM Install dependencies
echo 📦 Installing dependencies...
npm install

echo.
echo ✅ Frontend setup complete!
echo.
echo To start the development server, run:
echo   npm run dev
echo.
echo Frontend will be available at: http://localhost:3000
