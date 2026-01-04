import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth, useUser } from '@clerk/nextjs';
import { createAuthClientFormData } from '../apiClient';
import { queryKeys } from '../queryKeys';
import toast from 'react-hot-toast';

export const useAddProduct = () => {
  const { getToken } = useAuth();
  const { user } = useUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData) => {
      const token = await getToken();
      const client = createAuthClientFormData(token);
      const { data } = await client.post('/api/product/add', formData);

      if (!data.success) {
        throw new Error(data.message || 'Failed to add product');
      }

      return data;
    },
    onSuccess: () => {
      // Invalidate seller products and all products
      queryClient.invalidateQueries({ queryKey: queryKeys.products.seller(user?.id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });

      toast.success('Product added successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to add product');
    },
  });
};
