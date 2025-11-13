from fastapi import APIRouter, HTTPException, Depends
from app.models.cpu_models import (
    CPUPricePredictionRequest,
    CPUPerformancePredictionRequest,
    PredictionResponse
)

router = APIRouter(prefix="/api/predictions", tags=["Predictions"])

# These will be set by main.py
get_data_service = None
get_ml_service = None


@router.post("/price", response_model=PredictionResponse)
async def predict_price(request: CPUPricePredictionRequest, ml_service = Depends(lambda: get_ml_service())):
    """
    Predict CPU price based on specifications
    
    - **cpuMark**: Overall CPU benchmark score
    - **threadMark**: Single thread performance score
    - **cores**: Number of CPU cores
    - **TDP**: Thermal Design Power in watts
    - **category**: CPU category (Desktop/Server/Laptop)
    """
    try:
        features = {
            'cpuMark': request.cpuMark,
            'threadMark': request.threadMark,
            'cores': request.cores,
            'TDP': request.TDP,
            'category': request.category
        }
        
        prediction = ml_service.predict_price(features)
        return prediction
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/performance", response_model=PredictionResponse)
async def predict_performance(request: CPUPerformancePredictionRequest, ml_service = Depends(lambda: get_ml_service())):
    """
    Predict CPU performance (cpuMark) based on specifications
    
    - **cores**: Number of CPU cores
    - **price**: Price in USD
    - **TDP**: Thermal Design Power in watts
    - **category**: CPU category (Desktop/Server/Laptop)
    """
    try:
        features = {
            'cores': request.cores,
            'price': request.price,
            'TDP': request.TDP,
            'category': request.category
        }
        
        prediction = ml_service.predict_performance(features)
        return prediction
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/models-info")
async def get_models_info(ml_service = Depends(lambda: get_ml_service())):
    """Get information about trained ML models"""
    try:
        return ml_service.get_model_info()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
