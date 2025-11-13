from pydantic import BaseModel, Field
from typing import Optional
from datetime import date


class CPUBase(BaseModel):
    """Base CPU model with all benchmark data fields"""
    cpuName: str = Field(..., description="CPU model name")
    price: Optional[float] = Field(None, description="Price in USD")
    cpuMark: Optional[float] = Field(None, description="Overall CPU benchmark score")
    cpuValue: Optional[float] = Field(None, description="Performance per dollar")
    threadMark: Optional[float] = Field(None, description="Single thread performance score")
    threadValue: Optional[float] = Field(None, description="Thread performance per dollar")
    TDP: Optional[float] = Field(None, description="Thermal Design Power in Watts")
    powerPerf: Optional[float] = Field(None, description="Performance per watt")
    cores: Optional[int] = Field(None, description="Number of CPU cores")
    testDate: Optional[int] = Field(None, description="Year of benchmark test")
    socket: Optional[str] = Field(None, description="CPU socket type")
    category: Optional[str] = Field(None, description="CPU category (Desktop/Server/Laptop)")
    date: Optional[str] = Field(None, description="Release date")

    class Config:
        from_attributes = True


class CPUResponse(CPUBase):
    """Response model for CPU data"""
    pass


class CPUPredictionRequest(BaseModel):
    """Request model for CPU predictions"""
    cores: int = Field(..., gt=0, description="Number of cores")
    TDP: float = Field(..., gt=0, description="TDP in watts")
    threadMark: Optional[float] = Field(None, description="Single thread performance")
    category: str = Field(default="Desktop", description="CPU category")
    socket: Optional[str] = Field(None, description="Socket type")


class CPUPricePredictionRequest(BaseModel):
    """Request model for price prediction"""
    cpuMark: float = Field(..., gt=0, description="CPU benchmark score")
    threadMark: float = Field(..., gt=0, description="Thread performance score")
    cores: int = Field(..., gt=0, description="Number of cores")
    TDP: float = Field(..., gt=0, description="TDP in watts")
    category: str = Field(default="Desktop", description="CPU category")


class CPUPerformancePredictionRequest(BaseModel):
    """Request model for performance prediction"""
    cores: int = Field(..., gt=0, description="Number of cores")
    price: float = Field(..., gt=0, description="Price in USD")
    TDP: float = Field(..., gt=0, description="TDP in watts")
    category: str = Field(default="Desktop", description="CPU category")


class PredictionResponse(BaseModel):
    """Response model for predictions"""
    predicted_value: float
    confidence_score: Optional[float] = None
    model_used: str
    input_features: dict


class StatisticsResponse(BaseModel):
    """Response model for statistical analysis"""
    mean: float
    median: float
    std: float
    min: float
    max: float
    count: int


class CPUFilterRequest(BaseModel):
    """Request model for filtering CPUs"""
    category: Optional[str] = None
    min_price: Optional[float] = None
    max_price: Optional[float] = None
    min_cores: Optional[int] = None
    max_cores: Optional[int] = None
    min_cpuMark: Optional[float] = None
    max_cpuMark: Optional[float] = None
    socket: Optional[str] = None
    min_TDP: Optional[float] = None
    max_TDP: Optional[float] = None


class ComparisonRequest(BaseModel):
    """Request model for comparing CPUs"""
    cpu_names: list[str] = Field(..., min_length=1, max_length=6)


class BestValueResponse(BaseModel):
    """Response for best value CPUs"""
    cpuName: str
    price: float
    cpuMark: float
    cpuValue: float
    cores: int
    category: str
