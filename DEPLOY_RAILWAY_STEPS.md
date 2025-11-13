# Railway Deployment - Step by Step Guide

Your GitHub repo: `https://github.com/YUVRAJ-NOVA/cpu-benchmark-smart-price-prediction.git`

## ✅ Prerequisites (Already Done)
- [x] Code is on GitHub
- [x] Railway configuration files created
- [x] Git repository is clean and up to date

---

## 🚀 DEPLOYMENT STEPS

### STEP 1: Create Railway Account

1. Go to **https://railway.app**
2. Click **"Login"** (top right)
3. Choose **"Login with GitHub"**
4. Authorize Railway to access your GitHub account
5. You'll be redirected to Railway dashboard

---

### STEP 2: Create New Project

1. On Railway dashboard, click **"New Project"** (purple button)
2. Select **"Deploy from GitHub repo"**
3. You'll see a list of your repositories
4. Find and click: **`cpu-benchmark-smart-price-prediction`**
5. Railway will start analyzing your repo

---

### STEP 3: Deploy Backend Service FIRST

Railway will detect your project structure. Now configure the backend:

#### 3.1 Configure Backend
1. Railway shows "Add variables and deploy"
2. Click **"Add variables"** 
3. Add this variable:
   - **Key**: `PYTHON_VERSION`
   - **Value**: `3.10`
4. Click **"Add"**

#### 3.2 Set Root Directory
1. Click on **"Settings"** tab (left sidebar)
2. Scroll to **"Service"** section
3. Find **"Root Directory"**
4. Click **"/"** and change it to: **`backend`**
5. Click **"Update"** or press Enter

#### 3.3 Verify Start Command
1. Still in Settings, scroll to **"Deploy"** section
2. Check **"Custom Start Command"**
3. It should show: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. If empty, add it manually

#### 3.4 Rename Service (Optional but Recommended)
1. At the top, click the service name (probably "cpu-benchmark-smart-price-prediction")
2. Change it to: **`backend`** or **`cpu-insight-backend`**
3. Press Enter to save

#### 3.5 Deploy Backend
1. Go back to **"Deployments"** tab
2. Click **"Deploy"** (if not already deploying)
3. Watch the logs - you'll see:
   - Installing Python dependencies
   - Loading CSV data
   - Training ML models
   - Server starting

**⏱️ Wait 3-5 minutes for deployment to complete**

#### 3.6 Get Backend URL
1. Once deployed (status shows ✓ Success), go to **"Settings"** tab
2. Scroll to **"Networking"** section
3. Under **"Public Networking"**, click **"Generate Domain"**
4. A URL will appear like: `backend-production-xxxx.up.railway.app`
5. **📋 COPY THIS URL - YOU'LL NEED IT!**
6. Test it: Open `https://YOUR_BACKEND_URL/api/health` in browser
   - Should show: `{"status":"healthy","data_loaded":true,...}`

---

### STEP 4: Deploy Frontend Service

#### 4.1 Add Frontend Service
1. In your Railway project dashboard, click **"+ New"** (top right)
2. Select **"GitHub Repo"**
3. Select the **same repository**: `cpu-benchmark-smart-price-prediction`
4. Railway will create a second service

#### 4.2 Configure Frontend
1. Click on **"Variables"** tab
2. Click **"+ New Variable"**
3. Add these variables:
   
   **Variable 1:**
   - **Key**: `VITE_API_URL`
   - **Value**: `https://YOUR_BACKEND_URL` (paste the backend URL from step 3.6, WITHOUT `/api/health`)
   
   **Variable 2:**
   - **Key**: `NODE_VERSION`
   - **Value**: `20`

4. Click **"Add"** for each

#### 4.3 Set Root Directory
1. Click on **"Settings"** tab
2. Scroll to **"Service"** section
3. Find **"Root Directory"**
4. Make sure it's set to: **`/`** (root directory)
5. If it says "backend", change it to `/`

#### 4.4 Verify Build & Start Commands
1. Still in Settings, scroll to **"Build"** section
2. **Build Command**: Should be `npm run build` (or auto-detected)
3. **Start Command**: Should be `npm run preview -- --port $PORT --host 0.0.0.0`
4. If not set, add them manually

#### 4.5 Rename Frontend Service
1. At the top, click the service name
2. Change it to: **`frontend`** or **`cpu-insight-frontend`**
3. Press Enter to save

#### 4.6 Deploy Frontend
1. Go to **"Deployments"** tab
2. Click **"Deploy"** (if not already deploying)
3. Watch the logs - you'll see:
   - Installing npm dependencies
   - Building Vite app
   - Starting preview server

**⏱️ Wait 2-3 minutes for deployment**

#### 4.7 Get Frontend URL
1. Once deployed (✓ Success), go to **"Settings"** tab
2. Scroll to **"Networking"** section
3. Click **"Generate Domain"**
4. A URL appears like: `frontend-production-xxxx.up.railway.app`
5. **📋 COPY THIS URL**
6. **🎉 THIS IS YOUR LIVE APP URL!**

---

### STEP 5: Update CORS Settings (IMPORTANT!)

Your backend needs to allow requests from your frontend domain.

#### 5.1 Update Code Locally
1. Open `backend/app/main.py` in your code editor
2. Find the CORS middleware section (around line 56-63)
3. Change this:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

To this (replace with YOUR URLs):
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://frontend-production-xxxx.up.railway.app",  # Your Railway frontend URL
        "http://localhost:5173",  # Local development
        "http://localhost:4173",  # Vite preview
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

4. Save the file

#### 5.2 Commit and Push
Open PowerShell in your project folder:

```powershell
git add backend/app/main.py
git commit -m "Update CORS for Railway deployment"
git push origin main
```

