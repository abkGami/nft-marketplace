import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, TrendingUp, Users, Sparkles, Play } from 'lucide-react';
import NFTCard from '../components/NFTCard';
import { mockNFTs } from '../utils/mockData';

const Home: React.FC = () => {
  const featuredNFTs = mockNFTs.slice(0, 6);
  
  const stats = [
    { label: 'Total Volume', value: '12,450 SOL', icon: TrendingUp },
    { label: 'NFTs Traded', value: '8,234', icon: Sparkles },
    { label: 'Active Users', value: '15,678', icon: Users },
    { label: 'Artists', value: '2,341', icon: Users },
  ];

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Built on Solana for instant transactions and minimal fees.',
    },
    {
      icon: Shield,
      title: 'Secure Trading',
      description: 'Smart contracts ensure safe and transparent transactions.',
    },
    {
      icon: TrendingUp,
      title: 'Growing Market',
      description: 'Join thousands of creators and collectors in our thriving ecosystem.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#9945FF]/20 to-[#14F195]/20 blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#9945FF]/20 to-[#14F195]/20 border border-[#9945FF]/30 rounded-full text-sm font-medium text-white mb-6 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 mr-2" />
                Welcome to the Future of NFTs
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Discover, Collect &<br />
                <span className="bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-transparent">
                  Trade NFTs
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                The premier NFT marketplace on Solana. Experience lightning-fast transactions, 
                minimal fees, and a vibrant community of creators and collectors.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Link to="/explore">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-xl text-white font-semibold text-lg flex items-center justify-center group hover:shadow-2xl hover:shadow-[#9945FF]/30 transition-all duration-300"
                >
                  Explore NFTs
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white font-semibold text-lg flex items-center justify-center hover:bg-white/20 transition-all duration-300"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center"
                  >
                    <Icon className="w-8 h-8 text-[#14F195] mx-auto mb-3" />
                    <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Why Choose <span className="bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-transparent">SolanaMarket</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the next generation of NFT trading with cutting-edge technology and unmatched performance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8 text-center hover:bg-white/10 hover:border-[#9945FF]/50 transition-all duration-300 group"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured NFTs */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Featured <span className="bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-transparent">Collections</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Discover the most sought-after NFTs from talented creators in our marketplace.
            </p>
            <Link to="/explore">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white font-medium hover:bg-white/20 transition-all duration-300"
              >
                View All NFTs
              </motion.button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredNFTs.map((nft, index) => (
              <NFTCard key={nft.id} nft={nft} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#9945FF]/10 to-[#14F195]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your <span className="bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-transparent">NFT Journey</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Join thousands of creators and collectors in the most vibrant NFT marketplace on Solana.
              Create, discover, and trade unique digital assets with minimal fees and instant transactions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/create">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-xl text-white font-semibold text-lg hover:shadow-2xl hover:shadow-[#9945FF]/30 transition-all duration-300"
                >
                  Create NFT
                </motion.button>
              </Link>
              <Link to="/explore">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white font-semibold text-lg hover:bg-white/20 transition-all duration-300"
                >
                  Explore Collections
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;