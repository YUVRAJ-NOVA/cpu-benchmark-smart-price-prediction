# Railway Deployment Guide for CPU Insight Engine

This guide will help you deploy both the frontend (React + Vite) and backend (FastAPI) to Railway.

## Prerequisites

1. **GitHub Account** - Push your code to GitHub
2. **Railway Account** - Sign up at [railway.app](https://railway.app) (free tier available)
3. **Git Repository** - Ensure your code is in a Git repository

## Project Structure

Your project has two services:
- **Frontend**: React + TypeScript + Vite (root directory)
- **Backend**: FastAPI + ML models (backend directory)

## Step-by-Step Deployment

### 1. Push to GitHub

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Prepare for Railway deployment"

# Add your GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

### 2. Create Railway Project

1. Go to [railway.app](https://railway.app)
2. Click **"Start a New Project"**
3. Select **"Deploy from GitHub repo"**
4. Authorize Railway to access your GitHub
5. Select your repository

### 3. Deploy Backend Service

#### a. Create Backend Service
1. Click **"+ New"** → **"GitHub Repo"** → Select your repo
2. Railway will detect it's a monorepo
3. Configure the service:
   - **Name**: `cpu-insight-backend`
   - **Root Directory**: `backend`
   - **Start Command**: Already configured in `Procfile` and `railway.json`

#### b. Set Environment Variables
Click on your backend service → **Variables** tab → Add:

```
PYTHON_VERSION=3.10
```

#### c. Backend will auto-deploy
- Railway detects `requirements.txt` and installs dependencies
- Starts with: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

#### d. Get Backend URL
- Once deployed, click **"Settings"** → **"Domains"**
- Click **"Generate Domain"** (e.g., `cpu-insight-backend.railway.app`)
- **Copy this URL** - you'll need it for the frontend!

### 4. Deploy Frontend Service

#### a. Create Frontend Service
1. In the same Railway project, click **"+ New"** → **"GitHub Repo"** → Select same repo
2. Configure the service:
   - **Name**: `cpu-insight-frontend`
   - **Root Directory**: `/` (root)
   - **Start Command**: Already configured in root `railway.json`

#### b. Set Environment Variables
Click on your frontend service → **Variables** tab → Add:

```
VITE_API_URL=https://YOUR_BACKEND_URL.railway.app
NODE_VERSION=20
```

**IMPORTANT**: Replace `YOUR_BACKEND_URL` with the actual backend URL from step 3d!

#### c. Frontend will auto-deploy
- Railway installs npm dependencies
- Runs `npm run build`
- Starts with: `npm run preview -- --port $PORT --host 0.0.0.0`

#### d. Get Frontend URL
- Once deployed, click **"Settings"** → **"Domains"**
- Click **"Generate Domain"** (e.g., `cpu-insight-frontend.railway.app`)
- **This is your live app URL!** 🎉

### 5. Update CORS (Important!)

After deployment, you need to update the backend CORS settings:

1. Open `backend/app/main.py`
2. Update the CORS middleware:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://YOUR_FRONTEND_URL.railway.app",  # Your Railway frontend
        "http://localhost:5173",  # Local development
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

3. Commit and push:
```bash
git add backend/app/main.py
git commit -m "Update CORS for Railway deployment"
git push
```

Railway will auto-redeploy the backend.

## Configuration Files Created

The following files have been created for Railway deployment:

### Backend
- `backend/Procfile` - Process command for Railway
- `backend/railway.json` - Railway configuration
- `backend/nixpacks.toml` - Build configuration

### Frontend
- `railway.json` (root) - Railway configuration
- `nixpacks.toml` (root) - Build configuration

## Monitoring & Logs

### View Logs
1. Click on a service in Railway dashboard
2. Click **"Deployments"** → Select latest deployment
3. View real-time logs

### Check Health
- Backend health: `https://YOUR_BACKEND_URL.railway.app/api/health`
- Backend docs: `https://YOUR_BACKEND_URL.railway.app/api/docs`

## Free Tier Limits

Railway provides **$5 free credits per month**, which gives you:
- ~500 hours of combined runtime
- No sleep/cold starts
- Both services can run 24/7 if optimized

### Tips to Optimize Credits
1. Monitor usage in Railway dashboard
2. Scale down to 1 instance per service (default)
3. Use lightweight resources

## Troubleshooting

### Backend Issues

**Issue**: CSV file not found
- **Solution**: Ensure `CPU_benchmark_v4_modified.csv` is in the root directory and committed to Git

**Issue**: Import errors
- **Solution**: Check `requirements.txt` has all dependencies

### Frontend Issues

**Issue**: API calls failing
- **Solution**: Verify `VITE_API_URL` environment variable is set correctly
- **Check**: CORS is configured properly in backend

**Issue**: Build fails
- **Solution**: Run `npm run build` locally first to test
- **Check**: All dependencies in `package.json`

### Both Services

**Issue**: Service crashes on startup
- **Solution**: Check logs in Railway dashboard
- **Verify**: Environment variables are set correctly

**Issue**: Port binding errors
- **Solution**: Railway automatically sets `$PORT` variable - services use it correctly in configs

## Redeployment

Railway auto-deploys when you push to GitHub:

```bash
git add .
git commit -m "Your changes"
git push
```

Or manually redeploy in Railway dashboard:
1. Click on service
2. Click **"Deployments"**
3. Click **"Redeploy"**

## Custom Domains (Optional)

To use your own domain:
1. Click service → **"Settings"** → **"Domains"**
2. Click **"Custom Domain"**
3. Add your domain and configure DNS

## Next Steps

1. ✅ Both services deployed
2. ✅ Frontend can talk to backend
3. 🎉 Your app is live!

**Access your app**: `https://YOUR_FRONTEND_URL.railway.app`

## Support

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- GitHub Issues: Create issue in your repo

---

**Happy Deploying! 🚀**
