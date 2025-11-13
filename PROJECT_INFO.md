# CPU Insight Engine - Project Information

## 👨‍💻 Developer
**Yuvraj Singh Kushwah**

## 📌 Project Details

- **Project Name**: CPU Insight Engine
- **Version**: 1.0.0
- **Type**: Full-Stack Web Application with Machine Learning
- **License**: MIT License
- **Year**: 2025

## 🎯 Project Purpose

CPU Insight Engine is a comprehensive platform designed to:

1. **Analyze CPU Benchmarks** - Browse and analyze 3,800+ processor benchmarks
2. **Compare Processors** - Side-by-side comparison of multiple CPUs
3. **ML Predictions** - Machine learning-powered price and performance predictions
4. **Data Analytics** - Interactive charts and statistical analysis
5. **Smart Filtering** - Advanced multi-criteria search and filtering

## 🏗️ Architecture

### Frontend
- **Technology**: React 18 + TypeScript + Vite
- **UI Framework**: Tailwind CSS + shadcn/ui
- **Port**: 5173 (development)
- **Features**:
  - Responsive design
  - Interactive data visualizations
  - Real-time filtering
  - CPU comparison tools
  - Analytics dashboard

### Backend
- **Technology**: FastAPI (Python) + scikit-learn
- **Port**: 8000
- **Features**:
  - RESTful API
  - Machine Learning models (Random Forest, Gradient Boosting, Ridge)
  - Data preprocessing and validation
  - Statistical analysis
  - Swagger/OpenAPI documentation

### Data
- **Source**: CPU_benchmark_v4_modified.csv
- **Records**: 3,800+ CPUs
- **Fields**: 13 columns (cpuName, price, cpuMark, cores, TDP, etc.)

## 📊 Key Features

### 1. Data Management
- Search CPUs by name
- Filter by price, cores, TDP, category, socket
- Statistical summaries
- Best value CPUs
- Top performers by category

### 2. Machine Learning
- **Price Prediction**: Predict CPU price from specs
- **Performance Prediction**: Predict benchmark scores
- **Thread Performance**: Predict single-thread performance
- Confidence scores included
- Model metrics: R², RMSE, MAE

### 3. Analytics
- Price vs Performance scatter plots
- TDP efficiency analysis
- Core count distribution
- AMD vs Intel comparisons
- Category breakdowns

## 🚀 Getting Started

### Frontend
```bash
npm install
npm run dev
```
Visit: http://localhost:5173

### Backend
```bash
cd backend
pip install -r requirements.txt
python run.py
```
Visit: http://localhost:8000/api/docs

## 📁 File Structure

```
cpu-insight-engine/
├── src/                    # Frontend React app
├── backend/               # Python FastAPI backend
│   ├── app/
│   │   ├── main.py       # FastAPI application
│   │   ├── models/       # Pydantic schemas
│   │   ├── routes/       # API endpoints
│   │   └── services/     # Business logic
│   └── models/           # Trained ML models
├── public/               # Static assets
├── CPU_benchmark_v4_modified.csv
├── package.json
├── README.md
├── LICENSE
├── CREDITS.md
└── BACKEND_OVERVIEW.md
```

## 🔧 API Endpoints

### CPU Data
- `GET /api/cpus/` - List all CPUs
- `GET /api/cpus/search/{name}` - Search by name
- `POST /api/cpus/filter` - Filter CPUs
- `GET /api/cpus/best-value` - Best value CPUs
- `GET /api/cpus/top-performance` - Top performers
- `POST /api/cpus/compare` - Compare CPUs

### Predictions
- `POST /api/predictions/price` - Predict price
- `POST /api/predictions/performance` - Predict performance
- `GET /api/predictions/models-info` - Model information

### Analytics
- `GET /api/analytics/price-ranges` - Price distribution
- `GET /api/analytics/performance-by-cores` - Performance by cores
- `GET /api/analytics/manufacturer-stats` - AMD vs Intel stats

## 🎓 Skills Demonstrated

### Frontend Development
- React component architecture
- TypeScript type safety
- State management with TanStack Query
- Responsive UI design
- Data visualization with Recharts
- Routing with React Router

### Backend Development
- RESTful API design
- Python web frameworks (FastAPI)
- Data validation (Pydantic)
- CORS handling
- Error handling middleware
- API documentation (Swagger)

### Data Science & ML
- Data preprocessing with Pandas
- Feature engineering
- Model training (Random Forest, Gradient Boosting)
- Model evaluation and selection
- Model persistence
- Prediction API development

### DevOps & Tools
- Git version control
- Project structuring
- Environment management
- Dependency management
- Documentation

## 📝 Documentation

- **README.md** - Main project documentation
- **BACKEND_OVERVIEW.md** - Backend architecture details
- **backend/README.md** - Backend setup guide
- **CREDITS.md** - Attribution and credits
- **LICENSE** - MIT License
- **PROJECT_INFO.md** - This file

## 🌟 Highlights

1. **Full-Stack Implementation** - Complete frontend + backend + ML pipeline
2. **Data-Oriented Design** - Everything built around real CPU benchmark data
3. **Machine Learning Integration** - Three trained models with 85%+ accuracy
4. **Professional Architecture** - Clean code, modular design, proper separation of concerns
5. **Production-Ready** - Error handling, validation, documentation, tests

## 📈 Project Statistics

- **Lines of Code**: 10,000+ (estimated)
- **Components**: 50+ React components
- **API Endpoints**: 20+ endpoints
- **ML Models**: 3 trained models
- **Data Points**: 3,800+ CPU records
- **Technologies Used**: 30+ libraries/tools

## 🎯 Use Cases

1. **PC Builders** - Find best value CPUs for budget
2. **Tech Enthusiasts** - Compare processor specifications
3. **Researchers** - Analyze CPU market trends
4. **Buyers** - Predict fair price for CPU specs
5. **Developers** - Learn full-stack + ML integration

## 🔮 Future Enhancements

- Real-time price tracking
- User accounts and saved comparisons
- Price history charts
- GPU benchmark integration
- Mobile app version
- Advanced ML models (XGBoost, Neural Networks)
- Recommendation system

## 📞 Contact

**Yuvraj Singh Kushwah**

For inquiries about this project, please reach out through GitHub or professional channels.

---

**CPU Insight Engine v1.0.0**  
**Copyright © 2025 Yuvraj Singh Kushwah**  
**Licensed under MIT License**

*Built with passion, powered by data, enhanced with machine learning.*
