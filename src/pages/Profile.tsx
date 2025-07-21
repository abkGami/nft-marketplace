import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, ExternalLink, Copy, Grid, List } from 'lucide-react';
import { toast } from 'react-hot-toast';
import NFTCard from '../components/NFTCard';
import Loader from '../components/Loader';
import { mockNFTs } from '../utils/mockData';

const Profile: React.FC = () => {
  const { address } = useParams<{ address: string }>();
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('collected');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mock profile data
  const mockProfile = {
    address: address,
    username: 'CryptoArtist',
    bio: 'Digital artist exploring the intersection of technology and creativity. Creating unique NFTs that push the boundaries of digital art.',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400',
    banner: 'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1200',
    joined: '2023-03-15',
    totalNFTs: 42,
    totalSales: 127,
    totalVolume: 2847.5,
    followers: 1534,
    following: 892,
    verified: true,
  };

  // Filter NFTs by creator
  const userNFTs = mockNFTs.filter(nft => nft.creator === mockProfile.username);
  const collectedNFTs = mockNFTs.slice(0, 8); // Mock collected NFTs

  const stats = [
    { label: 'NFTs Created', value: mockProfile.totalNFTs },
    { label: 'Sales', value: mockProfile.totalSales },
    { label: 'Volume', value: `${mockProfile.totalVolume} SOL` },
    { label: 'Followers', value: mockProfile.followers.toLocaleString() },
  ];

  const tabs = [
    { id: 'collected', label: 'Collected', count: collectedNFTs.length },
    { id: 'created', label: 'Created', count: userNFTs.length },
    { id: 'activity', label: 'Activity', count: 0 },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProfile(mockProfile);
      setIsLoading(false);
    }, 1000);
  }, [address]);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address || '');
    toast.success('Address copied to clipboard!');
  };

  const getCurrentNFTs = () => {
    switch (activeTab) {
      case 'created':
        return userNFTs;
      case 'collected':
        return collectedNFTs;
      default:
        return [];
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" text="Loading profile..." />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Profile Not Found</h2>
          <p className="text-gray-400">The requested profile could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Banner */}
      <div className="relative h-80 overflow-hidden">
        <img
          src={profile.banner}
          alt="Profile Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative -mt-20 mb-8"
        >
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
              {/* Avatar */}
              <div className="relative">
                <img
                  src={profile.avatar}
                  alt={profile.username}
                  className="w-32 h-32 rounded-2xl border-4 border-white/20"
                />
                {profile.verified && (
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                )}
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-white">{profile.username}</h1>
                </div>
                
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-gray-400 font-mono text-sm">
                    {address?.slice(0, 6)}...{address?.slice(-4)}
                  </span>
                  <button
                    onClick={handleCopyAddress}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <a
                    href={`https://explorer.solana.com/address/${address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <p className="text-gray-300 leading-relaxed mb-6 max-w-2xl">
                  {profile.bio}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {stats.map((stat) => (
                    <div key={stat.label}>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                      <p className="text-sm text-gray-400">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-[#9945FF]/30 transition-all duration-300"
                >
                  Follow
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white font-semibold hover:bg-white/20 transition-all duration-300"
                >
                  Message
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs and Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Tabs */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex space-x-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-[#9945FF] text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {tab.label} {tab.count > 0 && `(${tab.count})`}
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-1">
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
          </div>

          {/* Content */}
          <div className="mb-16">
            {activeTab === 'activity' ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-full flex items-center justify-center mx-auto mb-6 opacity-50">
                  <User className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">No Activity Yet</h3>
                <p className="text-gray-300">Activity will appear here once this user starts trading NFTs.</p>
              </div>
            ) : (
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'
                  : 'space-y-6'
              }>
                {getCurrentNFTs().map((nft, index) => (
                  <motion.div
                    key={nft.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <NFTCard nft={nft} index={index} />
                  </motion.div>
                ))}
              </div>
            )}

            {getCurrentNFTs().length === 0 && activeTab !== 'activity' && (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-full flex items-center justify-center mx-auto mb-6 opacity-50">
                  <User className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">No NFTs Found</h3>
                <p className="text-gray-300">
                  {activeTab === 'created' 
                    ? 'This user hasn\'t created any NFTs yet.' 
                    : 'This user hasn\'t collected any NFTs yet.'
                  }
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;