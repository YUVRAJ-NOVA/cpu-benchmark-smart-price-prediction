import { useQuery, useMutation } from '@tanstack/react-query';
import api from '@/lib/api';

export interface CPU {
  cpuName: string;
  price: number | null;
  cpuMark: number;
  threadMark: number;
  cores: number;
  TDP: number;
  socket: string;
  category: string;
  powerPerf: number;
  testDate: string;
}

export interface FilterParams {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minCores?: number;
  maxCores?: number;
  minTDP?: number;
  maxTDP?: number;
  socket?: string;
}

export const useCPUs = (limit?: number) => {
  return useQuery<CPU[]>({
    queryKey: ['cpus', limit],
    queryFn: async () => {
      const { data } = await api.get('/api/cpus/', {
        params: limit ? { limit } : undefined,
      });
      return data;
    },
  });
};

export const useFilteredCPUs = (filters: FilterParams) => {
  return useMutation<CPU[], Error, FilterParams>({
    mutationFn: async (filterParams) => {
      const { data } = await api.post('/api/cpus/filter', filterParams);
      return data;
    },
  });
};

export const useSearchCPU = (cpuName: string) => {
  return useQuery<CPU>({
    queryKey: ['cpu', cpuName],
    queryFn: async () => {
      const { data } = await api.get(`/api/cpus/search/${encodeURIComponent(cpuName)}`);
      return data;
    },
    enabled: !!cpuName,
  });
};

export const useCompareCPUs = () => {
  return useMutation<CPU[], Error, string[]>({
    mutationFn: async (cpuNames) => {
      const { data } = await api.post('/api/cpus/compare', { cpu_names: cpuNames });
      return data;
    },
  });
};

export const useBestValueCPUs = (category?: string, limit = 10) => {
  return useQuery<CPU[]>({
    queryKey: ['bestValue', category, limit],
    queryFn: async () => {
      const { data } = await api.get('/api/cpus/best-value', {
        params: { category, limit },
      });
      return data;
    },
  });
};

export const useTopPerformance = (category?: string, limit = 10) => {
  return useQuery<CPU[]>({
    queryKey: ['topPerformance', category, limit],
    queryFn: async () => {
      const { data } = await api.get('/api/cpus/top-performance', {
        params: { category, limit },
      });
      return data;
    },
  });
};

export const useCategories = () => {
  return useQuery<string[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await api.get('/api/cpus/categories');
      return data;
    },
  });
};

export const useSockets = () => {
  return useQuery<string[]>({
    queryKey: ['sockets'],
    queryFn: async () => {
      const { data } = await api.get('/api/cpus/sockets');
      return data;
    },
  });
};
