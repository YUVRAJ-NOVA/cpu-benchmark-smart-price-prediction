from fastapi import FastAPI, Request, status, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from contextlib import asynccontextmanager
import sys
from pathlib import Path

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from app.services.data_service import CPUDataService
from app.services.ml_service import CPUMLService
from app.routes import cpu_routes, prediction_routes, analytics_routes


# Global services
data_service = None
ml_service = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Initialize services on startup"""
    global data_service, ml_service
    
    print("🚀 Starting CPU Insight Engine Backend...")
    
    # Initialize data service
    print("📊 Loading CPU benchmark data...")
    data_service = CPUDataService()
    print(f"✅ Loaded {len(data_service.df)} CPU records")
    
    # Initialize ML service
    print("🤖 Training ML models...")
    ml_service = CPUMLService(data_service)
    print("✅ ML models ready")
    
    yield
    
    # Cleanup (if needed)
    print("👋 Shutting down...")


# Create FastAPI app
app = FastAPI(
    title="CPU Insight Engine API",
    description="Data-oriented backend for CPU benchmark analysis and predictions",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)


# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Exception handlers
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """Handle validation errors"""
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "error": "Validation Error",
            "details": exc.errors()
        }
    )


@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    """Handle general exceptions"""
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "error": "Internal Server Error",
            "message": str(exc)
        }
    )


# Dependency injection for routes
def get_data_service():
    if data_service is None:
        raise RuntimeError("Data service not initialized")
    return data_service


def get_ml_service():
    if ml_service is None:
        raise RuntimeError("ML service not initialized")
    return ml_service


# Set up dependency injection in route modules
cpu_routes.get_data_service = get_data_service
cpu_routes.get_ml_service = get_ml_service
prediction_routes.get_data_service = get_data_service
prediction_routes.get_ml_service = get_ml_service
analytics_routes.get_data_service = get_data_service
analytics_routes.get_ml_service = get_ml_service

# Register routes
app.include_router(cpu_routes.router)
app.include_router(prediction_routes.router)
app.include_router(analytics_routes.router)


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "CPU Insight Engine API",
        "version": "1.0.0",
        "docs": "/api/docs",
        "status": "operational"
    }


@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "data_loaded": data_service is not None and data_service.df is not None,
        "ml_models_loaded": ml_service is not None and len(ml_service.models) > 0,
        "total_cpus": len(data_service.df) if data_service and data_service.df is not None else 0
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
