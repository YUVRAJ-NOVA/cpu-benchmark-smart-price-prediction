from fastapi import APIRouter, HTTPException, Query, Depends
from typing import List, Optional
from app.models.cpu_models import (
    CPUResponse, CPUFilterRequest, ComparisonRequest, 
    BestValueResponse, StatisticsResponse
)

router = APIRouter(prefix="/api/cpus", tags=["CPUs"])

# These will be set by main.py
get_data_service = None
get_ml_service = None


@router.get("/", response_model=List[CPUResponse])
async def get_all_cpus(
    limit: Optional[int] = Query(None, description="Limit number of results"),
    data_service = Depends(lambda: get_data_service())
):
    """Get all CPU records"""
    try:
        cpus = data_service.get_all_cpus(limit=limit)
        return cpus
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/search/{cpu_name}", response_model=CPUResponse)
async def search_cpu(cpu_name: str, data_service = Depends(lambda: get_data_service())):
    """Search for a CPU by name"""
    try:
        cpu = data_service.get_cpu_by_name(cpu_name)
        if cpu is None:
            raise HTTPException(status_code=404, detail=f"CPU '{cpu_name}' not found")
        return cpu
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/filter", response_model=List[CPUResponse])
async def filter_cpus(filters: CPUFilterRequest, data_service = Depends(lambda: get_data_service())):
    """Filter CPUs based on criteria"""
    try:
        filtered = data_service.filter_cpus(filters.dict(exclude_none=True))
        return filtered
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/categories", response_model=List[str])
async def get_categories(data_service = Depends(lambda: get_data_service())):
    """Get all CPU categories"""
    try:
        return data_service.get_categories()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/sockets", response_model=List[str])
async def get_sockets(data_service = Depends(lambda: get_data_service())):
    """Get all socket types"""
    try:
        return data_service.get_sockets()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/best-value", response_model=List[CPUResponse])
async def get_best_value_cpus(
    category: Optional[str] = Query(None, description="Filter by category"),
    limit: int = Query(10, description="Number of results"),
    data_service = Depends(lambda: get_data_service())
):
    """Get CPUs with best performance per dollar"""
    try:
        return data_service.get_best_value_cpus(category=category, limit=limit)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/top-performance", response_model=List[CPUResponse])
async def get_top_performance_cpus(
    category: Optional[str] = Query(None, description="Filter by category"),
    limit: int = Query(10, description="Number of results"),
    data_service = Depends(lambda: get_data_service())
):
    """Get top performing CPUs by benchmark score"""
    try:
        return data_service.get_top_performance_cpus(category=category, limit=limit)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/compare", response_model=List[CPUResponse])
async def compare_cpus(request: ComparisonRequest, data_service = Depends(lambda: get_data_service())):
    """Compare multiple CPUs"""
    try:
        cpus = data_service.compare_cpus(request.cpu_names)
        if not cpus:
            raise HTTPException(status_code=404, detail="No CPUs found with given names")
        return cpus
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/statistics/{column}", response_model=StatisticsResponse)
async def get_column_statistics(column: str, data_service = Depends(lambda: get_data_service())):
    """Get statistical summary for a specific column"""
    try:
        stats = data_service.get_statistics(column)
        if stats is None:
            raise HTTPException(status_code=404, detail=f"Column '{column}' not found or has no data")
        return stats
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
