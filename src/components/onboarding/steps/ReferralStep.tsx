import React from 'react';
import { motion } from 'framer-motion';

interface ReferralStepProps {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
}

const referralSources = [
  'Someone recommended me',
  'Google / Bing',
  'FirstInfluencer Blog',
  'Newsletter',
  'Event',
  'FirstInfluencer team reached out to me'
];

export function ReferralStep({ value, onChange, onNext }: ReferralStepProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">How did you learn about FirstInfluencer?</h1>
        <p className="mt-2 text-gray-600">Select one option below</p>
      </div>

      <div className="space-y-3">
        {referralSources.map((source) => (
          <motion.button
            key={source}
            onClick={() => {
              onChange(source);
              onNext();
            }}
            className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
              value === source
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-200'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {source}
          </motion.button>
        ))}
      </div>
    </div>
  );
}