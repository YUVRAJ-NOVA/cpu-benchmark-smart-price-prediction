# CPU Insight Engine - Backend Architecture

## 🎯 Overview

A comprehensive, **data-oriented** Python backend built with FastAPI that provides CPU benchmark analysis, filtering, comparisons, and machine learning-powered predictions. The system is designed around the `CPU_benchmark_v4_modified.csv` dataset containing detailed CPU specifications and performance metrics.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (React)                       │
│                  (Existing Vite/TypeScript)                 │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP/REST API
                         │
┌────────────────────────▼────────────────────────────────────┐
│                     FastAPI Backend                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              API Routes Layer                        │  │
│  │  • /api/cpus      - Data queries & filtering        │  │
│  │  • /api/predictions - ML predictions                │  │
│  │  • /api/analytics - Analytics & visualizations      │  │
│  └────────────┬──────────────────────┬──────────────────┘  │
│               │                      │                      │
│  ┌────────────▼────────────┐  ┌─────▼──────────────────┐  │
│  │   CPUDataService        │  │   CPUMLService         │  │
│  │  • Load/preprocess CSV  │  │  • Train models        │  │
│  │  • Filter & aggregate   │  │  • Make predictions    │  │
│  │  • Statistical analysis │  │  • Model persistence   │  │
│  └────────────┬────────────┘  └─────┬──────────────────┘  │
│               │                      │                      │
└───────────────┼──────────────────────┼──────────────────────┘
                │                      │
┌───────────────▼────────────┐  ┌─────▼──────────────────┐
│  CPU_benchmark_v4_        │  │    ML Models           │
│  modified.csv             │  │  • Random Forest       │
│  • 3000+ CPU records      │  │  • Gradient Boosting   │
│  • 13 features            │  │  • Ridge Regression    │
└───────────────────────────┘  └────────────────────────┘
```

## 📊 Data Model

### CSV Columns
```
cpuName      - CPU model name
price        - Price in USD
cpuMark      - Overall CPU benchmark score
cpuValue     - Performance per dollar
threadMark   - Single thread performance
threadValue  - Thread performance per dollar
TDP          - Thermal Design Power (watts)
powerPerf    - Performance per watt
cores        - Number of cores
testDate     - Year of benchmark test
socket       - CPU socket type
category     - Desktop/Server/Laptop
date         - Release date
```

## 🚀 Key Features

### 1. Data Management
- **Smart Preprocessing**: Handles missing values, calculates derived metrics
- **Type Safety**: Pydantic models for validation
- **Efficient Queries**: Pandas-based operations
- **Filtering**: Multi-criteria filtering (price, cores, TDP, category, etc.)

### 2. Machine Learning
Three trained models with automatic algorithm selection:

#### Price Prediction
- **Input**: cpuMark, threadMark, cores, TDP, category
- **Output**: Predicted price in USD
- **Use Case**: Estimate fair market value for CPU specs

#### Performance Prediction  
- **Input**: cores, price, TDP, threadMark, category
- **Output**: Predicted cpuMark score
- **Use Case**: Estimate performance from specifications

#### Thread Performance Prediction
- **Input**: cores, TDP, cpuMark, category  
- **Output**: Predicted threadMark score
- **Use Case**: Estimate single-thread performance

### 3. Analytics & Visualization
- Price distribution across ranges
- Performance by core count aggregation
- Category distribution statistics
- Price vs Performance correlation data
- TDP vs Performance efficiency metrics
- Core count distribution
- AMD vs Intel comparisons

## 📡 API Endpoints

### CPU Data (`/api/cpus`)
```
GET    /                      - List all CPUs
GET    /search/{name}         - Search by name
POST   /filter                - Multi-criteria filter
GET    /categories            - List categories
GET    /sockets              - List socket types
GET    /best-value           - Best value CPUs
GET    /top-performance      - Top performers
POST   /compare              - Compare multiple CPUs
GET    /statistics/{column}  - Column statistics
```

### Predictions (`/api/predictions`)
```
POST   /price                - Predict CPU price
POST   /performance          - Predict performance
GET    /models-info          - ML model information
```

### Analytics (`/api/analytics`)
```
GET    /price-ranges            - Price distribution
GET    /performance-by-cores    - Performance by cores
GET    /category-distribution   - Category stats
GET    /price-vs-performance    - Scatter data
GET    /tdp-vs-performance      - TDP efficiency
GET    /core-count-distribution - Core distribution
GET    /value-leaders/{cat}     - Best value by category
GET    /manufacturer-stats      - AMD vs Intel stats
```

## 🔧 Technology Stack

- **Framework**: FastAPI (async, high-performance)
- **Data Processing**: Pandas, NumPy
- **ML**: scikit-learn (Random Forest, Gradient Boosting, Ridge)
- **Validation**: Pydantic v2
- **Server**: Uvicorn (ASGI)
- **Additional**: joblib (model persistence)

## 📈 ML Pipeline

```
Data Loading → Preprocessing → Feature Engineering → Model Training → Prediction
     │              │                  │                   │              │
     │              │                  │                   │              │
   CSV          Clean data        Encode         Select best        Return
   File         Fill missing      categories     algorithm         with conf.
               Calculate          Scale          Save models        score
               derived metrics    features
