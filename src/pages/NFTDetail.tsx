import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Share2, Eye, Zap, User,  ExternalLink } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { mockNFTs } from '../utils/mockData';
import Loader from '../components/Loader';
import NFTCard from '../components/NFTCard';

const NFTDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [nft, setNft] = useState<{
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
    category: string;
    rarity?: string;
    views: number;
    likes: number;
    isLiked: boolean;
    creator: string;
    creatorAddress: string;
    tokenId: string;
    createdAt: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [isListingModalOpen, setIsListingModalOpen] = useState(false);
  const [listingPrice, setListingPrice] = useState('');

  // Similar NFTs (excluding current NFT)
  const similarNFTs = mockNFTs.filter(item => item.id !== id).slice(0, 4);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundNFT = mockNFTs.find(item => item.id === id);
      if (foundNFT) {
        setNft(foundNFT);
        setIsLiked(foundNFT.isLiked);
        setLikes(foundNFT.likes);
      }
      setIsLoading(false);
    }, 1000);
  }, [id]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
    toast.success(isLiked ? 'Removed from favorites' : 'Added to favorites');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  const handleBuyNow = () => {
    toast.loading('Connecting to Solana...', { duration: 2000 });
    setTimeout(() => {
      toast.success('Purchase successful! NFT added to your wallet.');
    }, 2000);
  };

  const handleListForSale = () => {
    if (!listingPrice) {
      toast.error('Please enter a valid price');
      return;
    }
    toast.loading('Creating listing...', { duration: 2000 });
    setTimeout(() => {
      toast.success(`NFT listed for ${listingPrice} SOL!`);
      setIsListingModalOpen(false);
      setListingPrice('');
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" text="Loading NFT details..." />
      </div>
    );
  }

  if (!nft) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">NFT Not Found</h2>
          <Link
            to="/explore"
            className="text-[#14F195] hover:text-white transition-colors"
          >
            Back to Explore
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to="/explore"
            className="inline-flex items-center text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Explore
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* NFT Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 p-4">
              <img
                src={nft.image}
                alt={nft.name}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            
            {/* Action Buttons */}
            <div className="absolute top-8 right-8 flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLike}
                className={`p-3 rounded-full backdrop-blur-sm border border-white/20 transition-all duration-300 ${
                  isLiked 
                    ? 'bg-red-500/80 text-white' 
                    : 'bg-black/40 text-gray-300 hover:text-red-400'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleShare}
                className="p-3 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-gray-300 hover:text-white transition-all duration-300"
              >
                <Share2 className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Rarity Badge */}
            {nft.rarity && (
              <div className="absolute top-8 left-8">
                <span className="px-3 py-1 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-full text-sm font-medium text-white backdrop-blur-sm">
                  {nft.rarity}
                </span>
              </div>
            )}
          </motion.div>

          {/* NFT Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Title and Stats */}
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <span className="px-3 py-1 bg-[#9945FF]/20 border border-[#9945FF]/30 rounded-full text-sm text-[#9945FF] font-medium">
                  {nft.category}
                </span>
                <div className="flex items-center space-x-4 text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">{nft.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{likes}</span>
                  </div>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{nft.name}</h1>
              <p className="text-xl text-gray-300 leading-relaxed">{nft.description}</p>
            </div>

            {/* Creator Info */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Created by</p>
                  <Link
                    to={`/profile/${nft.creatorAddress}`}
                    className="text-lg font-semibold text-white hover:text-[#14F195] transition-colors"
                  >
                    {nft.creator}
                  </Link>
                </div>
              </div>
            </div>

            {/* Price and Actions */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-gray-400 mb-2">Current Price</p>
                  <div className="flex items-center space-x-2">
                    <Zap className="w-6 h-6 text-[#14F195]" />
                    <span className="text-3xl font-bold text-white">{nft.price}</span>
                    <span className="text-lg text-gray-400">SOL</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    ≈ ${(nft.price * 180).toFixed(2)} USD
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBuyNow}
                  className="w-full py-4 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-xl text-white font-semibold text-lg hover:shadow-2xl hover:shadow-[#9945FF]/30 transition-all duration-300"
                >
                  Buy Now
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsListingModalOpen(true)}
                  className="w-full py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white font-semibold text-lg hover:bg-white/20 transition-all duration-300"
                >
                  List for Sale
                </motion.button>
              </div>
            </div>

            {/* Metadata */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Token ID</span>
                  <span className="text-white font-mono">{nft.tokenId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Blockchain</span>
                  <span className="text-white">Solana</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Created</span>
                  <span className="text-white">{new Date(nft.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">View on Explorer</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="text-[#14F195] hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Similar NFTs */}
        {similarNFTs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-white mb-8">Similar NFTs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {similarNFTs.map((similarNft, index) => (
                <NFTCard key={similarNft.id} nft={similarNft} index={index} />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* List for Sale Modal */}
      {isListingModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-900 border border-white/10 rounded-2xl p-8 max-w-md w-full"
          >
            <h3 className="text-2xl font-bold text-white mb-6">List NFT for Sale</h3>
            
            <div className="mb-6">
              <label className="block text-sm text-gray-300 mb-2">Price (SOL)</label>
              <div className="relative">
                <Zap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#14F195] w-5 h-5" />
                <input
                  type="number"
                  value={listingPrice}
                  onChange={(e) => setListingPrice(e.target.value)}
                  placeholder="Enter price in SOL"
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9945FF]/50 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleListForSale}
                className="flex-1 py-3 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-[#9945FF]/30 transition-all duration-300"
              >
                List NFT
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsListingModalOpen(false)}
                className="flex-1 py-3 bg-white/10 border border-white/20 rounded-lg text-white font-semibold hover:bg-white/20 transition-all duration-300"
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default NFTDetail;