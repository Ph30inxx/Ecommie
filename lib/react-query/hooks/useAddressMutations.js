import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth, useUser } from '@clerk/nextjs';
import { createAuthClient } from '../apiClient';
import { queryKeys } from '../queryKeys';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export const useAddAddress = () => {
  const { getToken } = useAuth();
  const { user } = useUser();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (address) => {
      const token = await getToken();
      const client = createAuthClient(token);
      const { data } = await client.post('/api/user/add-address', { address });

      if (!data.success) {
        throw new Error(data.message || 'Failed to add address');
      }

      return data;
    },
    onSuccess: () => {
      // Invalidate addresses to refetch with new address
      queryClient.invalidateQueries({ queryKey: queryKeys.user.addresses(user?.id) });

      toast.success('Address added successfully');
      router.push('/cart');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to add address');
    },
  });
};
