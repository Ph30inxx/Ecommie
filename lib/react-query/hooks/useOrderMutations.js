import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth, useUser } from '@clerk/nextjs';
import { createAuthClient } from '../apiClient';
import { queryKeys } from '../queryKeys';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export const useCreateOrder = () => {
  const { getToken } = useAuth();
  const { user } = useUser();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ address, items }) => {
      const token = await getToken();
      const client = createAuthClient(token);
      const { data } = await client.post('/api/order/create', { address, items });

      if (!data.success) {
        throw new Error(data.message || 'Failed to create order');
      }

      return data;
    },
    onSuccess: () => {
      // Invalidate orders and user data (cart should be cleared)
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.customer(user?.id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.user.data(user?.id) });

      toast.success('Order placed successfully');
      router.push('/order-placed');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create order');
    },
  });
};
