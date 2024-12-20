import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

interface CreatorsStepProps {
  formData: {
    creatorType: 'nano' | 'micro' | 'macro';
    categories: string[];
    locations: string[];
  };
  onChange: (field: string, value: any) => void;
}

export function CreatorsStep({ formData, onChange }: CreatorsStepProps) {
  const creatorTypes = [
    {
      id: 'nano',
      label: 'Nano Influencers',
      followers: '1K - 10K',
      description: 'High engagement, authentic reach'
    },
    {
      id: 'micro',
      label: 'Micro Influencers',
      followers: '10K - 100K',
      description: 'Balanced reach and engagement'
    },
    {
      id: 'macro',
      label: 'Macro Influencers',
      followers: '100K+',
      description: 'Maximum reach and visibility'
    }
  ];

  const categories = [
    'Fashion', 'Beauty', 'Lifestyle', 'Travel', 'Food',
    'Fitness', 'Technology', 'Gaming', 'Entertainment'
  ];

  return (
    <div className="space-y-8">
      {/* Creator Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Creator size
        </label>
        <div className="grid grid-cols-3 gap-4">
          {creatorTypes.map((type) => (
            <motion.button
              key={type.id}
              onClick={() => onChange('creatorType', type.id)}
              className={`p-4 rounded-xl text-left border-2 ${
                formData.creatorType === type.id
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-200'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h3 className="font-medium text-gray-900">{type.label}</h3>
              <p className="text-sm text-indigo-600 mt-1">{type.followers}</p>
              <p className="text-sm text-gray-500 mt-1">{type.description}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Creator categories
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => {
                const newCategories = formData.categories.includes(category)
                  ? formData.categories.filter(c => c !== category)
                  : [...formData.categories, category];
                onChange('categories', newCategories);
              }}
              className={`px-4 py-2 rounded-full text-sm ${
                formData.categories.includes(category)
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Location Search */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Creator locations
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search locations..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        {formData.locations.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.locations.map((location) => (
              <span
                key={location}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center"
              >
                {location}
                <button
                  onClick={() => {
                    const newLocations = formData.locations.filter(l => l !== location);
                    onChange('locations', newLocations);
                  }}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}