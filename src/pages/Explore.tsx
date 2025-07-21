import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import NFTCard from '../components/NFTCard';
import FilterBar from '../components/FilterBar';
import Loader from '../components/Loader';
import { mockNFTs } from '../utils/mockData';

const Explore: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(false);

  // Filter and sort NFTs
  const filteredAndSortedNFTs = useMemo(() => {
    let filtered = mockNFTs;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (nft) =>
          nft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          nft.creator.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (filterBy !== 'all') {
      filtered = filtered.filter((nft) => nft.category === filterBy);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return filtered;
  }, [searchQuery, sortBy, filterBy]);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Explore <span className="bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-transparent">NFTs</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Discover unique digital assets from talented creators around the world. 
            Find your next favorite NFT in our ever-growing collection.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search NFTs by name or creator..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9945FF]/50 focus:border-transparent text-lg"
            />
          </div>
        </motion.div>

        {/* Filter Bar */}
        <FilterBar
          sortBy={sortBy}
          setSortBy={setSortBy}
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <p className="text-gray-300">
            Showing <span className="text-white font-semibold">{filteredAndSortedNFTs.length}</span> NFTs
            {searchQuery && (
              <span> for "<span className="text-[#14F195]">{searchQuery}</span>"</span>
            )}
          </p>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center py-20">
            <Loader size="lg" text="Loading NFTs..." />
          </div>
        )}

        {/* NFTs Grid/List */}
        {!isLoading && filteredAndSortedNFTs.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'
                : 'space-y-6'
            }
          >
            {filteredAndSortedNFTs.map((nft, index) => (
              <motion.div
                key={nft.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                {viewMode === 'grid' ? (
                  <NFTCard nft={nft} index={index} />
                ) : (
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 flex items-center space-x-6 hover:bg-white/10 hover:border-[#9945FF]/50 transition-all duration-300">
                    <img
                      src={nft.image}
                      alt={nft.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">{nft.name}</h3>
                      <p className="text-sm text-gray-400 mb-2">by {nft.creator}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[#14F195] font-semibold">{nft.price} SOL</span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-lg text-white text-sm font-medium hover:shadow-lg hover:shadow-[#9945FF]/30 transition-all duration-300"
                        >
                          Buy Now
                        </motion.button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* No Results */}
        {!isLoading && filteredAndSortedNFTs.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-full flex items-center justify-center mx-auto mb-6 opacity-50">
              <Search className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">No NFTs Found</h3>
            <p className="text-gray-300 mb-8">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSearchQuery('');
                setFilterBy('all');
                setSortBy('newest');
              }}
              className="px-6 py-3 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-lg text-white font-medium hover:shadow-lg hover:shadow-[#9945FF]/30 transition-all duration-300"
            >
              Clear Filters
            </motion.button>
          </motion.div>
        )}

        {/* Load More Button */}
        {!isLoading && filteredAndSortedNFTs.length > 0 && filteredAndSortedNFTs.length >= 20 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => setIsLoading(false), 1000);
              }}
              className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white font-medium hover:bg-white/20 transition-all duration-300"
            >
              Load More NFTs
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Explore;