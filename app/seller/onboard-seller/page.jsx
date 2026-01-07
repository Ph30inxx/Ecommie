'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useOnboardSeller } from '@/lib/react-query/hooks/useSellerOnboarding';
import { sellerOnboardingSchema } from '@/lib/validation/sellerSchemas';

const OnboardSeller = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [createdUser, setCreatedUser] = useState(null);
  const onboardSellerMutation = useOnboardSeller();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(sellerOnboardingSchema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: ''
    }
  });

  const onSubmit = async (data) => {
    try {
      const result = await onboardSellerMutation.mutateAsync(data);
      setCreatedUser(result.user);
      reset();
    } catch (error) {
      // Error is already handled by the mutation's onError callback
      // which shows a toast notification to the user
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
            Onboard New Seller
          </h1>
          <p className="text-slate-400 text-base">
            Create a new seller account with access to the seller dashboard
          </p>
        </div>

        {/* Success Message */}
        {createdUser && (
          <div className="card-dark border-2 border-green-500/30 bg-green-500/5 mb-6 p-6">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-green-400 mb-2">
                  Seller Onboarded Successfully
                </h3>
                <div className="space-y-1 text-sm text-slate-300">
                  <p><span className="text-slate-400">Username:</span> <span className="font-medium">{createdUser.username}</span></p>
                  <p><span className="text-slate-400">Email:</span> <span className="font-medium">{createdUser.email}</span></p>
                  <p><span className="text-slate-400">Name:</span> <span className="font-medium">{createdUser.firstName} {createdUser.lastName}</span></p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setCreatedUser(null)}
              className="mt-4 text-sm text-slate-400 hover:text-slate-300 underline"
            >
              Create another seller
            </button>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="card-dark p-6 md:p-8">
          <div className="space-y-6">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-2">
                Username <span className="text-red-400">*</span>
              </label>
              <input
                id="username"
                type="text"
                {...register('username')}
                className={`w-full px-4 py-3 bg-slate-800 border ${
                  errors.username ? 'border-red-500' : 'border-slate-700'
                } rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all`}
                placeholder="Enter username"
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-400">{errors.username.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                Password <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  className={`w-full px-4 py-3 bg-slate-800 border ${
                    errors.password ? 'border-red-500' : 'border-slate-700'
                  } rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all`}
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
              )}
              <p className="mt-1 text-xs text-slate-500">
                Must be at least 8 characters with uppercase, lowercase, number, and special character
              </p>
            </div>

            {/* First Name and Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-slate-300 mb-2">
                  First Name <span className="text-red-400">*</span>
                </label>
                <input
                  id="firstName"
                  type="text"
                  {...register('firstName')}
                  className={`w-full px-4 py-3 bg-slate-800 border ${
                    errors.firstName ? 'border-red-500' : 'border-slate-700'
                  } rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all`}
                  placeholder="First name"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-400">{errors.firstName.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-slate-300 mb-2">
                  Last Name <span className="text-red-400">*</span>
                </label>
                <input
                  id="lastName"
                  type="text"
                  {...register('lastName')}
                  className={`w-full px-4 py-3 bg-slate-800 border ${
                    errors.lastName ? 'border-red-500' : 'border-slate-700'
                  } rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all`}
                  placeholder="Last name"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-400">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                id="email"
                type="email"
                {...register('email')}
                className={`w-full px-4 py-3 bg-slate-800 border ${
                  errors.email ? 'border-red-500' : 'border-slate-700'
                } rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all`}
                placeholder="Enter email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={onboardSellerMutation.isPending}
              className="btn-primary w-full py-3 px-6 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {onboardSellerMutation.isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Seller Account...
                </span>
              ) : (
                'Create Seller Account'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OnboardSeller;
