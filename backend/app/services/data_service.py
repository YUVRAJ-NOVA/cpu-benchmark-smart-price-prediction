import pandas as pd
import numpy as np
from typing import Optional, List, Dict
import os
from pathlib import Path


class CPUDataService:
    """Service for loading and managing CPU benchmark data"""
    
    def __init__(self, csv_path: str = None):
        """Initialize the data service with CSV file path"""
        if csv_path is None:
            # Try backend directory first (for Railway deployment)
            base_dir = Path(__file__).parent.parent.parent
            csv_path = base_dir / "CPU_benchmark_v4_modified.csv"
            
            # Fallback to project root (for local development)
            if not csv_path.exists():
                base_dir = base_dir.parent
                csv_path = base_dir / "CPU_benchmark_v4_modified.csv"
        
        self.csv_path = csv_path
        self.df: Optional[pd.DataFrame] = None
        self.load_data()
    
    def load_data(self) -> pd.DataFrame:
        """Load and preprocess CPU data from CSV"""
        try:
            self.df = pd.read_csv(self.csv_path)
            self._preprocess_data()
            return self.df
        except Exception as e:
            raise Exception(f"Error loading CSV data: {str(e)}")
    
    def _preprocess_data(self):
        """Clean and preprocess the data"""
        if self.df is None:
            return
        
        # Convert numeric columns, handling empty strings
        numeric_columns = ['price', 'cpuMark', 'cpuValue', 'threadMark', 
                          'threadValue', 'TDP', 'powerPerf', 'cores', 'testDate']
        
        for col in numeric_columns:
            if col in self.df.columns:
                self.df[col] = pd.to_numeric(self.df[col], errors='coerce')
        
        # Fill missing values strategically
        # For categorical
        self.df['category'] = self.df['category'].fillna('Unknown')
        self.df['socket'] = self.df['socket'].fillna('unknown')
        
        # Calculate derived metrics if missing
        if 'cpuValue' in self.df.columns:
            mask = self.df['cpuValue'].isna() & self.df['price'].notna() & self.df['cpuMark'].notna()
            self.df.loc[mask, 'cpuValue'] = self.df.loc[mask, 'cpuMark'] / self.df.loc[mask, 'price']
        
        if 'threadValue' in self.df.columns:
            mask = self.df['threadValue'].isna() & self.df['price'].notna() & self.df['threadMark'].notna()
            self.df.loc[mask, 'threadValue'] = self.df.loc[mask, 'threadMark'] / self.df.loc[mask, 'price']
        
        if 'powerPerf' in self.df.columns:
            mask = self.df['powerPerf'].isna() & self.df['TDP'].notna() & self.df['cpuMark'].notna()
            self.df.loc[mask, 'powerPerf'] = self.df.loc[mask, 'cpuMark'] / self.df.loc[mask, 'TDP']
        
        # Remove complete duplicates
        self.df = self.df.drop_duplicates(subset=['cpuName'], keep='first')
        
        # Create clean index
        self.df = self.df.reset_index(drop=True)
    
    def get_all_cpus(self, limit: int = None) -> List[Dict]:
        """Get all CPU records"""
        if self.df is None:
            return []
        
        df_subset = self.df.head(limit) if limit else self.df
        return df_subset.replace({np.nan: None}).to_dict('records')
    
    def get_cpu_by_name(self, cpu_name: str) -> Optional[Dict]:
        """Get a specific CPU by name"""
        if self.df is None:
            return None
        
        result = self.df[self.df['cpuName'].str.contains(cpu_name, case=False, na=False)]
        if result.empty:
            return None
        
        return result.iloc[0].replace({np.nan: None}).to_dict()
    
    def filter_cpus(self, filters: Dict) -> List[Dict]:
        """Filter CPUs based on multiple criteria"""
        if self.df is None:
            return []
        
        df_filtered = self.df.copy()
        
        # Apply filters
        if filters.get('category'):
            df_filtered = df_filtered[df_filtered['category'].str.contains(filters['category'], case=False, na=False)]
        
        if filters.get('socket'):
            df_filtered = df_filtered[df_filtered['socket'].str.contains(filters['socket'], case=False, na=False)]
        
        # Numeric filters
        if filters.get('min_price') is not None:
            df_filtered = df_filtered[df_filtered['price'] >= filters['min_price']]
        
        if filters.get('max_price') is not None:
            df_filtered = df_filtered[df_filtered['price'] <= filters['max_price']]
        
        if filters.get('min_cores') is not None:
            df_filtered = df_filtered[df_filtered['cores'] >= filters['min_cores']]
        
        if filters.get('max_cores') is not None:
            df_filtered = df_filtered[df_filtered['cores'] <= filters['max_cores']]
        
        if filters.get('min_cpuMark') is not None:
            df_filtered = df_filtered[df_filtered['cpuMark'] >= filters['min_cpuMark']]
        
        if filters.get('max_cpuMark') is not None:
            df_filtered = df_filtered[df_filtered['cpuMark'] <= filters['max_cpuMark']]
        
        if filters.get('min_TDP') is not None:
            df_filtered = df_filtered[df_filtered['TDP'] >= filters['min_TDP']]
        
        if filters.get('max_TDP') is not None:
            df_filtered = df_filtered[df_filtered['TDP'] <= filters['max_TDP']]
        
        return df_filtered.replace({np.nan: None}).to_dict('records')
    
    def get_statistics(self, column: str) -> Optional[Dict]:
        """Get statistical summary for a specific column"""
        if self.df is None or column not in self.df.columns:
            return None
        
        series = self.df[column].dropna()
        if series.empty:
            return None
        
        return {
            'mean': float(series.mean()),
            'median': float(series.median()),
            'std': float(series.std()),
            'min': float(series.min()),
            'max': float(series.max()),
            'count': int(series.count())
        }
    
    def get_best_value_cpus(self, category: str = None, limit: int = 10) -> List[Dict]:
        """Get CPUs with best value (performance per dollar)"""
        if self.df is None:
            return []
        
        df_filtered = self.df[self.df['cpuValue'].notna() & self.df['price'].notna()].copy()
        
        if category:
            df_filtered = df_filtered[df_filtered['category'].str.contains(category, case=False, na=False)]
        
        df_sorted = df_filtered.sort_values('cpuValue', ascending=False).head(limit)
        return df_sorted.replace({np.nan: None}).to_dict('records')
    
    def get_top_performance_cpus(self, category: str = None, limit: int = 10) -> List[Dict]:
        """Get top performing CPUs by benchmark score"""
        if self.df is None:
            return []
        
        df_filtered = self.df[self.df['cpuMark'].notna()].copy()
        
        if category:
            df_filtered = df_filtered[df_filtered['category'].str.contains(category, case=False, na=False)]
        
        df_sorted = df_filtered.sort_values('cpuMark', ascending=False).head(limit)
        return df_sorted.replace({np.nan: None}).to_dict('records')
    
    def compare_cpus(self, cpu_names: List[str]) -> List[Dict]:
        """Compare multiple CPUs"""
        if self.df is None:
            return []
        
        results = []
        for name in cpu_names:
            cpu = self.get_cpu_by_name(name)
            if cpu:
                results.append(cpu)
        
        return results
    
    def get_categories(self) -> List[str]:
        """Get all unique categories"""
        if self.df is None:
            return []
        
        return self.df['category'].dropna().unique().tolist()
    
    def get_sockets(self) -> List[str]:
        """Get all unique socket types"""
        if self.df is None:
            return []
        
        return self.df['socket'].dropna().unique().tolist()
    
    def get_price_ranges(self) -> Dict:
        """Get price distribution data"""
        if self.df is None:
            return {}
        
        df_priced = self.df[self.df['price'].notna()]
        
        return {
            'budget': df_priced[df_priced['price'] < 200].shape[0],
            'mid_range': df_priced[(df_priced['price'] >= 200) & (df_priced['price'] < 500)].shape[0],
            'high_end': df_priced[(df_priced['price'] >= 500) & (df_priced['price'] < 1000)].shape[0],
            'enthusiast': df_priced[df_priced['price'] >= 1000].shape[0]
        }
    
    def get_performance_by_core_count(self) -> List[Dict]:
        """Aggregate performance metrics by core count"""
        if self.df is None:
            return []
        
        df_valid = self.df[self.df['cores'].notna() & self.df['cpuMark'].notna()]
        
        grouped = df_valid.groupby('cores').agg({
            'cpuMark': ['mean', 'median', 'max'],
            'price': 'mean',
            'TDP': 'mean'
        }).reset_index()
        
        grouped.columns = ['cores', 'avg_cpuMark', 'median_cpuMark', 'max_cpuMark', 'avg_price', 'avg_TDP']
        
        return grouped.replace({np.nan: None}).to_dict('records')
    
    def get_data_for_ml(self) -> pd.DataFrame:
        """Get cleaned data suitable for ML training"""
        if self.df is None:
            return pd.DataFrame()
        
        # Return only rows with essential data for ML
        ml_df = self.df.copy()
        
        # Focus on complete records for training
        essential_cols = ['cpuMark', 'threadMark', 'cores', 'TDP', 'price']
        ml_df = ml_df.dropna(subset=essential_cols)
        
        return ml_df
