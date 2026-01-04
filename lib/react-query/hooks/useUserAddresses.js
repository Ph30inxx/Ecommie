import { useQuery } from '@tanstack/react-query';
import { useAuth, useUser } from '@clerk/nextjs';
import { createAuthClient } from '../apiClient';
import { queryKeys } from '../queryKeys';
import toast from 'react-hot-toast';

export const useUserAddresses = () => {
  const { user } = useUser();
  const { getToken } = useAuth();

  return useQuery({
    queryKey: queryKeys.user.addresses(user?.id),
    queryFn: async () => {
      const token = await getToken();
      const client = createAuthClient(token);
      const { data } = await client.get('/api/user/get-address');

      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch addresses');
      }

      return data.addresses;
    },
    enabled: !!user,
    onError: (error) => {
      toast.error(error.message || 'Failed to fetch addresses');
    },
  });
};
