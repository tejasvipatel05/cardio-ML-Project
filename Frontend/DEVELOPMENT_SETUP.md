# 🚀 Development Setup Guide

## Running Localhost Development

### Prerequisites
- Backend Flask server running on port 5000
- Frontend Node.js dev server running on port 3000

### Step 1: Start Backend Server
```bash
cd Backend
python main.py
```

You should see:
```
 * Running on http://127.0.0.1:5000
```

### Step 2: Clear Next.js Cache (Important!)
```bash
cd Frontend
rm -rf .next node_modules/.cache
```

### Step 3: Start Frontend Development Server
```bash
cd Frontend
npm run dev
```

You should see:
```
  ▲ Next.js 14.2.35
  - Local:        http://localhost:3000
  - Environments: .env.development
```

### Step 4: Verify Configuration
Open browser console (F12) and check for:
```
[API Config] Base URL: http://localhost:5000
```

If you don't see this, the environment variable isn't loading properly.

## Troubleshooting

### Issue: Still getting `localhost:3000/api` calls
**Solution**:
1. Make sure `.env.development` exists in Frontend folder
2. Check that `NEXT_PUBLIC_API_URL=http://localhost:5000` is set
3. Restart `npm run dev` after changing env files
4. Clear browser cache: `Ctrl+Shift+Delete` (Windows) or `Cmd+Shift+Delete` (Mac)

### Issue: CORS errors
**Solution**:
- Backend must have CORS enabled (already configured in main.py)
- Ensure backend is running before frontend tries to call it
- Check backend logs: `http://127.0.0.1:5000/api/health` should return 200

### Issue: Environment variable not loading
**Solutions**:
1. Kill the dev server: `Ctrl+C`
2. Delete `.next` cache: `rm -rf .next`
3. Restart: `npm run dev`
4. Check console for `[API Config] Base URL:` message

## Environment Files

### `.env.development`
Used when running `npm run dev` locally
```
NEXT_PUBLIC_API_URL=http://localhost:5000
NODE_ENV=development
```

### `.env.local`
Overrides both development and production (for testing)
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### `.env.production`
Used for production builds (`npm run build`)
```
NEXT_PUBLIC_API_URL=https://your-production-backend-url.com
```

## Verification Checklist

- [ ] Backend running on `http://localhost:5000`
- [ ] Frontend running on `http://localhost:3000`
- [ ] Console shows `[API Config] Base URL: http://localhost:5000`
- [ ] No 404 errors for `/api/assessment`, `/api/predict`
- [ ] Assessment form loads properly
- [ ] Can submit predictions successfully

## Production Deployment

Before deploying to production:
1. Update `.env.production` with your backend URL
2. Build: `npm run build`
3. Deploy the `out/` folder to your hosting

The `NEXT_PUBLIC_API_URL` will be automatically set to your production backend URL.
