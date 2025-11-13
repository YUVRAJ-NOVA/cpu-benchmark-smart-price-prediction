# 🚀 Quick Start Guide - CPU Insight Engine

**Developer**: Yuvraj Singh Kushwah  
**Project**: CPU Insight Engine v1.0.0

---

## ⚡ 5-Minute Setup

### Prerequisites Check
```bash
node --version    # Should be 18+
python --version  # Should be 3.8+
npm --version     # Should be 9+
```

---

## 🎯 Step-by-Step Setup

### 1️⃣ Frontend Setup (2 minutes)

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

✅ Frontend now running at: **http://localhost:5173**

### 2️⃣ Backend Setup (3 minutes)

```bash
# Navigate to backend
cd backend

# Create virtual environment (Windows)
python -m venv venv
venv\Scripts\activate

# Create virtual environment (Mac/Linux)
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start backend server
python run.py
```

✅ Backend now running at: **http://localhost:8000**  
✅ API Docs available at: **http://localhost:8000/api/docs**

---

## 🎉 You're Done!

### Access Your Application

1. **Frontend**: http://localhost:5173
2. **Backend API**: http://localhost:8000
3. **API Documentation**: http://localhost:8000/api/docs
4. **Health Check**: http://localhost:8000/api/health

---

## 🧪 Test It Out

### Test the Frontend
1. Open http://localhost:5173
2. Browse CPU listings
3. Try the search and filters
4. Compare CPUs
5. View analytics charts

### Test the Backend API

#### Using Browser (API Docs)
Visit http://localhost:8000/api/docs and try:
- GET `/api/cpus/` - List all CPUs
- GET `/api/cpus/best-value` - Best value CPUs
- POST `/api/predictions/price` - Predict CPU price

#### Using curl (Command Line)

```bash
# Get all CPUs (limited to 10)
curl "http://localhost:8000/api/cpus/?limit=10"

# Search for a CPU
curl "http://localhost:8000/api/cpus/search/Ryzen"

# Get best value CPUs
curl "http://localhost:8000/api/cpus/best-value?category=Desktop&limit=5"

# Predict CPU price
curl -X POST "http://localhost:8000/api/predictions/price" \
  -H "Content-Type: application/json" \
  -d "{\"cpuMark\": 40000, \"threadMark\": 3500, \"cores\": 16, \"TDP\": 105, \"category\": \"Desktop\"}"

# Get analytics
curl "http://localhost:8000/api/analytics/manufacturer-stats"
```

---

## 📊 Project Features

### Frontend Features
- ✅ Browse 3,800+ CPUs
- ✅ Advanced search and filtering
- ✅ CPU comparison tool
- ✅ Interactive charts
- ✅ Best value finder
- ✅ Category analysis

### Backend Features
- ✅ RESTful API with 20+ endpoints
- ✅ Machine Learning predictions (3 models)
- ✅ Real-time data processing
- ✅ Statistical analysis
- ✅ Swagger documentation
- ✅ CORS enabled

### ML Models
- 🤖 **Price Prediction** - Predict CPU price from specs
- 🤖 **Performance Prediction** - Predict benchmark scores
- 🤖 **Thread Performance** - Predict single-thread performance

---

## 🛠️ Development Commands

### Frontend
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run linter
```

### Backend
```bash
python run.py                      # Start with auto-reload
uvicorn app.main:app --reload     # Alternative start
```

---

## 📁 Project Structure

```
cpu-insight-engine/
├── src/                    # React frontend
├── backend/               # Python backend
│   ├── app/
│   │   ├── main.py       # FastAPI app
│   │   ├── routes/       # API endpoints
│   │   └── services/     # Business logic
│   └── models/           # ML models
├── public/               # Static files
├── CPU_benchmark_v4_modified.csv  # Data
└── Documentation files
```

---

## 🐛 Troubleshooting

### Frontend Issues

**Port 5173 already in use?**
```bash
# Kill the process or change port in vite.config.ts
```

**Dependencies not installing?**
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Backend Issues

**Port 8000 already in use?**
```bash
# Change port in run.py or backend/app/main.py
uvicorn app.main:app --port 8001
```

**CSV file not found?**
- Ensure `CPU_benchmark_v4_modified.csv` is in project root
- Check file path in `backend/app/services/data_service.py`

**Python packages not installing?**
```bash
# Upgrade pip
python -m pip install --upgrade pip

# Reinstall requirements
pip install -r requirements.txt --force-reinstall
```

**Virtual environment issues?**
```bash
# Deactivate and recreate
deactivate
rm -rf venv
python -m venv venv
# Then activate and install again
```

---

## 🚀 Next Steps

1. **Explore the Frontend** - Try all features
2. **Test API Endpoints** - Use Swagger docs
3. **Check ML Predictions** - Test prediction accuracy
4. **Read Documentation** - See README.md and BACKEND_OVERVIEW.md
5. **Customize** - Modify for your needs

---

## 📚 Documentation

- **README.md** - Full project documentation
- **BACKEND_OVERVIEW.md** - Backend architecture
- **PROJECT_INFO.md** - Project details
- **CREDITS.md** - Attributions
- **CHANGELOG.md** - Version history

---

## 💡 Tips

1. Keep both frontend and backend running simultaneously
2. Use API docs (Swagger) for testing endpoints
3. Check console for errors
4. Backend auto-trains ML models on first startup (takes ~10 seconds)
5. Frontend connects to backend automatically

---

## ✨ Features to Try First

1. **Search**: Try searching "Ryzen 9 5950X" or "Intel i9"
2. **Filter**: Filter by price range, cores, TDP
3. **Compare**: Compare 2-3 CPUs side by side
4. **Best Value**: Find best performance per dollar
5. **Predictions**: Use ML to predict CPU prices
6. **Analytics**: View AMD vs Intel comparisons

---

## 🎓 Learning Resources

- **FastAPI Docs**: https://fastapi.tiangolo.com/
- **React Docs**: https://react.dev/
- **scikit-learn**: https://scikit-learn.org/
- **Pandas**: https://pandas.pydata.org/
- **Tailwind CSS**: https://tailwindcss.com/

---

**CPU Insight Engine v1.0.0**  
**Developed by Yuvraj Singh Kushwah**  
**© 2025 - MIT License**

*Happy coding! 🎉*
