#!/bin/bash

echo "🔍 CardioML Development Environment Diagnostics"
echo "================================================"
echo ""

# Check if .env files exist
echo "📋 Environment Files:"
if [ -f ".env.development" ]; then
  echo "✅ .env.development exists"
  echo "   Content:"
  grep "NEXT_PUBLIC_API_URL" .env.development || echo "   ❌ NEXT_PUBLIC_API_URL not found"
else
  echo "❌ .env.development missing"
fi

if [ -f ".env.local" ]; then
  echo "✅ .env.local exists"
  echo "   Content:"
  grep "NEXT_PUBLIC_API_URL" .env.local || echo "   ❌ NEXT_PUBLIC_API_URL not found"
else
  echo "⚠️  .env.local missing (optional)"
fi

echo ""
echo "📦 Node Modules:"
if [ -d "node_modules" ]; then
  echo "✅ node_modules directory exists"
else
  echo "❌ node_modules missing - run 'npm install'"
fi

echo ""
echo "🔧 Next.js Cache:"
if [ -d ".next" ]; then
  echo "⚠️  .next cache directory exists"
  echo "   Run: rm -rf .next"
  echo "   This can cause environment variable issues"
else
  echo "✅ .next cache is clean"
fi

echo ""
echo "🚀 Backend Status:"
if nc -z localhost 5000 2>/dev/null; then
  echo "✅ Backend running on http://localhost:5000"
else
  echo "❌ Backend NOT running on http://localhost:5000"
  echo "   Start backend: cd Backend && python main.py"
fi

echo ""
echo "📝 API Configuration (config/api.js):"
echo "   Looking for: NEXT_PUBLIC_API_URL..."
if grep -q "NEXT_PUBLIC_API_URL" config/api.js; then
  echo "✅ API configuration uses NEXT_PUBLIC_API_URL"
else
  echo "❌ API configuration not properly set up"
fi

echo ""
echo "✅ Diagnostics complete!"
echo ""
echo "Next steps:"
echo "1. Fix any ❌ issues above"
echo "2. Run: npm run dev"
echo "3. Check browser console for: [API Config] Base URL:"
