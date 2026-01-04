import { useQuery } from '@tanstack/react-query';
import { useAuth, useUser } from '@clerk/nextjs';
import { createAuthClient } from '../apiClient';
import { queryKeys } from '../queryKeys';
import toast from 'react-hot-toast';

// Customer orders
export const useCustomerOrders = () => {
  const { user } = useUser();
  const { getToken } = useAuth();

  return useQuery({
    queryKey: queryKeys.orders.customer(user?.id),
    queryFn: async () => {
      const token = await getToken();
      const client = createAuthClient(token);
      const { data } = await client.get('/api/order/list');

      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch orders');
      }

      return data.orders.reverse(); // Match existing behavior
    },
    enabled: !!user,
    onError: (error) => {
      toast.error(error.message || 'Failed to fetch orders');
    },
  });
};

// Seller orders
export const useSellerOrders = () => {
  const { user } = useUser();
  const { getToken } = useAuth();

  return useQuery({
    queryKey: queryKeys.orders.seller(user?.id),
    queryFn: async () => {
      const token = await getToken();
      const client = createAuthClient(token);
      const { data } = await client.get('/api/order/seller-orders');

      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch seller orders');
      }

      return data.orders;
    },
    enabled: !!user,
    onError: (error) => {
      toast.error(error.message || 'Failed to fetch seller orders');
    },
  });
};
