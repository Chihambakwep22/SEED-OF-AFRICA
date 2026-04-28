#!/bin/bash

# Thale-Quants - Frontend Setup Script

echo "🌱 Thale-Quants - Frontend Setup"
echo "==================================="

# Check if Node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16 or higher."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "✅ Frontend setup complete!"
echo ""
echo "To start the development server, run:"
echo "  npm run dev"
echo ""
echo "Frontend will be available at: http://localhost:3000"