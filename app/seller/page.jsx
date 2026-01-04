'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddProduct } from '@/lib/react-query/hooks/useProductMutations';
import { basicInfoSchema, pricingSchema, imagesSchema, productFormSchema } from '@/lib/validation/productSchemas';

// Import step components
import StepIndicator from '@/components/seller/product-form/StepIndicator';
import BasicInfoStep from '@/components/seller/product-form/BasicInfoStep';
import PricingStep from '@/components/seller/product-form/PricingStep';
import ImagesStep from '@/components/seller/product-form/ImagesStep';

const getFieldsForStep = (step) => {
  switch(step) {
    case 1: return ['name', 'description', 'category'];
    case 2: return ['price', 'offerPrice'];
    case 3: return ['images'];
    default: return [];
  }
};

const AddProduct = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const addProductMutation = useAddProduct();

  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      description: '',
      category: 'Earphone',
      price: '',
      offerPrice: '',
      images: []
    }
  });

  const { register, handleSubmit, formState: { errors }, trigger, setValue, watch } = form;

  const handleNext = async () => {
    // Get current form values
    const values = form.getValues();

    // Validate current step with appropriate schema
    let stepSchema;
    let dataToValidate;

    switch(currentStep) {
      case 1:
        stepSchema = basicInfoSchema;
        dataToValidate = {
          name: values.name,
          description: values.description,
          category: values.category,
        };
        break;
      case 2:
        stepSchema = pricingSchema;
        dataToValidate = {
          price: values.price,
          offerPrice: values.offerPrice,
        };
        break;
      default:
        return;
    }

    try {
      // Validate only the fields for this step
      stepSchema.parse(dataToValidate);

      // Clear any errors for this step
      const fieldsToValidate = getFieldsForStep(currentStep);
      fieldsToValidate.forEach(field => form.clearErrors(field));

      // If validation passes, move to next step
      setCurrentStep(prev => prev + 1);
    } catch (error) {
      // Set errors manually for failed validation
      if (error.errors) {
        error.errors.forEach((err) => {
          form.setError(err.path[0], {
            type: 'manual',
            message: err.message
          });
        });
      }
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const onSubmit = async () => {
    try {
      // Get all form values
      const data = form.getValues();

      // Validate entire form with combined schema before submitting
      const validatedData = productFormSchema.parse(data);

      // Create FormData for API
      const formData = new FormData();
      formData.append('name', validatedData.name);
      formData.append('description', validatedData.description);
      formData.append('category', validatedData.category);
      formData.append('price', validatedData.price.toString());
      formData.append('offerPrice', validatedData.offerPrice.toString());

      validatedData.images.forEach(file => {
        formData.append('images', file);
      });

      addProductMutation.mutate(formData, {
        onSuccess: () => {
          form.reset();
          setCurrentStep(1);
        }
      });
    } catch (error) {
      console.error('Validation error:', error);
      // If validation fails, set errors and go back to the first invalid step
      if (error.errors) {
        error.errors.forEach((err) => {
          form.setError(err.path[0], {
            type: 'manual',
            message: err.message
          });
        });

        const firstError = error.errors[0];
        if (['name', 'description', 'category'].includes(firstError.path[0])) {
          setCurrentStep(1);
        } else if (['price', 'offerPrice'].includes(firstError.path[0])) {
          setCurrentStep(2);
        } else if (firstError.path[0] === 'images') {
          setCurrentStep(3);
        }
      }
    }
  };

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between page-transition">
      <div className="md:p-10 p-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold gradient-text mb-6">Add New Product</h1>

          <StepIndicator currentStep={currentStep} />

          <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="card-dark p-6 space-y-6">
            {currentStep === 1 && <BasicInfoStep register={register} errors={errors} />}
            {currentStep === 2 && <PricingStep register={register} errors={errors} />}
            {currentStep === 3 && <ImagesStep setValue={setValue} watch={watch} errors={errors} />}

            <div className="flex items-center gap-4 pt-4">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-3 bg-slate-800 text-slate-100 font-semibold rounded-lg border border-slate-700 hover:bg-slate-700 transition-all duration-300"
                >
                  Back
                </button>
              )}

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn-primary px-8"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn-primary px-8"
                  disabled={addProductMutation.isPending}
                >
                  {addProductMutation.isPending ? 'Adding Product...' : 'Add Product'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
