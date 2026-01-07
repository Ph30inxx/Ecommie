import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';
import { createAuthClient } from '../apiClient';
import toast from 'react-hot-toast';

export const useOnboardSeller = () => {
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async (formData) => {
      const token = await getToken();
      const client = createAuthClient(token);
      const { data } = await client.post('/api/seller/onboard', formData);

      if (!data.success) {
        throw new Error(data.message || 'Failed to onboard seller');
      }

      return data;
    },
    onSuccess: (data) => {
      toast.success('Seller onboarded successfully');
      return data;
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to onboard seller');
    },
  });
};
