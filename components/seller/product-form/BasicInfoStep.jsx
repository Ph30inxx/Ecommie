'use client';
import React from 'react';

const BasicInfoStep = ({ register, errors }) => {
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-1">
        <label className="text-base font-semibold text-slate-300" htmlFor="name">
          Product Name
        </label>
        <input
          {...register('name')}
          id="name"
          type="text"
          placeholder="Enter product name"
          className={`input-purple ${errors.name ? 'border-red-500 focus:border-red-500' : ''}`}
        />
        {errors.name && (
          <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-base font-semibold text-slate-300" htmlFor="description">
          Product Description
        </label>
        <textarea
          {...register('description')}
          id="description"
          rows={4}
          placeholder="Describe your product"
          className={`input-purple resize-none ${errors.description ? 'border-red-500 focus:border-red-500' : ''}`}
        />
        {errors.description && (
          <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1 w-48">
        <label className="text-base font-semibold text-slate-300" htmlFor="category">
          Category
        </label>
        <select
          {...register('category')}
          id="category"
          className={`input-purple ${errors.category ? 'border-red-500 focus:border-red-500' : ''}`}
        >
          <option value="Earphone">Earphone</option>
          <option value="Headphone">Headphone</option>
          <option value="Watch">Watch</option>
          <option value="Smartphone">Smartphone</option>
          <option value="Laptop">Laptop</option>
          <option value="Camera">Camera</option>
          <option value="Accessories">Accessories</option>
        </select>
        {errors.category && (
          <p className="text-red-400 text-sm mt-1">{errors.category.message}</p>
        )}
      </div>
    </div>
  );
};

export default BasicInfoStep;
