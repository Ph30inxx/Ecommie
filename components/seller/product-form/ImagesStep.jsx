'use client';
import React from 'react';
import { assets } from '@/assets/assets';
import Image from 'next/image';

const ImagesStep = ({ setValue, watch, errors }) => {
  const images = watch('images') || [];

  const handleImageChange = (index, file) => {
    const newImages = [...images];
    if (file) {
      newImages[index] = file;
    } else {
      newImages.splice(index, 1);
    }
    setValue('images', newImages, { shouldValidate: true });
  };

  return (
    <div className="space-y-5">
      <div>
        <p className="text-base font-semibold text-slate-300 mb-2">Product Images</p>
        <div className="flex flex-wrap items-center gap-3 p-6 border-2 border-dashed border-slate-700 hover:border-cyan-500 transition-colors duration-300 rounded-xl bg-slate-800/30">
          {[...Array(4)].map((_, index) => (
            <label key={index} htmlFor={`image${index}`} className="cursor-pointer">
              <input
                onChange={(e) => handleImageChange(index, e.target.files[0])}
                type="file"
                id={`image${index}`}
                accept="image/*"
                hidden
              />
              <Image
                className="max-w-24 rounded-lg hover:opacity-80 transition-opacity"
                src={images[index] ? URL.createObjectURL(images[index]) : assets.upload_area}
                alt=""
                width={100}
                height={100}
              />
            </label>
          ))}
        </div>
        {errors.images && (
          <p className="text-red-400 text-sm mt-2">{errors.images.message}</p>
        )}
      </div>

      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
        <p className="text-slate-400 text-sm">
          <span className="font-semibold">Upload Guidelines:</span> Add 1-4 high-quality product images. First image will be the main display.
        </p>
      </div>
    </div>
  );
};

export default ImagesStep;
