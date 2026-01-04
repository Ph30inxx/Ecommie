import { z } from 'zod';

// Step 1: Basic Info
export const basicInfoSchema = z.object({
  name: z.string()
    .min(3, 'Product name must be at least 3 characters')
    .max(100, 'Product name must not exceed 100 characters')
    .trim(),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must not exceed 500 characters')
    .trim(),
  category: z.enum(
    ['Earphone', 'Headphone', 'Watch', 'Smartphone', 'Laptop', 'Camera', 'Accessories'],
    { errorMap: () => ({ message: 'Please select a valid category' }) }
  ),
});

// Step 2: Pricing (base schema without refine for merging)
const pricingBaseSchema = z.object({
  price: z.coerce.number()
    .positive('Price must be greater than 0')
    .multipleOf(0.01, 'Price must have at most 2 decimal places'),
  offerPrice: z.coerce.number()
    .positive('Offer price must be greater than 0')
    .multipleOf(0.01, 'Offer price must have at most 2 decimal places'),
});

// Step 2: Pricing with cross-field validation
export const pricingSchema = pricingBaseSchema.refine(
  (data) => data.offerPrice < data.price,
  {
    message: 'Offer price must be less than regular price',
    path: ['offerPrice'],
  }
);

// Step 3: Images
export const imagesSchema = z.object({
  images: z.array(z.instanceof(File))
    .min(1, 'Please upload at least 1 product image')
    .max(4, 'You can upload maximum 4 images'),
});

// Combined schema for final validation
// Merge base schemas first, then apply cross-field validation
export const productFormSchema = basicInfoSchema
  .merge(pricingBaseSchema)
  .merge(imagesSchema)
  .refine(
    (data) => data.offerPrice < data.price,
    {
      message: 'Offer price must be less than regular price',
      path: ['offerPrice'],
    }
  );
