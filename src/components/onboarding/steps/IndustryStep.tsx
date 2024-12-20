import React from 'react';
import { motion } from 'framer-motion';

interface IndustryStepProps {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
}

const industries = [
  'Apparel',
  'Beauty & Skincare',
  'Consumer Product',
  'Electronics',
  'Food & Beverages',
  'Health & Wellness',
  'Home Goods',
  'Jewelry & Accessories',
  'Kids & Family',
  'Pets',
  'Services',
  'Software',
  'Sports',
  'Supplements',
  'Gaming',
  'CBD',
  'Fintech',
  'Other'
];

export function IndustryStep({ value, onChange, onNext }: IndustryStepProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Your company's industry?</h1>
        <p className="mt-2 text-gray-600">Select one below</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {industries.map((industry) => (
          <motion.button
            key={industry}
            onClick={() => {
              onChange(industry);
              onNext();
            }}
            className={`p-4 text-left rounded-xl border-2 transition-all ${
              value === industry
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-200'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {industry}
          </motion.button>
        ))}
      </div>
    </div>
  );
}