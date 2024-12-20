import React from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/utils/format';

interface CampaignInfoStepProps {
  formData: {
    name: string;
    goal: 'multi-channel' | 'awareness' | 'conversions';
    minPrice: number;
    maxPrice: number;
  };
  onChange: (field: string, value: any) => void;
}

export function CampaignInfoStep({ formData, onChange }: CampaignInfoStepProps) {
  const goals = [
    {
      id: 'multi-channel',
      label: 'Multi-Channel UGC',
      description: 'Get content for multiple platforms'
    },
    {
      id: 'awareness',
      label: 'Awareness & Reach',
      description: 'Increase brand visibility'
    },
    {
      id: 'conversions',
      label: 'Conversions & Sales',
      description: 'Drive sales and conversions'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Campaign Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Campaign name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => onChange('name', e.target.value)}
          placeholder="Enter a short name for your campaign"
          maxLength={50}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <p className="mt-1 text-sm text-gray-500">
          {formData.name.length}/50 characters
        </p>
      </div>

      {/* Campaign Goal */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Campaign goal
        </label>
        <div className="grid grid-cols-3 gap-4">
          {goals.map((goal) => (
            <motion.button
              key={goal.id}
              onClick={() => onChange('goal', goal.id)}
              className={`p-4 rounded-xl text-left border-2 ${
                formData.goal === goal.id
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-200'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h3 className="font-medium text-gray-900">{goal.label}</h3>
              <p className="text-sm text-gray-500 mt-1">{goal.description}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Budget range (INR)
        </label>
        <div className="flex items-center space-x-4">
          <div>
            <input
              type="number"
              value={formData.minPrice}
              onChange={(e) => onChange('minPrice', parseInt(e.target.value))}
              placeholder="Min budget"
              className="w-32 px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <p className="mt-1 text-sm text-gray-500">{formatCurrency(formData.minPrice)}</p>
          </div>
          <span className="text-gray-500">to</span>
          <div>
            <input
              type="number"
              value={formData.maxPrice}
              onChange={(e) => onChange('maxPrice', parseInt(e.target.value))}
              placeholder="Max budget"
              className="w-32 px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <p className="mt-1 text-sm text-gray-500">{formatCurrency(formData.maxPrice)}</p>
          </div>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Creators can't exceed your budget cap
        </p>
      </div>
    </div>
  );
}