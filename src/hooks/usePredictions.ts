import { useMutation, useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

export interface PricePredictionRequest {
  cpuMark: number;
  threadMark: number;
  cores: number;
  TDP: number;
  category: string;
}

export interface PerformancePredictionRequest {
  cores: number;
  price: number;
  TDP: number;
  category: string;
}

export interface PredictionResponse {
  predicted_value: number;
  confidence_interval?: {
    lower: number;
    upper: number;
  };
  model_used: string;
}

export const usePricePredictor = () => {
  return useMutation<PredictionResponse, Error, PricePredictionRequest>({
    mutationFn: async (request) => {
      const { data } = await api.post('/api/predictions/price', request);
      return data;
    },
  });
};

export const usePerformancePredictor = () => {
  return useMutation<PredictionResponse, Error, PerformancePredictionRequest>({
    mutationFn: async (request) => {
      const { data } = await api.post('/api/predictions/performance', request);
      return data;
    },
  });
};

export const useModelInfo = () => {
  return useQuery({
    queryKey: ['modelInfo'],
    queryFn: async () => {
      const { data } = await api.get('/api/predictions/models-info');
      return data;
    },
  });
};
