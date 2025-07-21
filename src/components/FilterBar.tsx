import React from 'react';
import { motion } from 'framer-motion';
import { Filter, SortAsc, Grid, List } from 'lucide-react';

interface FilterBarProps {
  sortBy: string;
  setSortBy: (value: string) => void;
  filterBy: string;
  setFilterBy: (value: string) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  sortBy,
  setSortBy,
  filterBy,
  setFilterBy,
  viewMode,
  setViewMode,
}) => {
  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'popular', label: 'Most Popular' },
  ];

  const filterOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'art', label: 'Art' },
    { value: 'collectibles', label: 'Collectibles' },
    { value: 'gaming', label: 'Gaming' },
    { value: 'music', label: 'Music' },
    { value: 'photography', label: 'Photography' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl mb-8"
    >
      <div className="flex flex-wrap gap-4 items-center">
        {/* Filter Dropdown */}
        <div className="relative">
          <div className="flex items-center space-x-2 text-gray-300">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filter:</span>
          </div>
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="mt-1 bg-black/50 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#9945FF]/50 focus:border-transparent backdrop-blur-sm min-w-[150px]"
          >
            {filterOptions.map((option) => (
              <option key={option.value} value={option.value} className="bg-gray-900">
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <div className="flex items-center space-x-2 text-gray-300">
            <SortAsc className="w-4 h-4" />
            <span className="text-sm font-medium">Sort:</span>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="mt-1 bg-black/50 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#9945FF]/50 focus:border-transparent backdrop-blur-sm min-w-[150px]"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value} className="bg-gray-900">
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="flex items-center space-x-2 bg-black/30 rounded-lg p-1 border border-white/10">
        <button
          onClick={() => setViewMode('grid')}
          className={`p-2 rounded-md transition-all duration-200 ${
            viewMode === 'grid'
              ? 'bg-[#9945FF] text-white shadow-lg'
              : 'text-gray-400 hover:text-white hover:bg-white/10'
          }`}
        >
          <Grid className="w-4 h-4" />
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`p-2 rounded-md transition-all duration-200 ${
            viewMode === 'list'
              ? 'bg-[#9945FF] text-white shadow-lg'
              : 'text-gray-400 hover:text-white hover:bg-white/10'
          }`}
        >
          <List className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default FilterBar;