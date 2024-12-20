import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface CampaignStepperProps {
  steps: string[];
  currentStep: number;
}

export function CampaignStepper({ steps, currentStep }: CampaignStepperProps) {
  return (
    <div className="flex items-center justify-between w-full mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          {/* Step Circle */}
          <div className="flex flex-col items-center">
            <motion.div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                index < currentStep
                  ? 'bg-indigo-600'
                  : index === currentStep
                  ? 'bg-indigo-100 border-2 border-indigo-600'
                  : 'bg-gray-100'
              }`}
              initial={false}
              animate={{
                scale: index === currentStep ? 1.1 : 1,
              }}
            >
              {index < currentStep ? (
                <Check className="w-5 h-5 text-white" />
              ) : (
                <span className={`${
                  index === currentStep ? 'text-indigo-600' : 'text-gray-500'
                }`}>
                  {index + 1}
                </span>
              )}
            </motion.div>
            <span className={`mt-2 text-sm ${
              index === currentStep ? 'text-indigo-600 font-medium' : 'text-gray-500'
            }`}>
              {step}
            </span>
          </div>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div className="flex-1 h-[2px] mx-4">
              <div className="h-full bg-gray-200">
                <motion.div
                  className="h-full bg-indigo-600"
                  initial={{ width: '0%' }}
                  animate={{
                    width: index < currentStep ? '100%' : '0%',
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}