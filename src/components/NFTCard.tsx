import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NFT {
  id: string;
  name: string;
  price: number;
  image: string;
  creator: string;
  likes: number;
  views: number;
  isLiked: boolean;
  rarity?: string;
}

interface NFTCardProps {
  nft: NFT;
  index: number;
}

const NFTCard: React.FC<NFTCardProps> = ({ nft, index }) => {
  const [isLiked, setIsLiked] = React.useState(nft.isLiked);
  const [likes, setLikes] = React.useState(nft.likes);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group cursor-pointer"
    >
      <Link to={`/nft/${nft.id}`}>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden transition-all duration-300 group-hover:bg-white/10 group-hover:border-[#9945FF]/50 group-hover:shadow-2xl group-hover:shadow-[#9945FF]/20">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden">
            <img
              src={nft.image}
              alt={nft.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={handleLike}
                className={`p-2 rounded-full backdrop-blur-sm border border-white/20 transition-all duration-300 ${
                  isLiked 
                    ? 'bg-red-500/80 text-white' 
                    : 'bg-black/40 text-gray-300 hover:text-red-400'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Rarity Badge */}
            {nft.rarity && (
              <div className="absolute top-4 left-4">
                <span className="px-2 py-1 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-full text-xs font-medium text-white">
                  {nft.rarity}
                </span>
              </div>
            )}

            {/* Stats Overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center space-x-4 text-white text-sm">
                <div className="flex items-center space-x-1">
                  <Heart className="w-4 h-4" />
                  <span>{likes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>{nft.views}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-[#14F195] transition-colors">
                  {nft.name}
                </h3>
                <p className="text-sm text-gray-400">
                  by <span className="text-[#9945FF] hover:text-[#14F195] transition-colors">{nft.creator}</span>
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-xs text-gray-400 mb-1">Price</span>
                <div className="flex items-center space-x-1">
                  <Zap className="w-4 h-4 text-[#14F195]" />
                  <span className="text-white font-semibold">{nft.price} SOL</span>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-lg text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 hover:shadow-lg hover:shadow-[#9945FF]/30"
              >
                Buy Now
              </motion.button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default NFTCard;