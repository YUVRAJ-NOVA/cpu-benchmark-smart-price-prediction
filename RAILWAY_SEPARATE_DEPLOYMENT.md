# Railway Deployment Guide - Separate Frontend & Backend

## Architecture
This project is configured to deploy as **two separate services** on Railway:
1. **Backend Service** (FastAPI/Python)
2. **Frontend Service** (Vite/React)

---

## Step 1: Deploy Backend

### 1.1 Create Backend Service
1. Go to [Railway Dashboard](https://railway.app)
2. Click **"New Project"**
3. Click **"Deploy from GitHub repo"**
4. Select repository: `cpu-benchmark-smart-price-prediction`
5. Service will be created

### 1.2 Configure Backend
1. Click on the service name → **Settings**
2. Set **Root Directory**: `backend`
3. The service will use `backend/nixpacks.toml` automatically
4. Click **"Deploy"**

### 1.3 Get Backend URL
1. Once deployed, go to **Settings** → **Networking**
2. Click **"Generate Domain"**
3. Copy the URL (e.g., `https://cpu-backend-production.railway.app`)

---

## Step 2: Deploy Frontend

### 2.1 Create Frontend Service
1. In the **same Railway project**, click **"New Service"**
2. Click **"GitHub Repo"**
3. Select the **same repository**: `cpu-benchmark-smart-price-prediction`
4. New service will be created

### 2.2 Configure Frontend
1. Click on the service → **Settings**
2. **Root Directory**: Leave empty (uses root `/`)
3. Go to **Variables** tab
4. Add environment variable:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-backend-url.railway.app` (paste backend URL from Step 1.3)
5. Click **"Deploy"**

### 2.3 Get Frontend URL
1. Go to **Settings** → **Networking**
2. Click **"Generate Domain"**
3. Your app will be live at this URL!

---

## Step 3: Update Backend CORS

### 3.1 Add Frontend URL to Backend
1. Go to **Backend Service** → **Variables**
2. Add environment variable:
   - **Key**: `FRONTEND_URL`
   - **Value**: `https://your-frontend-url.railway.app` (paste frontend URL from Step 2.3)
3. Backend will automatically redeploy

---

## Environment Variables Summary

### Backend Service
- `FRONTEND_URL` = Your Railway frontend URL (e.g., `https://cpu-frontend.railway.app`)

### Frontend Service
- `VITE_API_URL` = Your Railway backend URL (e.g., `https://cpu-backend.railway.app`)

---

## Testing Deployment

1. Visit your **frontend URL**
2. Check browser console for API requests
3. Visit `https://your-backend-url.railway.app/api/docs` to see API documentation
4. Visit `https://your-backend-url.railway.app/api/health` to check backend health

---

## Troubleshooting

### Frontend can't connect to backend
- Verify `VITE_API_URL` is set correctly in frontend service
- Check backend logs for CORS errors
- Ensure backend `FRONTEND_URL` includes your frontend domain

### Backend won't start
- Check backend logs in Railway dashboard
- Verify `backend/nixpacks.toml` exists
- Ensure `backend/requirements.txt` has all dependencies

### Build failures
- Check build logs in Railway
- Verify root directory is set correctly for each service
- Ensure all dependencies are listed in respective config files

---

## Local Development

```bash
# Backend
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000

# Frontend (in new terminal)
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`  
Backend will run on `http://localhost:8000`
