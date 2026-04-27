#!/bin/bash

# Seed of Africa - Complete Development Environment Setup

echo "🌱 Seed of Africa - Full Stack Setup"
echo "===================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Python
echo "${YELLOW}[1/4]${NC} Checking Python..."
if ! command -v python3 &> /dev/null; then
    echo "${RED}❌ Python 3 not found${NC}"
    exit 1
fi
echo "${GREEN}✓ Python 3 found${NC}"

# Check Node
echo ""
echo "${YELLOW}[2/4]${NC} Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "${RED}❌ Node.js not found${NC}"
    exit 1
fi
echo "${GREEN}✓ Node.js found${NC}"

# Setup Backend
echo ""
echo "${YELLOW}[3/4]${NC} Setting up backend..."
cd backend
bash setup.sh
cd ..

# Setup Frontend
echo ""
echo "${YELLOW}[4/4]${NC} Setting up frontend..."
cd frontend
bash setup.sh
cd ..

echo ""
echo "${GREEN}✅ Full stack setup complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Terminal 1 - Backend:"
echo "   cd backend"
echo "   source venv/bin/activate"
echo "   python manage.py runserver"
echo ""
echo "2. Terminal 2 - Frontend:"
echo "   cd frontend"
echo "   npm run dev"
echo ""
echo "3. Open browser:"
echo "   Frontend: http://localhost:3000"
echo "   Backend Admin: http://localhost:8000/admin"
