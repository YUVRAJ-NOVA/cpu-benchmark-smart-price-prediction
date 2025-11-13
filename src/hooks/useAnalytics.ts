import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

export const usePriceVsPerformance = () => {
  return useQuery({
    queryKey: ['priceVsPerformance'],
    queryFn: async () => {
      const { data } = await api.get('/api/analytics/price-vs-performance');
      return data;
    },
  });
};

export const useTDPVsPerformance = () => {
  return useQuery({
    queryKey: ['tdpVsPerformance'],
    queryFn: async () => {
      const { data } = await api.get('/api/analytics/tdp-vs-performance');
      return data;
    },
  });
};

export const useCategoryDistribution = () => {
  return useQuery({
    queryKey: ['categoryDistribution'],
    queryFn: async () => {
      const { data } = await api.get('/api/analytics/category-distribution');
      return data;
    },
  });
};

export const useCoreCountDistribution = () => {
  return useQuery({
    queryKey: ['coreCountDistribution'],
    queryFn: async () => {
      const { data } = await api.get('/api/analytics/core-count-distribution');
      return data;
    },
  });
};

export const usePerformanceByCores = () => {
  return useQuery({
    queryKey: ['performanceByCores'],
    queryFn: async () => {
      const { data } = await api.get('/api/analytics/performance-by-cores');
      return data;
    },
  });
};

export const useManufacturerStats = () => {
  return useQuery({
    queryKey: ['manufacturerStats'],
    queryFn: async () => {
      const { data } = await api.get('/api/analytics/manufacturer-stats');
      return data;
    },
  });
};

export const useValueLeaders = (category: string) => {
  return useQuery({
    queryKey: ['valueLeaders', category],
    queryFn: async () => {
      const { data } = await api.get(`/api/analytics/value-leaders/${category}`);
      return data;
    },
    enabled: !!category,
  });
};

export const usePriceRanges = () => {
  return useQuery({
    queryKey: ['priceRanges'],
    queryFn: async () => {
      const { data } = await api.get('/api/analytics/price-ranges');
      return data;
    },
  });
};