```

### Model Selection Process
1. Train Random Forest, Gradient Boosting, and Ridge on same data
2. Evaluate using R² score on test set
3. Select best performing model
4. Save model + scaler + encoders to disk
5. Load on startup for fast predictions

## 🎯 Usage Examples

### 1. Filter Desktop CPUs under $500 with 8+ cores
```python
POST /api/cpus/filter
{
  "category": "Desktop",
  "max_price": 500,
  "min_cores": 8
}
```

### 2. Predict price for hypothetical CPU
```python
POST /api/predictions/price
{
  "cpuMark": 45000,
  "threadMark": 3800,
  "cores": 16,
  "TDP": 105,
  "category": "Desktop"
}
```

### 3. Get best value CPUs in Desktop category
```python
GET /api/cpus/best-value?category=Desktop&limit=10
```

### 4. Compare specific CPUs
```python
POST /api/cpus/compare
{
  "cpu_names": ["Ryzen 9 5950X", "Core i9-12900K"]
}
```

## 🔐 Security & CORS

- CORS configured for cross-origin requests
- Input validation with Pydantic
- Exception handling middleware
- Type-safe throughout the stack

## 📦 Installation & Setup

```bash
# 1. Navigate to backend
cd backend

# 2. Install dependencies
pip install -r requirements.txt

# 3. Run server
python run.py
# OR
uvicorn app.main:app --reload
```

## 🎓 Data Science Approach

### Data Preprocessing
1. **Type Conversion**: Convert all numeric columns
2. **Missing Values**: 
   - Fill categorical with defaults
   - Calculate derived metrics (cpuValue, powerPerf)
3. **Deduplication**: Remove duplicate CPU names
4. **Validation**: Ensure data integrity

### Feature Engineering
- **Label Encoding**: Convert categories to numeric
- **Standardization**: Scale features with StandardScaler
- **Derived Metrics**: cpuValue = cpuMark/price, etc.

### Model Training
- **Train/Test Split**: 80/20
- **Cross-validation**: For model selection
- **Metrics**: R², RMSE, MAE
- **Persistence**: Save models to avoid retraining

## 🚦 Status Endpoints

- `/` - API info
- `/api/health` - Health check with data/model status
- `/api/docs` - Interactive Swagger UI
- `/api/redoc` - ReDoc documentation

## 🔄 Integration with Frontend

The backend is designed to work seamlessly with the existing React frontend:

1. **CORS enabled** for localhost development
2. **RESTful API** follows standard conventions
3. **JSON responses** compatible with TypeScript
4. **Error handling** with proper HTTP status codes
5. **Swagger docs** for API reference

## 📊 Performance Characteristics

- **Startup time**: ~5-10 seconds (data loading + model training)
- **Response time**: <100ms for most queries
- **Memory usage**: ~200-300MB (depending on dataset size)
- **Concurrent requests**: Async endpoints support high concurrency

## 🎯 Future Enhancements

- Add caching layer (Redis)
- Implement batch prediction endpoints
- Add data update/refresh endpoints
- WebSocket support for real-time updates
- GraphQL API option
- Advanced ML models (XGBoost, Neural Networks)
- Time-series analysis for price trends

## 📚 Documentation

- **Interactive API Docs**: http://localhost:8000/api/docs
- **Backend README**: `backend/README.md`
- **Code Comments**: Inline documentation throughout

---

**Built with ☕ by Yuvraj Singh Kushwah**

CPU Insight Engine - Advanced Data-Driven CPU Analysis Platform
