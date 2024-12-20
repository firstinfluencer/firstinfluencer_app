import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const categories = [
  'Fashion',
  'Beauty',
  'Lifestyle',
  'Travel',
  'Food',
  'Fitness',
  'Technology',
  'Gaming',
  'Entertainment'
];

interface FilterPanelProps {
  filters: {
    category: string;
    minFollowers: number;
    maxFollowers?: number;
    platform: 'instagram' | 'tiktok' | 'youtube';
  };
  onFilterChange: (filters: FilterPanelProps['filters']) => void;
  onClose: () => void;
}

export function FilterPanel({ filters, onFilterChange, onClose }: FilterPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Filters</h3>
        <button onClick={onClose}>
          <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categories
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => onFilterChange({
                  ...filters,
                  category: filters.category === category ? '' : category
                })}
                className={`px-3 py-1.5 rounded-full text-sm ${
                  filters.category === category
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Platform
          </label>
          <select
            value={filters.platform}
            onChange={(e) => onFilterChange({
              ...filters,
              platform: e.target.value as 'instagram' | 'tiktok' | 'youtube'
            })}
            className="w-full rounded-lg border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="instagram">Instagram</option>
            <option value="tiktok">TikTok</option>
            <option value="youtube">YouTube</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Follower Range
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="number"
                value={filters.minFollowers}
                onChange={(e) => onFilterChange({
                  ...filters,
                  minFollowers: parseInt(e.target.value) || 0
                })}
                placeholder="Min followers"
                className="w-full rounded-lg border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <input
                type="number"
                value={filters.maxFollowers || ''}
                onChange={(e) => onFilterChange({
                  ...filters,
                  maxFollowers: e.target.value ? parseInt(e.target.value) : undefined
                })}
                placeholder="Max followers"
                className="w-full rounded-lg border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}