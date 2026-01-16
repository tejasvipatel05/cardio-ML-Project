# 🚀 Quick Start - LocalHost Development

## The Problem
Frontend was calling `http://localhost:3000/api/` instead of `http://localhost:5000/api/`

## The Fix (Already Applied)
✅ Environment files configured
✅ API configuration updated
✅ CORS headers added
✅ Cache needs clearing

## Run Locally (3 Simple Steps)

### Step 1: Clear Cache
```bash
cd Frontend
rm -rf .next
```

### Step 2: Start Backend (Terminal 1)
```bash
cd Backend
python main.py
```
✅ Wait for: `Running on http://127.0.0.1:5000`

### Step 3: Start Frontend (Terminal 2)
```bash
cd Frontend
npm run dev
```
✅ Wait for: `Local: http://localhost:3000`

## Verify It's Working

1. Open browser console: **F12**
2. Look for message: **`[API Config] Base URL: http://localhost:5000`**
3. Navigate to any page with API calls (Model, Assessment, etc.)
4. Should load without 404 errors ✅

## If Still Having Issues

Run diagnostic:
```bash
bash diagnose.sh
```

This will check:
- ✅ Environment files exist
- ✅ Backend is running
- ✅ API config is correct
- ✅ Cache is clean

## Environment Files

| File | Purpose | Backend URL |
|------|---------|-------------|
| `.env.development` | Dev mode | `http://localhost:5000` |
| `.env.local` | Override (testing) | `http://localhost:5000` |
| `.env.production` | Production build | Your production URL |

## That's It!

Everything is configured correctly. Just:
1. Clear `.next` cache
2. Start backend on port 5000
3. Start frontend on port 3000
4. Check console for `[API Config]` message

The API will automatically use the correct backend URL!
