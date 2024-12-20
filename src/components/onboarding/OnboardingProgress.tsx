import React from 'react';
import { motion } from 'framer-motion';

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function OnboardingProgress({ currentStep, totalSteps }: OnboardingProgressProps) {
  return (
    <div className="relative">
      <div className="h-2 bg-gray-200 rounded-full">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <div className="mt-2 text-sm text-gray-500 text-right">
        Step {currentStep} of {totalSteps}
      </div>
    </div>
  );
}