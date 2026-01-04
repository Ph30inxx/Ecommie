'use client';
import React from 'react';

const PricingStep = ({ register, errors }) => {
  return (
    <div className="space-y-5">
      <div className="flex items-start gap-5 flex-wrap">
        <div className="flex flex-col gap-1 w-48">
          <label className="text-base font-semibold text-slate-300" htmlFor="price">
            Product Price
          </label>
          <input
            {...register('price')}
            id="price"
            type="number"
            step="0.01"
            placeholder="0.00"
            className={`input-purple ${errors.price ? 'border-red-500 focus:border-red-500' : ''}`}
          />
          {errors.price && (
            <p className="text-red-400 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1 w-48">
          <label className="text-base font-semibold text-slate-300" htmlFor="offerPrice">
            Offer Price
          </label>
          <input
            {...register('offerPrice')}
            id="offerPrice"
            type="number"
            step="0.01"
            placeholder="0.00"
            className={`input-purple ${errors.offerPrice ? 'border-red-500 focus:border-red-500' : ''}`}
          />
          {errors.offerPrice && (
            <p className="text-red-400 text-sm mt-1">{errors.offerPrice.message}</p>
          )}
        </div>
      </div>

      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 mt-4">
        <p className="text-slate-400 text-sm">
          <span className="font-semibold">Tip:</span> Offer price must be lower than the regular price to show a discount.
        </p>
      </div>
    </div>
  );
};

export default PricingStep;
