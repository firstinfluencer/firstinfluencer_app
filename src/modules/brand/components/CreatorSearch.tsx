import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import { useCreatorSearch } from '../hooks/useCreatorSearch';
import { CreatorGrid } from './CreatorGrid';
import { FilterPanel } from './FilterPanel';

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

export function CreatorSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minFollowers: 0,
    maxFollowers: undefined as number | undefined,
    platform: 'instagram' as const
  });

  const { creators, loading } = useCreatorSearch({
    category: selectedCategory,
    ...filters
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search logic
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Find Creators</h2>
        <motion.button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white shadow-sm hover:bg-gray-50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Filter className="w-5 h-5" />
          <span>Filters</span>
        </motion.button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map(category => (
          <motion.button
            key={category}
            onClick={() => setSelectedCategory(
              category === selectedCategory ? undefined : category
            )}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              category === selectedCategory
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

      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search creators by name or username..."
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </form>

      {showFilters && (
        <FilterPanel
          filters={filters}
          onFilterChange={setFilters}
          onClose={() => setShowFilters(false)}
        />
      )}

      <CreatorGrid creators={creators} loading={loading} />
    </div>
  );
}