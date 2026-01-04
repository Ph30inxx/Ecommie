import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth, useUser } from '@clerk/nextjs';
import { createAuthClient } from '../apiClient';
import { queryKeys } from '../queryKeys';
import toast from 'react-hot-toast';

export const useUpdateCart = () => {
  const { getToken } = useAuth();
  const { user } = useUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (cartData) => {
      const token = await getToken();
      const client = createAuthClient(token);
      const { data } = await client.post('/api/cart/update', { cartData });

      if (!data.success) {
        throw new Error(data.message || 'Failed to update cart');
      }

      return data;
    },
    onSuccess: (data, cartData) => {
      // Invalidate user data to refetch with new cart
      queryClient.invalidateQueries({ queryKey: queryKeys.user.data(user?.id) });
      // No toast here - we'll handle it in the component layer
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update cart');
    },
  });
};
