import React from 'react';
import { motion } from 'framer-motion';

interface RevenueStepProps {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
}

const revenueRanges = [
  '< $100k',
  '$100k - $1m',
  '$1m - $10m',
  '$10m - $50m',
  '> $50m'
];

export function RevenueStep({ value, onChange, onNext }: RevenueStepProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Annual revenue?</h1>
        <p className="mt-2 text-gray-600">Select one below</p>
      </div>

      <div className="space-y-3">
        {revenueRanges.map((range) => (
          <motion.button
            key={range}
            onClick={() => {
              onChange(range);
              onNext();
            }}
            className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
              value === range
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-200'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {range}
          </motion.button>
        ))}
      </div>
    </div>
  );
}