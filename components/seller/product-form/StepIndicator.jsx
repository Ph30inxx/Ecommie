'use client';
import React from 'react';

const StepIndicator = ({ currentStep }) => {
  const steps = [
    { number: 1, label: 'Basic Info', icon: '📝' },
    { number: 2, label: 'Pricing', icon: '💰' },
    { number: 3, label: 'Images', icon: '📸' }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center">
              <div className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                currentStep >= step.number
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-neon-cyan'
                  : 'bg-slate-800 text-slate-500 border border-slate-700'
              }`}>
                {currentStep > step.number ? '✓' : step.icon}
              </div>
              <span className="text-xs mt-2 text-slate-400">{step.label}</span>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-1 mx-4 transition-all duration-300 ${
                currentStep > step.number
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600'
                  : 'bg-slate-800'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
      <p className="text-center mt-4 text-slate-400 text-sm">
        Step {currentStep} of 3
      </p>
    </div>
  );
};

export default StepIndicator;
