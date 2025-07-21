import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Twitter, Github, Disc as Discord, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const footerLinks = {
    marketplace: [
      { label: 'Explore', href: '/explore' },
      { label: 'Create', href: '/create' },
      { label: 'Activity', href: '/activity' },
      { label: 'Rankings', href: '/rankings' },
    ],
    resources: [
      { label: 'Help Center', href: '/help' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'API Documentation', href: '/api' },
    ],
    community: [
      { label: 'Discord', href: 'https://discord.gg/solana', icon: Discord },
      { label: 'Twitter', href: 'https://twitter.com/solana', icon: Twitter },
      { label: 'GitHub', href: 'https://github.com/solana-labs', icon: Github },
      { label: 'Newsletter', href: '/newsletter', icon: Mail },
    ],
  };

  return (
    <footer className="bg-black/20 backdrop-blur-xl border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-transparent">
                SolanaMarket
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              The premier NFT marketplace on Solana. Discover, collect, and trade unique digital assets with lightning-fast transactions and minimal fees.
            </p>
            <div className="flex space-x-4">
              {footerLinks.community.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#9945FF]/20 hover:border-[#9945FF]/50 transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Marketplace Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Marketplace</h3>
            <ul className="space-y-3">
              {footerLinks.marketplace.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-6">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Get the latest NFT drops and marketplace updates.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-black/50 border border-white/20 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9945FF]/50 focus:border-transparent text-sm"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-r-lg text-white font-medium text-sm hover:shadow-lg hover:shadow-[#9945FF]/30 transition-all duration-300"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 SolanaMarket. Built for Codigo + Superteam Nigeria Hackathon.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <span className="text-gray-400 text-sm">Powered by Solana</span>
            <div className="w-6 h-6 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded opacity-80"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;