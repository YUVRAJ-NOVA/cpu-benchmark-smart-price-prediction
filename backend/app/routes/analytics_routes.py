from fastapi import APIRouter, HTTPException, Depends
from typing import List, Dict

router = APIRouter(prefix="/api/analytics", tags=["Analytics"])

# These will be set by main.py
get_data_service = None
get_ml_service = None


@router.get("/price-ranges")
async def get_price_ranges(data_service = Depends(lambda: get_data_service())):
    """Get distribution of CPUs across price ranges"""
    try:
        return data_service.get_price_ranges()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/performance-by-cores")
async def get_performance_by_cores(data_service = Depends(lambda: get_data_service())):
    """Get aggregated performance metrics grouped by core count"""
    try:
        return data_service.get_performance_by_core_count()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/category-distribution")
async def get_category_distribution(data_service = Depends(lambda: get_data_service())):
    """Get count of CPUs by category"""
    try:
        categories = data_service.get_categories()
        distribution = {}
        
        for category in categories:
            filtered = data_service.filter_cpus({'category': category})
            distribution[category] = len(filtered)
        
        return distribution
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/price-vs-performance")
async def get_price_vs_performance(data_service = Depends(lambda: get_data_service())):
    """Get price vs performance data for scatter plots"""
    try:
        cpus = data_service.get_all_cpus()
        
        # Filter CPUs with both price and performance data
        data = [
            {
                'cpuName': cpu['cpuName'],
                'price': cpu['price'],
                'cpuMark': cpu['cpuMark'],
                'category': cpu['category'],
                'cores': cpu['cores']
            }
            for cpu in cpus
            if cpu.get('price') is not None and cpu.get('cpuMark') is not None
        ]
        
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/tdp-vs-performance")
async def get_tdp_vs_performance(data_service = Depends(lambda: get_data_service())):
    """Get TDP vs performance data"""
    try:
        cpus = data_service.get_all_cpus()
        
        data = [
            {
                'cpuName': cpu['cpuName'],
                'TDP': cpu['TDP'],
                'cpuMark': cpu['cpuMark'],
                'powerPerf': cpu['powerPerf'],
                'category': cpu['category']
            }
            for cpu in cpus
            if cpu.get('TDP') is not None and cpu.get('cpuMark') is not None
        ]
        
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/core-count-distribution")
async def get_core_count_distribution(data_service = Depends(lambda: get_data_service())):
    """Get distribution of CPUs by core count"""
    try:
        cpus = data_service.get_all_cpus()
        
        distribution = {}
        for cpu in cpus:
            cores = cpu.get('cores')
            if cores is not None:
                cores = int(cores)
                distribution[cores] = distribution.get(cores, 0) + 1
        
        # Convert to list format for easier frontend consumption
        result = [{'cores': k, 'count': v} for k, v in sorted(distribution.items())]
        
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/value-leaders/{category}")
async def get_value_leaders(category: str, data_service = Depends(lambda: get_data_service())):
    """Get best value CPUs for a specific category"""
    try:
        return data_service.get_best_value_cpus(category=category, limit=15)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/manufacturer-stats")
async def get_manufacturer_stats(data_service = Depends(lambda: get_data_service())):
    """Get statistics grouped by manufacturer (AMD/Intel)"""
    try:
        cpus = data_service.get_all_cpus()
        
        amd_cpus = [cpu for cpu in cpus if 'AMD' in cpu.get('cpuName', '').upper()]
        intel_cpus = [cpu for cpu in cpus if 'INTEL' in cpu.get('cpuName', '').upper()]
        
        def calc_avg(cpus, field):
            values = [cpu.get(field) for cpu in cpus if cpu.get(field) is not None]
            return sum(values) / len(values) if values else 0
        
        return {
            'AMD': {
                'count': len(amd_cpus),
                'avg_price': calc_avg(amd_cpus, 'price'),
                'avg_cpuMark': calc_avg(amd_cpus, 'cpuMark'),
                'avg_cores': calc_avg(amd_cpus, 'cores'),
                'avg_TDP': calc_avg(amd_cpus, 'TDP')
            },
            'Intel': {
                'count': len(intel_cpus),
                'avg_price': calc_avg(intel_cpus, 'price'),
                'avg_cpuMark': calc_avg(intel_cpus, 'cpuMark'),
                'avg_cores': calc_avg(intel_cpus, 'cores'),
                'avg_TDP': calc_avg(intel_cpus, 'TDP')
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