#### 5.3 Wait for Auto-Deploy
- Railway will automatically detect the push
- Both services will redeploy (2-3 minutes)
- Check the **"Deployments"** tab to see progress

---

### STEP 6: Test Your Deployment

#### 6.1 Test Backend
Open in browser:
- Health check: `https://YOUR_BACKEND_URL/api/health`
- API docs: `https://YOUR_BACKEND_URL/api/docs`

Should show data loaded and ML models ready.

#### 6.2 Test Frontend
1. Open: `https://YOUR_FRONTEND_URL`
2. The app should load completely
3. Try searching for CPUs
4. Try predictions
5. Check if data loads from backend

#### 6.3 Check Browser Console
1. Press F12 to open DevTools
2. Check Console tab for errors
3. Check Network tab to see API calls
4. All API calls should succeed (status 200)

---

### STEP 7: Monitor Your Deployment

#### 7.1 View Logs
1. In Railway dashboard, click on a service
2. Go to **"Deployments"** tab
3. Click on latest deployment
4. View real-time logs

#### 7.2 Check Metrics
1. In service view, check **"Metrics"** tab
2. See CPU, Memory, Network usage
3. Monitor your $5 free credit usage

#### 7.3 Set Up Alerts (Optional)
1. Go to project settings
2. Add your email for deployment notifications
3. Get notified of failures

---

## 📊 Your Railway Project Structure

```
Railway Project: cpu-benchmark-smart-price-prediction
│
├── Service 1: backend
│   ├── Root Directory: /backend
│   ├── Start Command: uvicorn app.main:app --host 0.0.0.0 --port $PORT
│   ├── Variables: PYTHON_VERSION=3.10
│   └── Domain: backend-production-xxxx.up.railway.app
│
└── Service 2: frontend
    ├── Root Directory: /
    ├── Build: npm run build
    ├── Start: npm run preview -- --port $PORT --host 0.0.0.0
    ├── Variables: 
    │   - VITE_API_URL=https://backend-production-xxxx.up.railway.app
    │   - NODE_VERSION=20
    └── Domain: frontend-production-xxxx.up.railway.app
```

---

## 🎯 Quick Checklist

Before you start:
- [ ] GitHub repo is up to date
- [ ] Railway account created
- [ ] Ready to deploy!

Backend deployment:
- [ ] Backend service created
- [ ] Root directory set to `backend`
- [ ] PYTHON_VERSION=3.10 added
- [ ] Service deployed successfully
- [ ] Backend URL generated and copied
- [ ] Health check works

Frontend deployment:
- [ ] Frontend service created
- [ ] Root directory set to `/`
- [ ] VITE_API_URL variable set
- [ ] NODE_VERSION=20 added
- [ ] Service deployed successfully
- [ ] Frontend URL generated
- [ ] App loads in browser

Post-deployment:
- [ ] CORS updated in code
- [ ] Changes pushed to GitHub
- [ ] Services redeployed
- [ ] App works end-to-end
- [ ] No console errors

---

## 🆘 Troubleshooting

### Backend Issues

**Problem**: "Module not found" error
- **Fix**: Check `requirements.txt` has all dependencies
- **Fix**: Verify Root Directory is `backend`

**Problem**: "CSV file not found"
- **Fix**: Ensure `CPU_benchmark_v4_modified.csv` is in root directory
- **Fix**: Check it's committed to Git

**Problem**: Service crashes on startup
- **Fix**: Check logs in Railway dashboard
- **Fix**: Verify Python version is 3.10

### Frontend Issues

**Problem**: "Network Error" or "Failed to fetch"
- **Fix**: Verify VITE_API_URL is set correctly (with https://)
- **Fix**: Check CORS is updated in backend
- **Fix**: Make sure backend is deployed and healthy

**Problem**: Build fails
- **Fix**: Run `npm run build` locally first
- **Fix**: Check all dependencies in package.json
- **Fix**: Verify NODE_VERSION=20 is set

**Problem**: Blank page
- **Fix**: Check browser console for errors
- **Fix**: Verify Root Directory is `/` not `backend`

### Both Services

**Problem**: Port binding errors
- **Fix**: Railway provides $PORT automatically - don't hardcode ports
- **Fix**: Verify start commands use $PORT

**Problem**: Out of credits
- **Fix**: Railway free tier: $5/month = ~500 hours
- **Fix**: Monitor usage in dashboard
- **Fix**: Consider upgrading for more credits

---

## 💰 Free Tier Limits

Railway free tier includes:
- ✅ $5 in credits per month
- ✅ ~500 hours of combined runtime
- ✅ No cold starts (unlike Render)
- ✅ 100GB egress bandwidth
- ✅ Automatic deployments
- ✅ Custom domains

**Your app uses ~2 services = ~250 hours/month if running 24/7**

---

## 🔄 Making Updates

After deployment, to update your app:

1. Make changes locally
2. Test locally
3. Commit changes:
   ```powershell
   git add .
   git commit -m "Your update message"
   git push origin main
   ```
4. Railway auto-deploys (2-5 minutes)
5. Check deployment logs

---

## 🎉 Success!

If everything works:
- ✅ Backend is live and serving API
- ✅ Frontend is live and looks great
- ✅ Frontend can communicate with backend
- ✅ ML predictions work
- ✅ Data loads correctly

**Your app is now live at**: `https://frontend-production-xxxx.up.railway.app`

Share it with the world! 🚀

---

## 📞 Need Help?

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway  
- Railway Status: https://status.railway.app

---

**Created for**: CPU Insight Engine  
**Repository**: https://github.com/YUVRAJ-NOVA/cpu-benchmark-smart-price-prediction  
**Deployment Platform**: Railway
