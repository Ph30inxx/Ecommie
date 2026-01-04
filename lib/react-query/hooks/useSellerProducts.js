import { useQuery } from '@tanstack/react-query';
import { useAuth, useUser } from '@clerk/nextjs';
import { createAuthClient } from '../apiClient';
import { queryKeys } from '../queryKeys';
import toast from 'react-hot-toast';

export const useSellerProducts = () => {
  const { user } = useUser();
  const { getToken } = useAuth();

  return useQuery({
    queryKey: queryKeys.products.seller(user?.id),
    queryFn: async () => {
      const token = await getToken();
      const client = createAuthClient(token);
      const { data } = await client.get('/api/product/seller-list');

      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch seller products');
      }

      return data.products;
    },
    enabled: !!user,
    onError: (error) => {
      toast.error(error.message || 'Failed to fetch seller products');
    },
  });
};
