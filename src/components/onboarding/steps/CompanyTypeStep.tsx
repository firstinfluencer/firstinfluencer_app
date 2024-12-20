import React from 'react';
import { motion } from 'framer-motion';

interface CompanyTypeStepProps {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
}

const companyTypes = [
  'DTC brand',
  'Amazon seller',
  'Aggregator',
  'Agency',
  'Digital services',
  'Mobile app',
  'Other'
];

export function CompanyTypeStep({ value, onChange, onNext }: CompanyTypeStepProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">What is your company type?</h1>
        <p className="mt-2 text-gray-600">Select one below</p>
      </div>

      <div className="space-y-3">
        {companyTypes.map((type) => (
          <motion.button
            key={type}
            onClick={() => {
              onChange(type);
              onNext();
            }}
            className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
              value === type
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-200'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {type}
          </motion.button>
        ))}
      </div>
    </div>
  );
}