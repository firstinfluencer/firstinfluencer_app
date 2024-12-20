import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';

interface CreatorSearchProps {
  onSearch: (term: string) => void;
  onCategoryChange: (category: string) => void;
  onFollowerRangeChange: (min: number, max?: number) => void;
}

export function CreatorSearch({ 
  onSearch, 
  onCategoryChange, 
  onFollowerRangeChange 
}: CreatorSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <form onSubmit={handleSearch} className="flex-1 mr-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search creators by name or username..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </form>

        <motion.button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 px-4 py-3 rounded-xl bg-white shadow-sm hover:bg-gray-50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Filter className="w-5 h-5" />
          <span>Filters</span>
        </motion.button>
      </div>

      {showFilters && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="p-6 bg-white rounded-xl shadow-sm"
        >
          {/* Filter content will be added here */}
        </motion.div>
      )}
    </div>
  );
}