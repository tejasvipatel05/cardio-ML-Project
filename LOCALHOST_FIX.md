# ✅ LocalHost API Configuration - FIXED

## Problem Identified
**Frontend calling**: `http://localhost:3000/api/assessment`
**Should call**: `http://localhost:5000/api/assessment`

The backend was running on 5000, but the frontend was trying to call the frontend server's `/api/` endpoints instead of the backend server.

## Root Cause
The `.next` cache directory was storing old API configurations. Environment variables weren't being reloaded.

## Solution Applied

### 1. **Proper Environment Files** ✅
Created three environment configuration files:

**`.env.development`** (Development mode)
```
NEXT_PUBLIC_API_URL=http://localhost:5000
NODE_ENV=development
```

**`.env.local`** (Overrides both dev/prod)
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

**`.env.production`** (Production builds)
```
NEXT_PUBLIC_API_URL=https://your-production-backend-url.com
NODE_ENV=production
```

### 2. **Updated API Configuration** ✅
File: `config/api.js`
- Now properly reads `NEXT_PUBLIC_API_URL` from environment variables
- Logs the API URL in development console for debugging
- Has fallback to `http://localhost:5000` if env var not set
- Properly constructs full API endpoints with backend domain

### 3. **Fixed Next.js Cache** ✅
The `.next` cache directory was causing issues:
```bash
rm -rf .next
```
This forces Next.js to rebuild and reload environment variables.

### 4. **Added CORS Headers** ✅
Updated `next.config.js` to support proper CORS during development

### 5. **Diagnostic Tools** ✅
Created `diagnose.sh` script to verify setup:
```bash
bash diagnose.sh
```

## How to Run Locally

### Terminal 1: Backend
```bash
cd Backend
python main.py
```
Should show: `Running on http://127.0.0.1:5000`

### Terminal 2: Frontend
```bash
cd Frontend
rm -rf .next
npm run dev
```
Should show: `Local: http://localhost:3000`

### Verification
Check browser console (F12) and look for:
```
[API Config] Base URL: http://localhost:5000
```

If you see this, API calls will be made to the correct backend server!

## Files Modified/Created

### Modified:
- ✅ `config/api.js` - Enhanced API URL handling with logging
- ✅ `next.config.js` - Added CORS headers support

### Created:
- ✅ `.env.development` - Development environment config
- ✅ `.env.local` - Local override config
- ✅ `.env.production` - Production environment config
- ✅ `DEVELOPMENT_SETUP.md` - Full setup guide
- ✅ `diagnose.sh` - Diagnostic script

## Troubleshooting

### Still getting 404 on API calls?
1. Clear cache: `rm -rf .next`
2. Kill dev server: `Ctrl+C`
3. Restart: `npm run dev`
4. Check console for: `[API Config] Base URL: http://localhost:5000`

### Backend not running?
```bash
cd Backend
python main.py
```

### Wrong API URL in console?
1. Check `.env.development` has correct URL
2. Make sure you're in `Frontend` directory
3. Clear cache: `rm -rf .next`
4. Restart dev server

## Production Deployment

Before deploying:
1. Update `.env.production` with your production backend URL
2. Build: `npm run build`
3. Deploy the `out/` folder
4. Backend server will use the production URL automatically

## Key Points

✅ **Development**: Uses `http://localhost:5000`
✅ **Production**: Uses URL from `.env.production`
✅ **Environment variables**: Properly scoped with `NEXT_PUBLIC_` prefix
✅ **Logging**: Console shows `[API Config] Base URL:` in development
✅ **CORS**: Properly configured for cross-origin requests
✅ **Caching**: Cache cleared to force reload of env vars

Everything is now properly configured for both local development and production deployment!
