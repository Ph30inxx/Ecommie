'use client';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useProductDetail, useUpdateProduct } from '@/lib/react-query/hooks/useProductMutations';
import { productUpdateSchema } from '@/lib/validation/productSchemas';
import { useAppContext } from '@/context/AppContext';
import Loading from '@/components/Loading';
import BasicInfoStep from '@/components/seller/product-form/BasicInfoStep';
import PricingStep from '@/components/seller/product-form/PricingStep';
import EditImagesStep from '@/components/seller/product-form/EditImagesStep';
import Footer from '@/components/seller/Footer';

const EditProduct = () => {
  const params = useParams();
  const productId = params.id;
  const { router } = useAppContext();

  const { data: product, isLoading, isError } = useProductDetail(productId);
  const updateProductMutation = useUpdateProduct();

  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      description: '',
      category: 'Earphone',
      price: '',
      offerPrice: '',
      images: [],
    },
  });

  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = form;

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        description: product.description,
        category: product.category,
        price: product.price,
        offerPrice: product.offerPrice,
        images: [],
      });
    }
  }, [product, reset]);

  const onSubmit = async (data) => {
    try {
      const validatedData = productUpdateSchema.parse(data);

      const formData = new FormData();
      formData.append('name', validatedData.name);
      formData.append('description', validatedData.description);
      formData.append('category', validatedData.category);
      formData.append('price', validatedData.price.toString());
      formData.append('offerPrice', validatedData.offerPrice.toString());

      if (validatedData.images && validatedData.images.length > 0) {
        validatedData.images.forEach(file => {
          formData.append('images', file);
        });
      }

      updateProductMutation.mutate(
        { productId, formData },
        {
          onSuccess: () => {
            router.push('/seller/product-list');
          },
        }
      );
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <div className="flex-1 min-h-screen flex items-center justify-center">
        <div className="card-dark p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Error</h2>
          <p className="text-slate-300 mb-6">Failed to load product details</p>
          <button
            onClick={() => router.push('/seller/product-list')}
            className="btn-primary"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between page-transition">
      <div className="md:p-10 p-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold gradient-text mb-6">Edit Product</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="card-dark p-6 space-y-6">
            <BasicInfoStep register={register} errors={errors} />
            <div className="border-t border-slate-800 pt-6">
              <PricingStep register={register} errors={errors} />
            </div>
            <div className="border-t border-slate-800 pt-6">
              <EditImagesStep
                setValue={setValue}
                watch={watch}
                errors={errors}
                existingImages={product?.image || []}
              />
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => router.push('/seller/product-list')}
                className="px-6 py-3 bg-slate-800 text-slate-100 font-semibold rounded-lg border border-slate-700 hover:bg-slate-700 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary px-8"
                disabled={updateProductMutation.isPending}
              >
                {updateProductMutation.isPending ? 'Updating Product...' : 'Update Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditProduct;
