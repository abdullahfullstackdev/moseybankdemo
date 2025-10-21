# 🚀 Vercel Deployment Guide - Error-Free Configuration

## 📋 Pre-Deployment Checklist

### 1. Environment Variables (Required)
```env
# Optimizely CMS SaaS Configuration
NEXT_PUBLIC_OPTIMIZELY_CMS_URL=https://your-cms-url.cms.optimizely.com
NEXT_PUBLIC_OPTIMIZELY_GRAPH_URL=https://your-graph-url.cms.optimizely.com

# CMS API Credentials (Required for Preview)
OPTIMIZELY_CMS_CLIENT_ID=your-client-id
OPTIMIZELY_CMS_CLIENT_SECRET=your-client-secret

# Optimizely One (Optional)
NEXT_PUBLIC_OPTIMIZELY_SDK_KEY=your-sdk-key

# Environment
NODE_ENV=production
```

### 2. CMS Configuration (Required)
1. **Frontend Preview URL:** `https://your-app.vercel.app/preview`
2. **Allowed UI Origins:** `https://your-app.vercel.app`
3. **Websites/Hosts:** `your-app.vercel.app`

## 🔧 Vercel Configuration Files

### `apps/frontend/vercel.json` (Already Configured)
```json
{
    "$schema": "https://openapi.vercel.sh/vercel.json",
    "framework": "nextjs",
    "buildCommand": "yarn build",
    "outputDirectory": ".next",
    "installCommand": "yarn install",
    "devCommand": "yarn dev",
    "functions": {
        "apps/frontend/src/app/api/**/*.ts": {
            "runtime": "nodejs18.x"
        }
    },
    "headers": [
        {
            "source": "/preview",
            "headers": [
                {
                    "key": "Cache-Control",
                    "value": "no-cache, no-store, must-revalidate"
                }
            ]
        }
    ],
    "rewrites": [
        {
            "source": "/preview",
            "destination": "/preview"
        }
    ]
}
```

## 🚀 Deployment Steps

### Step 1: Prepare for Deployment
```bash
# Navigate to frontend directory
cd apps/frontend

# Install dependencies
yarn install

# Build locally to check for errors
yarn build
```

### Step 2: Deploy to Vercel
```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

### Step 3: Configure Environment Variables
1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add all required environment variables

### Step 4: Update CMS Settings
1. Go to Optimizely CMS SaaS
2. Update Frontend Preview URL to: `https://your-app.vercel.app/preview`
3. Add `https://your-app.vercel.app` to Allowed UI Origins
4. Add `your-app.vercel.app` to Websites/Hosts

## 🔍 Expected Results

### ✅ After Vercel Deployment:
- **HTTPS Environment** - Required for Optimizely CMS
- **Secure Cookies** - Work properly in production
- **Preview Working** - `GET /preview 200`
- **Visual Builder Accessible** - Edit mode working
- **On-Page Edit** - Publishing functionality working
- **No "Invalid edit mode request" errors**

### ❌ Before (Localhost Issues):
- `🔴 [OnPageEdit] Invalid edit mode request`
- `GET /preview 404`
- Cookie security issues
- Visual Builder not working

## 🛠️ Troubleshooting

### Common Deployment Errors:

1. **Build Errors:**
   ```bash
   # Check build locally first
   yarn build
   ```

2. **Environment Variables Missing:**
   - Ensure all required env vars are set in Vercel Dashboard

3. **CMS Integration Issues:**
   - Verify CMS settings are updated with Vercel URL
   - Check HTTPS is working

4. **Preview Not Working:**
   - Verify `OPTIMIZELY_CMS_CLIENT_ID` and `OPTIMIZELY_CMS_CLIENT_SECRET`
   - Check CMS Frontend Preview URL setting

## 📝 Quick Deploy Command

```bash
# From project root
cd apps/frontend
vercel --prod
```

**Sirf `apps/frontend/` folder deploy karo - yeh complete solution hai!**
