import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../apiClient';
import { queryKeys } from '../queryKeys';
import toast from 'react-hot-toast';

export const useProducts = () => {
  return useQuery({
    queryKey: queryKeys.products.list(),
    queryFn: async () => {
      const { data } = await apiClient.get('/api/product/list');

      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch products');
      }

      return data.products;
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to fetch products');
    },
    // No staleTime override - uses default Infinity
    // Manual refetch only via refetch() or queryClient.invalidateQueries()
  });
};
