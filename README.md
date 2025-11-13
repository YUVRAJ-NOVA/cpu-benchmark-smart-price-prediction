# CPU Insight Engine

> Advanced CPU Benchmark Analysis & ML Prediction Platform

**Developed by Yuvraj Singh Kushwah**

---

## 🚀 Overview

CPU Insight Engine is a comprehensive, data-driven platform for analyzing CPU benchmarks, comparing processors, and predicting performance using machine learning. Built with modern web technologies and powered by Python/FastAPI backend with scikit-learn ML models.

### Key Features

- 📊 **3,800+ CPU Database** - Comprehensive benchmark data
- 🤖 **ML Predictions** - Price & performance prediction using ensemble models
- 📈 **Interactive Analytics** - Real-time charts and visualizations
- ⚖️ **CPU Comparison** - Side-by-side processor analysis
- 🔍 **Advanced Filtering** - Multi-criteria search and filtering
- 💡 **Best Value Finder** - Performance-per-dollar analysis
- 🎯 **Category Analysis** - Desktop, Server, and Laptop segments

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Library**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **State Management**: TanStack Query
- **Routing**: React Router v6

### Backend
- **Framework**: FastAPI (Python)
- **Data Processing**: Pandas, NumPy
- **Machine Learning**: scikit-learn (Random Forest, Gradient Boosting, Ridge)
- **Validation**: Pydantic v2
- **Server**: Uvicorn

## 📋 Prerequisites

- Node.js 18+ and npm/pnpm
- Python 3.8+
- Git

## 🚦 Getting Started

### Frontend Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd cpu-insight-engine

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the server
python run.py
```

The backend API will be available at `http://localhost:8000`
- API Documentation: `http://localhost:8000/api/docs`
- Health Check: `http://localhost:8000/api/health`

## 📁 Project Structure

```
cpu-insight-engine/
├── src/                      # Frontend source
│   ├── components/          # React components
│   ├── pages/              # Page components
│   ├── hooks/              # Custom hooks
│   └── lib/                # Utilities
├── backend/                 # Python backend
│   ├── app/
│   │   ├── main.py         # FastAPI app
│   │   ├── models/         # Pydantic models
│   │   ├── routes/         # API endpoints
│   │   └── services/       # Business logic
│   ├── models/             # ML models (generated)
│   └── requirements.txt
├── public/                  # Static assets
├── CPU_benchmark_v4_modified.csv  # Dataset
└── package.json
```

## 🎯 Available Scripts

### Frontend

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend

```bash
python run.py                           # Start with auto-reload
uvicorn app.main:app --reload          # Alternative start method
python -m pytest                        # Run tests (if configured)
```

## 📊 Features in Detail

### Data Analysis
- Search CPUs by name
- Filter by price, cores, TDP, category, socket
- Statistical summaries (mean, median, std, min, max)
- Best value CPUs by performance-per-dollar
- Top performers by category

### Machine Learning
- **Price Prediction**: Estimate CPU price from specifications
- **Performance Prediction**: Predict benchmark scores
- **Thread Performance**: Estimate single-thread performance
- All models trained with 80/20 split, feature scaling, and cross-validation

### Analytics & Visualization
- Price vs Performance scatter plots
- TDP efficiency analysis
- Core count distribution
- Category breakdowns
- AMD vs Intel comparisons
- Performance trends by core count

## 🔧 Configuration

### Frontend Environment Variables
Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:8000
```

### Backend Configuration
The backend auto-configures on startup:
- Loads CSV data from project root
- Trains ML models (saved to `backend/models/`)
- Enables CORS for development

## 🚀 Deployment

### Frontend
```bash
npm run build
# Deploy the 'dist' folder to your hosting service
# (Vercel, Netlify, GitHub Pages, etc.)
```

### Backend
```bash
# Using Docker (recommended)
docker build -t cpu-insight-engine-backend ./backend
docker run -p 8000:8000 cpu-insight-engine-backend

# Or deploy to cloud services
# (Heroku, Railway, DigitalOcean, AWS, etc.)
```

## 📚 API Documentation

Once the backend is running, visit:
- **Swagger UI**: http://localhost:8000/api/docs
- **ReDoc**: http://localhost:8000/api/redoc

For detailed API documentation, see `BACKEND_OVERVIEW.md`

## 🤝 Contributing

This is a personal project by Yuvraj Singh Kushwah. If you have suggestions or find bugs, feel free to open an issue.

## 📄 License

This project is private and proprietary.

## 👤 Author

**Yuvraj Singh Kushwah**

- GitHub: [@yuvrajsinghkushwah](https://github.com/YUVRAJ-NOVA) (if applicable)
- Project: CPU Insight Engine

## 🙏 Acknowledgments

- CPU benchmark data from PassMark Software
- UI components from shadcn/ui
- Icons from Lucide React

---

**Built with a ☕ by Yuvraj Singh Kushwah**
