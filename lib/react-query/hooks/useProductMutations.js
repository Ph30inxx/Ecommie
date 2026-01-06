import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth, useUser } from '@clerk/nextjs';
import { createAuthClientFormData, createAuthClient } from '../apiClient';
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

// Fetch single product
export const useProductDetail = (productId) => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: queryKeys.products.detail(productId),
    queryFn: async () => {
      const token = await getToken();
      const client = createAuthClient(token);
      const { data } = await client.get(`/api/product/${productId}`);

      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch product');
      }

      return data.product;
    },
    enabled: !!productId,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};

// Update product
export const useUpdateProduct = () => {
  const { getToken } = useAuth();
  const { user } = useUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, formData }) => {
      const token = await getToken();
      const client = createAuthClientFormData(token);
      const { data } = await client.patch(`/api/product/update/${productId}`, formData);

      if (!data.success) {
        throw new Error(data.message || 'Failed to update product');
      }

      return data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.seller(user?.id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.products.detail(variables.productId) });

      toast.success('Product updated successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update product');
    },
  });
};

// Delete product with optimistic update
export const useDeleteProduct = () => {
  const { getToken } = useAuth();
  const { user } = useUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId) => {
      const token = await getToken();
      const client = createAuthClient(token);
      const { data } = await client.delete(`/api/product/delete/${productId}`);

      if (!data.success) {
        throw new Error(data.message || 'Failed to delete product');
      }

      return data;
    },
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.products.seller(user?.id) });

      const previousProducts = queryClient.getQueryData(queryKeys.products.seller(user?.id));

      queryClient.setQueryData(
        queryKeys.products.seller(user?.id),
        (old) => old?.filter((product) => product._id !== productId)
      );

      return { previousProducts };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.seller(user?.id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });

      toast.success('Product deleted successfully');
    },
    onError: (error, productId, context) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(
          queryKeys.products.seller(user?.id),
          context.previousProducts
        );
      }
      toast.error(error.message || 'Failed to delete product');
    },
  });
};
