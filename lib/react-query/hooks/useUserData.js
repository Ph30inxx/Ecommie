import { useQuery } from '@tanstack/react-query';
import { useAuth, useUser } from '@clerk/nextjs';
import { createAuthClient } from '../apiClient';
import { queryKeys } from '../queryKeys';
import toast from 'react-hot-toast';

export const useUserData = () => {
  const { user } = useUser();
  const { getToken } = useAuth();

  return useQuery({
    queryKey: queryKeys.user.data(user?.id),
    queryFn: async () => {
      const token = await getToken();
      const client = createAuthClient(token);
      const { data } = await client.get('/api/user/data');

      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch user data');
      }

      return data.user;
    },
    enabled: !!user, // Only run when user is authenticated
    onError: (error) => {
      toast.error(error.message || 'Failed to fetch user data');
    },
  });
};
