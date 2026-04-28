#!/bin/bash

# Quick development server startup script

echo "🌱 Starting Thale-Quants Development Servers"
echo "================================================"
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "Shutting down servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit
}

trap cleanup EXIT INT TERM

# Start Backend
echo "🔧 Starting Backend Server..."
cd backend
if [ ! -d "venv" ]; then
    echo "Virtual environment not found. Please run setup.sh first."
    exit 1
fi
source venv/bin/activate
python manage.py runserver &
BACKEND_PID=$!
cd ..

# Wait a bit for backend to start
sleep 3

# Start Frontend
echo "🎨 Starting Frontend Server..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Servers started!"
echo ""
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:8000"
echo "Admin:    http://localhost:8000/admin"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Keep script running
wait