import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.linear_model import LinearRegression, Ridge
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
import joblib
from typing import Dict, Tuple, Optional
import os
from pathlib import Path


class CPUMLService:
    """Machine Learning service for CPU prediction models"""
    
    def __init__(self, data_service):
        """Initialize ML service with data service"""
        self.data_service = data_service
        self.models = {}
        self.scalers = {}
        self.encoders = {}
        self.model_scores = {}
        
        # Model storage path
        self.model_dir = Path(__file__).parent.parent.parent / "models"
        self.model_dir.mkdir(exist_ok=True)
        
        # Train models on initialization
        self._train_all_models()
    
    def _encode_categorical(self, df: pd.DataFrame, column: str) -> pd.DataFrame:
        """Encode categorical variables"""
        if column not in self.encoders:
            self.encoders[column] = LabelEncoder()
            df[f'{column}_encoded'] = self.encoders[column].fit_transform(df[column].astype(str))
        else:
            df[f'{column}_encoded'] = self.encoders[column].transform(df[column].astype(str))
        
        return df
    
    def _prepare_features_for_price_prediction(self, df: pd.DataFrame) -> Tuple[pd.DataFrame, pd.Series]:
        """Prepare features for price prediction"""
        # Use cpuMark, threadMark, cores, TDP, category
        feature_cols = ['cpuMark', 'threadMark', 'cores', 'TDP']
        
        # Encode category
        df = self._encode_categorical(df, 'category')
        feature_cols.append('category_encoded')
        
        X = df[feature_cols].copy()
        y = df['price'].copy()
        
        return X, y
    
    def _prepare_features_for_performance_prediction(self, df: pd.DataFrame) -> Tuple[pd.DataFrame, pd.Series]:
        """Prepare features for cpuMark prediction"""
        # Use cores, price, TDP, threadMark, category
        feature_cols = ['cores', 'price', 'TDP', 'threadMark']
        
        # Encode category
        df = self._encode_categorical(df, 'category')
        feature_cols.append('category_encoded')
        
        X = df[feature_cols].copy()
        y = df['cpuMark'].copy()
        
        return X, y
    
    def _prepare_features_for_thread_prediction(self, df: pd.DataFrame) -> Tuple[pd.DataFrame, pd.Series]:
        """Prepare features for threadMark prediction"""
        # Use cores, TDP, cpuMark, category
        feature_cols = ['cores', 'TDP', 'cpuMark']
        
        # Encode category
        df = self._encode_categorical(df, 'category')
        feature_cols.append('category_encoded')
        
        X = df[feature_cols].copy()
        y = df['threadMark'].copy()
        
        return X, y
    
    def _train_model(self, X: pd.DataFrame, y: pd.Series, model_name: str) -> Dict:
        """Train a single model and return metrics"""
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        
        # Scale features
        scaler = StandardScaler()
        X_train_scaled = scaler.fit_transform(X_train)
        X_test_scaled = scaler.transform(X_test)
        
        # Store scaler
        self.scalers[model_name] = scaler
        
        # Train multiple models and choose best
        models_to_try = {
            'random_forest': RandomForestRegressor(n_estimators=100, random_state=42, n_jobs=-1),
            'gradient_boosting': GradientBoostingRegressor(n_estimators=100, random_state=42),
            'ridge': Ridge(alpha=1.0)
        }
        
        best_model = None
        best_score = -float('inf')
        best_model_type = None
        
        for model_type, model in models_to_try.items():
            model.fit(X_train_scaled, y_train)
            score = model.score(X_test_scaled, y_test)
            
            if score > best_score:
                best_score = score
                best_model = model
                best_model_type = model_type
        
        # Store best model
        self.models[model_name] = best_model
        
        # Calculate metrics
        y_pred = best_model.predict(X_test_scaled)
        
        metrics = {
            'r2_score': r2_score(y_test, y_pred),
            'mse': mean_squared_error(y_test, y_pred),
            'rmse': np.sqrt(mean_squared_error(y_test, y_pred)),
            'mae': mean_absolute_error(y_test, y_pred),
            'model_type': best_model_type,
            'training_samples': len(X_train)
        }
        
        self.model_scores[model_name] = metrics
        
        # Save model
        self._save_model(model_name)
        
        return metrics
    
    def _train_all_models(self):
        """Train all prediction models"""
        df = self.data_service.get_data_for_ml()
        
        if df.empty:
            print("Warning: No data available for ML training")
            return
        
        print(f"Training ML models with {len(df)} samples...")
        
        # Train price prediction model
        try:
            df_price = df.dropna(subset=['price', 'cpuMark', 'threadMark', 'cores', 'TDP', 'category'])
            if len(df_price) > 50:
                X, y = self._prepare_features_for_price_prediction(df_price)
                metrics = self._train_model(X, y, 'price_prediction')
                print(f"Price prediction model trained: R² = {metrics['r2_score']:.3f}")
        except Exception as e:
            print(f"Error training price model: {e}")
        
        # Train performance prediction model
        try:
            df_perf = df.dropna(subset=['cpuMark', 'cores', 'price', 'TDP', 'threadMark', 'category'])
            if len(df_perf) > 50:
                X, y = self._prepare_features_for_performance_prediction(df_perf)
                metrics = self._train_model(X, y, 'performance_prediction')
                print(f"Performance prediction model trained: R² = {metrics['r2_score']:.3f}")
        except Exception as e:
            print(f"Error training performance model: {e}")
        
        # Train thread performance prediction model
        try:
            df_thread = df.dropna(subset=['threadMark', 'cores', 'TDP', 'cpuMark', 'category'])
            if len(df_thread) > 50:
                X, y = self._prepare_features_for_thread_prediction(df_thread)
                metrics = self._train_model(X, y, 'thread_prediction')
                print(f"Thread prediction model trained: R² = {metrics['r2_score']:.3f}")
        except Exception as e:
            print(f"Error training thread model: {e}")
    
    def _save_model(self, model_name: str):
        """Save model, scaler, and encoders to disk"""
        try:
            model_path = self.model_dir / f"{model_name}.pkl"
            scaler_path = self.model_dir / f"{model_name}_scaler.pkl"
            
            joblib.dump(self.models[model_name], model_path)
            joblib.dump(self.scalers[model_name], scaler_path)
            
            # Save encoders
            for encoder_name, encoder in self.encoders.items():
                encoder_path = self.model_dir / f"encoder_{encoder_name}.pkl"
                joblib.dump(encoder, encoder_path)
        except Exception as e:
            print(f"Error saving model {model_name}: {e}")
    
    def _load_model(self, model_name: str) -> bool:
        """Load model from disk if exists"""
        try:
            model_path = self.model_dir / f"{model_name}.pkl"
            scaler_path = self.model_dir / f"{model_name}_scaler.pkl"
            
            if model_path.exists() and scaler_path.exists():
                self.models[model_name] = joblib.load(model_path)
                self.scalers[model_name] = joblib.load(scaler_path)
                return True
        except Exception as e:
            print(f"Error loading model {model_name}: {e}")
        
        return False
    
    def predict_price(self, features: Dict) -> Dict:
        """Predict CPU price based on specifications"""
        model_name = 'price_prediction'
        
        if model_name not in self.models:
            raise ValueError("Price prediction model not trained")
        
        # Prepare input
        input_df = pd.DataFrame([{
            'cpuMark': features['cpuMark'],
            'threadMark': features['threadMark'],
            'cores': features['cores'],
            'TDP': features['TDP'],
            'category': features.get('category', 'Desktop')
        }])
        
        # Encode category
        input_df = self._encode_categorical(input_df, 'category')
        
        feature_cols = ['cpuMark', 'threadMark', 'cores', 'TDP', 'category_encoded']
        X = input_df[feature_cols]
        
        # Scale and predict
        X_scaled = self.scalers[model_name].transform(X)
        prediction = self.models[model_name].predict(X_scaled)[0]
        
        # Calculate confidence based on model score
        confidence = self.model_scores.get(model_name, {}).get('r2_score', 0.0)
        
        return {
            'predicted_value': float(max(0, prediction)),
            'confidence_score': float(confidence),
            'model_used': self.model_scores[model_name]['model_type'],
            'input_features': features
        }
    
    def predict_performance(self, features: Dict) -> Dict:
        """Predict CPU performance (cpuMark) based on specifications"""
        model_name = 'performance_prediction'
        
        if model_name not in self.models:
            raise ValueError("Performance prediction model not trained")
        
        # Prepare input
        input_df = pd.DataFrame([{
            'cores': features['cores'],
            'price': features['price'],
            'TDP': features['TDP'],
            'threadMark': features.get('threadMark', 2500),  # Default reasonable value
            'category': features.get('category', 'Desktop')
        }])
        
        # Encode category
        input_df = self._encode_categorical(input_df, 'category')
        
        feature_cols = ['cores', 'price', 'TDP', 'threadMark', 'category_encoded']
        X = input_df[feature_cols]
        
        # Scale and predict
        X_scaled = self.scalers[model_name].transform(X)
        prediction = self.models[model_name].predict(X_scaled)[0]
        
        # Calculate confidence
        confidence = self.model_scores.get(model_name, {}).get('r2_score', 0.0)
        
        return {
            'predicted_value': float(max(0, prediction)),
            'confidence_score': float(confidence),
            'model_used': self.model_scores[model_name]['model_type'],
            'input_features': features
        }
    
    def predict_thread_performance(self, features: Dict) -> Dict:
        """Predict single thread performance"""
        model_name = 'thread_prediction'
        
        if model_name not in self.models:
            raise ValueError("Thread prediction model not trained")
        
        # Prepare input
        input_df = pd.DataFrame([{
            'cores': features['cores'],
            'TDP': features['TDP'],
            'cpuMark': features.get('cpuMark', 20000),  # Default reasonable value
            'category': features.get('category', 'Desktop')
        }])
        
        # Encode category
        input_df = self._encode_categorical(input_df, 'category')
        
        feature_cols = ['cores', 'TDP', 'cpuMark', 'category_encoded']
        X = input_df[feature_cols]
        
        # Scale and predict
        X_scaled = self.scalers[model_name].transform(X)
        prediction = self.models[model_name].predict(X_scaled)[0]
        
        # Calculate confidence
        confidence = self.model_scores.get(model_name, {}).get('r2_score', 0.0)
        
        return {
            'predicted_value': float(max(0, prediction)),
            'confidence_score': float(confidence),
            'model_used': self.model_scores[model_name]['model_type'],
            'input_features': features
        }
    
    def get_model_info(self) -> Dict:
        """Get information about all trained models"""
        return {
            'models': list(self.models.keys()),
            'scores': self.model_scores
        }
