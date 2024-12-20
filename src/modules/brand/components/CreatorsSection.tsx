import React, { useState } from 'react';
import { CreatorStats } from './CreatorStats';
import { CreatorSearch } from './CreatorSearch';
import { CreatorList } from './CreatorList';
import { FilterPanel } from './FilterPanel';
import { Search, Filter } from 'lucide-react';

export function CreatorsSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    minFollowers: 0,
    maxFollowers: undefined as number | undefined,
    platform: 'instagram' as const
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled in real-time via the searchTerm state
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Discover Creators</h1>
          <p className="text-gray-600 mt-1">Connect with amazing creators for your brand</p>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white shadow-sm hover:bg-gray-50"
        >
          <Filter className="w-5 h-5" />
          <span>Filters</span>
        </button>
      </div>

      <CreatorStats />

      <div className="space-y-6">
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

        <CreatorList
          searchTerm={searchTerm}
          filters={filters}
        />
      </div>
    </div>
  );
}